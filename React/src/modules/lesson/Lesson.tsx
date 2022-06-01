import { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GetLessonQuery, useGetLessonQuery } from 'types';

type QueriedLesson = NonNullable<GetLessonQuery['lesson']>;

const Layout = ({ children }: { children: ReactNode }) => (
    <section className="section">{children}</section>
);

interface LessonProps {
    data: QueriedLesson,
}

export const Lesson = ({ data }: LessonProps) => (
    <Layout>
        <h1 className="title"><Link to={`/courses/${data.course.id}`}>{data.course.title}</Link></h1>
        <h2 className="title is-4">{data.title}</h2>
        <p>{data.description}</p>
    </Layout>
);

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
