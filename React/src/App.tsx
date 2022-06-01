import { ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';

import Layout from 'layouts/Layout';
import NotFound from 'modules/notfound';
import Home from 'modules/home';
import About from 'modules/about';
import CoursePage from 'modules/course';
import CoursesPage from 'modules/courses';
import CourseCreatePage from 'modules/course-create';
import LessonPage from 'modules/lesson';
import LessonCreatePage from 'modules/lesson-create';
import { loginRequest } from 'auth/authConfig';

const Authentication = ({ children }: { children: ReactNode }) => (
    <MsalAuthenticationTemplate interactionType={InteractionType.Redirect} authenticationRequest={loginRequest}>{children}</MsalAuthenticationTemplate>
);

const App = () => (
    <div className="App">
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="courses">
                    <Route index element={<CoursesPage />} />
                    <Route path="create" element={<Authentication><CourseCreatePage /></Authentication>} />
                    <Route path=":courseId">
                        <Route index element={<CoursePage />} />
                        <Route path="lessons">
                            <Route path="create" element={<LessonCreatePage />} />
                            <Route path=":lessonId" element={<LessonPage />} />
                        </Route>
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </div>
);

export default App;
