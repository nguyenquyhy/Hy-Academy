import { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { GetCourseQuery, useGetCourseQuery } from 'types';

type QueriedCourse = NonNullable<GetCourseQuery['course']>;

const Layout = ({ children }: { children: ReactNode }) => (
    <section className="section">{children}</section>
);

export const Course = ({ course }: { course: QueriedCourse }) => (
    <Layout>
        <h1 className="title">{course.title}</h1>
        <p>{course.description}</p>
    </Layout>
);

const CoursePage = () => {
    const params = useParams<{ id: string }>();

    if (!params.id) {
        return <Layout>Invalid course</Layout>;
    }

    const { loading, error, data } = useGetCourseQuery({ variables: { id: params.id } });

    if (loading) {
        return <Layout>Loading...</Layout>;
    }

    if (error || !data || !data.course) {
        return <Layout>Cannot load data!</Layout>;
    }

    return <Course course={data.course} />;
};

export default CoursePage;
