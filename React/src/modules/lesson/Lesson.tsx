import { ReactNode, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button, Input, Notification } from 'controls';
import { GetLessonQuery, useGetLessonQuery, useEditLessonMutation, GetLessonDocument } from 'types';
import { ButtonType } from 'controls/Button';

type QueriedLesson = NonNullable<GetLessonQuery['lesson']>;

const Layout = ({ children }: { children: ReactNode }) => (
    <section className="section">{children}</section>
);

interface LessonProps {
    data: QueriedLesson,
}

export const Lesson = ({ data }: LessonProps) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [editLesson, { loading, error }] = useEditLessonMutation({
        refetchQueries: [
            { query: GetLessonDocument, variables: { courseId: data.course.id, lessonId: data.id } }
        ]
    });

    const handleSave = async () => {
        await editLesson({
            variables: {
                input: {
                    courseId: data.course.id,
                    lessonId: data.id,
                    title,
                    description,
                }
            }
        });
        setEditMode(false);
    };

    return (
        <Layout>
            <h1 className="title"><Link to={`/courses/${data.course.id}`}>{data.course.title}</Link></h1>

            {!editMode ? (
                <h2 className="title is-4">{data.title}</h2>
            ) : (
                <Input
                    label="Title" name="title" hideHeader
                    placeholder="Please enter lesson title" required
                    loading={loading}
                    value={title} onChange={(_, value) => setTitle(value)}
                />
            )}

            {data.course.permissions.canEdit && !editMode && (
                <Button
                    onClick={() => {
                        setEditMode(true);
                        setTitle(data.title);
                        setDescription(data.description);
                    }}
                >
                    Edit
                </Button>
            )}

            {!editMode ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.description}</ReactMarkdown>
            ) : (
                <Input
                    label="Description" name="description" hideHeader
                    placeholder="Please enter lesson description" required multiline
                    loading={loading}
                    value={description} onChange={(_, value) => setDescription(value)}
                />
            )}

            {data.course.permissions.canEdit && editMode && (
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
            {!!error && <Notification message="You cannot edit this lesson!" />}
        </Layout>
    );
};

const LessonPage = () => {
    const params = useParams<{ courseId: string, lessonId: string }>();

    if (!params.courseId || !params.lessonId) {
        return <Layout>Invalid lesson</Layout>;
    }

    const { loading, error, data: queryData } = useGetLessonQuery({ variables: { courseId: params.courseId, lessonId: params.lessonId } });

    if (loading) {
        return <Layout>Loading...</Layout>;
    }

    if (error) {
        return <Layout>Cannot load data!</Layout>;
    }

    if (!queryData || !queryData.lesson) {
        return <Layout>This lesson does not exist anymore.</Layout>;
    }

    return (
        <Lesson data={queryData.lesson} />
    );
};

export default LessonPage;
