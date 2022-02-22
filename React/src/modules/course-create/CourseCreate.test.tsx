import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import CourseCreatePage from '.';

test('renders', () => {
    render(
        <MockedProvider>
            <CourseCreatePage />
        </MockedProvider>
    );

    const saveButton = screen.queryByText('Save');

    expect(saveButton).toBeVisible();
});
