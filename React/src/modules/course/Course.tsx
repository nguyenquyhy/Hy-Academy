import { Button, Notification } from 'controls';
import { ButtonType } from 'controls/Button';
import { NotificationType } from 'controls/Notification';
import { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { GetCourseQuery, GetAttendingCoursesDocument, useEnrollCourseMutation, useGetCourseQuery } from 'types';

type QueriedCourse = NonNullable<GetCourseQuery['course']>;

const Layout = ({ children }: { children: ReactNode }) => (
    <section className="section">{children}</section>
);

interface CourseProps {
    data: QueriedCourse,
    enroll: () => void,
    enrollLoading: boolean
    enrollSuccess: boolean | undefined;
}

export const Course = ({ data, enroll, enrollLoading, enrollSuccess }: CourseProps) => (
    <Layout>
        <h1 className="title">{data.title}</h1>
        <p>{data.description}</p>
        <div className="buttons">
            {enrollSuccess !== false && data.permissions.canEnroll && <Button onClick={enroll} loading={enrollLoading}>Enroll</Button>}
            {data.permissions.canEdit && <Button type={ButtonType.Secondary}>Edit</Button>}
        </div>
        {enrollSuccess !== undefined && (enrollSuccess ?
            <Notification message="You have enrolled in this course" /> :
            <Notification message="You cannot enroll in this course!" type={NotificationType.Error} />)}

    </Layout>
);

const CoursePage = () => {
    const params = useParams<{ id: string }>();

    if (!params.id) {
        return <Layout>Invalid course</Layout>;
    }

    const [enroll, { loading: enrollLoading, error: enrollError, data: enrollData }] = useEnrollCourseMutation({
        variables: {
            input: {
                courseId: params.id
            }
        },
        refetchQueries: [
            { query: GetAttendingCoursesDocument }
        ]
    });
    const { loading, error, data: queryData } = useGetCourseQuery({ variables: { id: params.id } });

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
