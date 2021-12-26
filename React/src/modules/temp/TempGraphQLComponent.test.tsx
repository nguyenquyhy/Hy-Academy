import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import TempGraphQLComponent from './TempGraphQLComponent';
import { GetTestValueDocument } from 'types';

test('loads data', async () => {
    const mocks = [
        {
            request: {
                query: GetTestValueDocument
            },
            result: {
                data: {
                    value: 123
                }
            }
        }
    ];

    render(
        <MockedProvider mocks={mocks}>
            <TempGraphQLComponent />
        </MockedProvider>
    );

    // Loading state
    const loadingElement = screen.getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();

    await new Promise(resolve => setTimeout(resolve, 0));
    
    // Success state
    const successElement = screen.getByText(/GraphQL Data: 123/i);
    expect(successElement).toBeInTheDocument();
});

test('shows error', async () => {
    const mocks = [
        {
            request: {
                query: GetTestValueDocument
            },
            error: new Error('Network error')
        }
    ];

    render(
        <MockedProvider mocks={mocks}>
            <TempGraphQLComponent />
        </MockedProvider>
    );

    await new Promise(resolve => setTimeout(resolve, 0));
    
    // Error state
    const errorElement = screen.getByText(/Network error/i);
    expect(errorElement).toBeInTheDocument();
});