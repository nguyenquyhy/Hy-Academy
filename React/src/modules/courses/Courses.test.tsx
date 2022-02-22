import { act, render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MsalProvider } from '@azure/msal-react';
import { MemoryRouter } from 'react-router-dom';
import { GetCoursesDocument } from 'types';
import { setupMsalAuth } from 'tests';
import { Courses } from './Courses';

test('renders Create button when the list is empty (authenticated)', async () => {
    const { pca } = setupMsalAuth('Test User');
    const mocks = [
        {
            request: {
                query: GetCoursesDocument
            },
            result: {
                data: {
                    courses: {
                        nodes: []
                    }
                }
            }
        }
    ];

    render(
        <MemoryRouter>
            <MsalProvider instance={pca}>
                <MockedProvider mocks={mocks}>
                    <Courses />
                </MockedProvider>
            </MsalProvider>
        </MemoryRouter>
    );

    // Give time for async load
    await act(() => new Promise(resolve => { setTimeout(resolve, 0); }));

    const button = screen.queryByText('Create');

    expect(button).toBeInTheDocument();
});

test('renders Create button when the list is not empty (authenticated)', async () => {
    const { pca } = setupMsalAuth('Test User');
    const mocks = [
        {
            request: {
                query: GetCoursesDocument
            },
            result: {
                data: {
                    courses: {
                        nodes: [
                            {
                                id: '6b7ed6b8-f932-464a-860e-2b53f76ac338',
                                title: 'Test title',
                                description: 'Test description'
                            }
                        ]
                    }
                }
            }
        }
    ];

    render(
        <MemoryRouter>
            <MsalProvider instance={pca}>
                <MockedProvider mocks={mocks}>
                    <Courses />
                </MockedProvider>
            </MsalProvider>
        </MemoryRouter>
    );

    // Give time for async load
    await act(() => new Promise(resolve => { setTimeout(resolve, 0); }));

    const button = screen.queryByText('Create');

    expect(button).toBeInTheDocument();
});
