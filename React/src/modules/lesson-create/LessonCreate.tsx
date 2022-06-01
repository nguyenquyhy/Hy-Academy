import { FormEvent, ReactNode, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button, Input, Notification } from 'controls';
import { ButtonType } from 'controls/Button';
import { GetCourseDocument, useAddLessonMutation, useGetCourseForLessonQuery } from 'types';

const Layout = ({ children }: { children: ReactNode }) => (
    <section className="section">
        {children}
    </section>
);

const LessonCreatePage = () => {
    const params = useParams<{ courseId: string }>();

    if (!params.courseId) {
        return <Layout>Invalid course</Layout>;
    }

    const { data: courseData, loading: courseLoading, error: courseError } = useGetCourseForLessonQuery({ variables: { id: params.courseId } });

    if (courseLoading) {
        return <Layout>Loading...</Layout>;
    }

    if (courseError) {
        return <Layout>Cannot load course!</Layout>;
    }

    if (!courseData || !courseData.course) {
        return <Layout>This course does not exist anymore.</Layout>;
    }

    const [data, setData] = useState({ title: '', description: '' });
    const [addLesson, { loading, error, data: addData }] = useAddLessonMutation({
        refetchQueries: [
            { query: GetCourseDocument, variables: { id: params.courseId } }
        ]
    });

    useEffect(() => {
        if (addData) {
            setData(addData.addLesson.lesson);
        }
    }, [addData]);

    const handleChange = (name: string, value: string) => setData({ ...data, [name]: value });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        addLesson({
            variables: {
                input: {
                    ...data,
                    courseId: params.courseId
                }
            }
        });
    };

    if (addData?.addLesson?.lesson) {
        return <Navigate to={`/courses/${params.courseId}/lessons/${addData.addLesson.lesson.id}`} />;
    }

    return (
        <Layout>
            <h1 className="title"><Link to={`/courses/${params.courseId}`}>{courseData.course.title}</Link></h1>
            <h2 className="title is-4">Create new lesson</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    label="Title" name="title"
                    placeholder="Please enter lesson title" required
                    loading={loading}
                    value={data.title} onChange={handleChange}
                />
                <Input
                    label="Description" name="description"
                    placeholder="Please enter lesson description" required multiline
                    loading={loading}
                    value={data.description} onChange={handleChange}
                />
                <div className="control">
                    <Button type={ButtonType.Submit} loading={loading}>Save</Button>
                </div>
                {!!error && <Notification message="You cannot add the lesson!" />}
            </form>
        </Layout>
    );
};

export default LessonCreatePage;
