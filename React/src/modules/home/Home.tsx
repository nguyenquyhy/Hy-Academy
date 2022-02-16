import { AuthenticatedTemplate } from '@azure/msal-react';
import { Courses, MyCourses } from 'modules/courses';

const Home = () => (
    <>
        <AuthenticatedTemplate>
            <MyCourses />
            <hr />
        </AuthenticatedTemplate>
        <Courses />
    </>
);

export default Home;
