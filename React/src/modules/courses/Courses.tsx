import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useGetCoursesQuery } from 'types';

const Layout = ({ children }: { children: ReactNode }) => (
    <section className="section">
        <h1 className="title">Courses</h1>
        {children}
    </section>
);

export const Courses = () => {
    const { loading, error, data } = useGetCoursesQuery();

    if (loading) {
        return <Layout><p>Loading...</p></Layout>;
    }

    if (error || !data) {
        return <Layout><p>Cannot load data!</p></Layout>;
    }

    if (data.courses.length === 0) {
        return (
            <Layout>
                <h2 className="subtitle">No course is available at the moment.</h2>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="columns is-multiline">
                {data.courses.map(course => (
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

export const CoursesPage = () => <Courses />;
