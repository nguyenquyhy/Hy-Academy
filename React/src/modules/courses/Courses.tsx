import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AuthenticatedTemplate } from '@azure/msal-react';
import { useGetCoursesQuery, useGetAttendingCoursesQuery, useGetTeachingCoursesQuery, CourseFieldFragment } from 'types';
import { ApolloError } from '@apollo/client';

const Layout = ({ children, title }: { children: ReactNode, title: string | ReactNode }) => (
    <section className="section">
        <h1 className="title">{title}</h1>
        {children}
    </section>
);

interface CourseListProps {
    title: ReactNode
    loading: boolean
    error?: ApolloError
    courses?: CourseFieldFragment[] | null
}

const CourseList = ({ title, loading, error, courses }: CourseListProps) => {
    if (loading) {
        return <Layout title={title}><p>Loading...</p></Layout>;
    }

    if (error || !courses) {
        return <Layout title={title}><p>Cannot load data!</p></Layout>;
    }

    if (courses.length === 0) {
        return (
            <Layout title={title}>
                <h2 className="subtitle">No course is available at the moment.</h2>
            </Layout>
        );
    }

    return (
        <Layout title={title}>
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

export const TeachingCourses = () => {
    const { loading, error, data } = useGetTeachingCoursesQuery();
    return (
        <CourseList
            title="Teaching Courses"
            loading={loading}
            error={error}
            courses={data?.teachingCourses?.nodes}
        />
    );
};

export const AttendingCourses = () => {
    const { loading, error, data } = useGetAttendingCoursesQuery();
    return (
        <CourseList
            title="Attending Courses"
            loading={loading}
            error={error}
            courses={data?.attendingCourses?.nodes}
        />
    );
};

const CreateButton = () => <AuthenticatedTemplate><Link to="/courses/create" className="button is-primary">Create</Link></AuthenticatedTemplate>;

export const Courses = () => {
    const { loading, error, data } = useGetCoursesQuery();
    return (
        <CourseList
            title={<>Courses <CreateButton /></>}
            loading={loading}
            error={error}
            courses={data?.courses?.nodes}
        />
    );
};

export const CoursesPage = () => (
    <>
        <AuthenticatedTemplate>
            <TeachingCourses />
            <hr />
            <AttendingCourses />
            <hr />
        </AuthenticatedTemplate>
        <Courses />
    </>
);
