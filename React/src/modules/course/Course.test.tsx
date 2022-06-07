import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CourseVisibility } from 'types';
import { Course } from './Course';

const defaultCourse = {
    id: 'a87be17f-13f6-4d6c-b5a6-91e89d54de94',
    title: 'Test course',
    description: 'Test description',
    visibility: CourseVisibility.Public,
    permissions: {
        canEdit: false,
        canEnroll: false
    },
    lessons: [],
};

test('renders content', () => {
    render(
        <MemoryRouter>
            <MockedProvider>
                <Course
                    data={defaultCourse}
                    enroll={jest.fn()}
                    enrollLoading={false}
                    enrollSuccess={undefined}
                />
            </MockedProvider>
        </MemoryRouter>
    );

    const title = screen.getByText('Test course');
    const description = screen.getByText('Test description');

    expect(title).toBeVisible();
    expect(description).toBeVisible();
});

test('shows edit button with permission', () => {
    render(
        <MemoryRouter>
            <MockedProvider>
                <Course
                    data={{
                        ...defaultCourse,
                        permissions: {
                            ...defaultCourse.permissions,
                            canEdit: true
                        }
                    }}
                    enroll={jest.fn()}
                    enrollLoading={false}
                    enrollSuccess={undefined}
                />
            </MockedProvider>
        </MemoryRouter>
    );

    const testButton = screen.getByText('Edit');

    expect(testButton).toBeVisible();
});

test('hides edit button without permission', () => {
    render(
        <MemoryRouter>
            <MockedProvider>
                <Course
                    data={{
                        ...defaultCourse,
                        permissions: {
                            ...defaultCourse.permissions,
                            canEdit: false
                        }
                    }}
                    enroll={jest.fn()}
                    enrollLoading={false}
                    enrollSuccess={undefined}
                />
            </MockedProvider>
        </MemoryRouter>
    );

    const testButton = screen.queryByText('Edit');

    expect(testButton).not.toBeInTheDocument();
});

test('shows enroll button with permissions', () => {
    render(
        <MemoryRouter>
            <MockedProvider>
                <Course
                    data={{
                        ...defaultCourse,
                        permissions: {
                            ...defaultCourse.permissions,
                            canEnroll: true
                        }
                    }}
                    enroll={jest.fn()}
                    enrollLoading={false}
                    enrollSuccess={undefined}
                />
            </MockedProvider>
        </MemoryRouter>
    );

    const testButton = screen.getByText('Enroll');

    expect(testButton).toBeVisible();
});

test('hides enroll button without permissions', () => {
    render(
        <MemoryRouter>
            <MockedProvider>
                <Course
                    data={{
                        ...defaultCourse,
                        permissions: {
                            ...defaultCourse.permissions,
                            canEnroll: false
                        }
                    }}
                    enroll={jest.fn()}
                    enrollLoading={false}
                    enrollSuccess={undefined}
                />
            </MockedProvider>
        </MemoryRouter>
    );

    const testButton = screen.queryByText('Enroll');

    expect(testButton).not.toBeInTheDocument();
});

test('shows error message when enrollment fails', () => {
    render(
        <MemoryRouter>
            <MockedProvider>
                <Course
                    data={{
                        ...defaultCourse,
                        permissions: {
                            ...defaultCourse.permissions,
                            canEnroll: false
                        }
                    }}
                    enroll={jest.fn()}
                    enrollLoading={false}
                    enrollSuccess={false}
                />
            </MockedProvider>
        </MemoryRouter>
    );

    const errorMessage = screen.queryByText('You cannot enroll in this course!');

    expect(errorMessage).toBeVisible();
});
