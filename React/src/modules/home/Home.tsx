import { AuthenticatedTemplate } from '@azure/msal-react';
import { Courses, AttendingCourses, TeachingCourses } from 'modules/courses';

const Home = () => (
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

export default Home;
