import { Button, Input, Notification } from 'controls';
import { ButtonType } from 'controls/Button';
import { NotificationType } from 'controls/Notification';
import { ReactNode, useState } from 'react';
import { Draggable } from 'react-drag-reorder';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
    GetCourseQuery,
    useGetCourseQuery,
    useEnrollCourseMutation,
    useEditCourseMutation,
    GetCourseDocument,
    GetCoursesDocument,
    GetAttendingCoursesDocument,
    CourseVisibility,
    useEditLessonOrderMutation,
} from 'types';

type QueriedCourse = NonNullable<GetCourseQuery['course']>;
type QueriedLesson = QueriedCourse['lessons'][0];

const Layout = ({ children }: { children: ReactNode }) => (
    <section className="section">{children}</section>
);

const VisibilityLabel = ({ visibility } : { visibility: CourseVisibility}) => {
    switch (visibility) {
        case CourseVisibility.Unlisted:
            return <div className="tag is-warning">Unlisted</div>;
        case CourseVisibility.Private:
            return <div className="tag is-danger">Private</div>;
        case CourseVisibility.Public:
            return <div className="tag is-secondary">Public</div>;
        default:
            return null;
    }
};

const LessonItem = ({ courseId, lesson }: { courseId: string, lesson: QueriedLesson }) => (
    <div className="card">
        <header className="card-header">
            <div className="card-header-title">
                <Link to={`/courses/${courseId}/lessons/${lesson.id}`}>{lesson.title}</Link>
            </div>
        </header>
    </div>
);

interface LessonListProps {
    courseId: string
    lessons: QueriedLesson[]
    canEdit: boolean
    onOrderChange?: (currentPosition: number, newPosition: number) => void
    isLoading: boolean
}

const LessonListWrapper = styled.div`
position: relative;
`;

const LessonListCover = styled.div`
background: rgba(0, 0, 0, 0.4);
position: absolute;
top: 0;
bottom: 0;
left: 0;
right: 0;
cursor: wait;
`;

const LessonList = ({ courseId, lessons, canEdit, onOrderChange, isLoading }: LessonListProps) => {
    if (lessons.length === 0) {
        return <p className="has-text-centered is-italic">There is no lesson in this course.</p>;
    }

    return canEdit ? (
        <LessonListWrapper>
            <Draggable onPosChange={onOrderChange}>
                {lessons.map(lesson => <LessonItem key={lesson.id} courseId={courseId} lesson={lesson} />)}
            </Draggable>
            {isLoading && <LessonListCover />}
        </LessonListWrapper>
    ) : (
        <>
            {lessons.map(lesson => <LessonItem key={lesson.id} courseId={courseId} lesson={lesson} />)}
        </>
    );
};

interface CourseProps {
    data: QueriedCourse,
    enroll: () => void,
    enrollLoading: boolean
    enrollSuccess: boolean | undefined;
}

export const Course = ({ data, enroll, enrollLoading, enrollSuccess }: CourseProps) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [visibility, setVisibility] = useState(CourseVisibility.Private);

    const [editCourse, { loading, error }] = useEditCourseMutation({
        refetchQueries: [
            { query: GetCourseDocument, variables: { id: data.id } },
            { query: GetCoursesDocument }
        ]
    });

    const [editLessonOrder, { loading: loadingOrders }] = useEditLessonOrderMutation();

    const handleOrderChange = (currentPos: number, newPos: number) => {
        const calculatedPos = (currentPos < newPos) ? newPos + 1 : newPos;
        editLessonOrder({
            variables: {
                input: {
                    courseId: data.id,
                    lessonId: data.lessons[currentPos].id,
                    lessonIdAfter: calculatedPos < data.lessons.length ? data.lessons[calculatedPos].id : null
                }
            }
        });
    };

    const handleSave = async () => {
        await editCourse({
            variables: {
                input: {
                    courseId: data.id,
                    title,
                    description,
                    visibility
                }
            }
        });
        setEditMode(false);
    };

    return (
        <Layout>
            {!editMode ? (
                <h1 className="title">{data.title}</h1>
            ) : (
                <Input
                    label="Title" name="title" hideHeader
                    placeholder="Please enter course title" required
                    loading={loading}
                    value={title} onChange={(_, value) => setTitle(value)}
                />
            )}

            <div className="buttons">
                {enrollSuccess !== false && data.permissions.canEnroll && <Button onClick={enroll} loading={enrollLoading}>Enroll</Button>}
                {data.permissions.canEdit && !editMode && (
                    <Button
                        type={ButtonType.Secondary}
                        onClick={() => {
                            setEditMode(true);
                            setTitle(data.title);
                            setDescription(data.description);
                            setVisibility(data.visibility);
                        }}
                    >
                        Edit
                    </Button>
                )}
            </div>
            {enrollSuccess !== undefined && (enrollSuccess ?
                <Notification message="You have enrolled in this course" /> :
                <Notification message="You cannot enroll in this course!" type={NotificationType.Error} />)}

            {!editMode ? (
                <VisibilityLabel visibility={data.visibility} />
            ) : (
                <select
                    title="Visibility"
                    className="select"
                    value={visibility}
                    onChange={e => setVisibility(e.target.value as CourseVisibility)}
                >
                    <option value={CourseVisibility.Private}>Private</option>
                    <option value={CourseVisibility.Unlisted}>Unlisted</option>
                    <option value={CourseVisibility.Public}>Public</option>
                </select>
            )}

            {!editMode ? (
                <p>{data.description}</p>
            ) : (
                <Input
                    label="Description" name="description" hideHeader
                    placeholder="Please enter course description" required multiline
                    loading={loading}
                    value={description} onChange={(_, value) => setDescription(value)}
                />
            )}

            {data.permissions.canEdit && editMode && (
                <>
                    <Button
                        loading={loading}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                    <Button
                        type={ButtonType.Secondary}
                        onClick={() => setEditMode(false)}
                    >
                        Cancel
                    </Button>
                </>
            )}
            {!!error && <Notification message="You cannot edit this course!" />}

            {!editMode && (
                <>
                    <hr />
                    <h2 className="title is-4">Lessons</h2>
                    <LessonList courseId={data.id} lessons={data.lessons} canEdit={data.permissions.canEdit} onOrderChange={handleOrderChange} isLoading={loadingOrders} />
                    {data.permissions.canEdit && <Link to={`/courses/${data.id}/lessons/create`} className="button is-primary is-fullwidth">Add lesson</Link>}
                </>
            )}
        </Layout>
    );
};

const CoursePage = () => {
    const params = useParams<{ courseId: string }>();

    if (!params.courseId) {
        return <Layout>Invalid course</Layout>;
    }

    const [enroll, { loading: enrollLoading, error: enrollError, data: enrollData }] = useEnrollCourseMutation({
        variables: {
            input: {
                courseId: params.courseId
            }
        },
        refetchQueries: [
            { query: GetAttendingCoursesDocument }
        ]
    });
    const { loading, error, data: queryData } = useGetCourseQuery({ variables: { id: params.courseId } });

    if (loading) {
        return <Layout>Loading...</Layout>;
    }

    if (error) {
        return <Layout>Cannot load data!</Layout>;
    }

    if (!queryData || !queryData.course) {
        return <Layout>This course does not exist anymore.</Layout>;
    }

    return (
        <Course
            data={queryData.course}
            enroll={enroll}
            enrollLoading={enrollLoading}
            enrollSuccess={enrollError ? false : (!!enrollData || undefined)}
        />
    );
};

export default CoursePage;
