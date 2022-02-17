import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AuthenticatedTemplate } from '@azure/msal-react';
import { useGetCoursesQuery, useGetMyCoursesQuery } from 'types';

const Layout = ({ children, title }: { children: ReactNode, title: string | ReactNode }) => (
    <section className="section">
        <h1 className="title">{title}</h1>
        {children}
    </section>
);

export const MyCourses = () => {
    const { loading, error, data } = useGetMyCoursesQuery();
    const title = 'My Courses';

    if (loading) {
        return <Layout title={title}><p>Loading...</p></Layout>;
    }

    if (error || !data?.myCourses?.nodes) {
        return <Layout title={title}><p>Cannot load data!</p></Layout>;
    }

    const myCourses = data.myCourses.nodes;

    if (myCourses.length === 0) {
        return (
            <Layout title={title}>
                <h2 className="subtitle">No course is available at the moment.</h2>
            </Layout>
        );
    }

    return (
        <Layout title={title}>
            <div className="columns is-multiline">
                {myCourses.map(course => (
                    <div key={course.id} className="column is-6">
                        <div className="card">
                            <div className="card-content">
                                <div className="media">
                                    <p className="title">{course.title}</p>
                                </div>
                                <div className="content">
                                    <p>{course.description}</p>
                                </div>
                            </div>
                            <div className="card-footer">
                                <Link to={`/courses/${course.id}`} className="card-footer-item">Read More</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

const CreateButton = () => <AuthenticatedTemplate><Link to="/courses/create" className="button is-primary">Create</Link></AuthenticatedTemplate>;

export const Courses = () => {
    const { loading, error, data } = useGetCoursesQuery();
    const title = 'Courses';

    if (loading) {
        return <Layout title={title}><p>Loading...</p></Layout>;
    }

    if (error || !data?.courses?.nodes) {
        return <Layout title={title}><p>Cannot load data!</p></Layout>;
    }

    const courses = data.courses.nodes;

    if (courses.length === 0) {
        return (
            <Layout title={<>{title} <CreateButton /></>}>
                <h2 className="subtitle">No course is available at the moment.</h2>
            </Layout>
        );
    }

    return (
        <Layout title={<>{title} <CreateButton /></>}>
            <div className="columns is-multiline">
                {courses.map(course => (
                    <div key={course.id} className="column is-6">
                        <div className="card">
                            <div className="card-content">
                                <div className="media">
                                    <p className="title">{course.title}</p>
                                </div>
                                <div className="content">
                                    <p>{course.description}</p>
                                </div>
                            </div>
                            <div className="card-footer">
                                <Link to={`/courses/${course.id}`} className="card-footer-item">Read More</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export const CoursesPage = () => (
    <>
        <AuthenticatedTemplate>
            <MyCourses />
            <hr />
        </AuthenticatedTemplate>
        <Courses />
    </>
);
