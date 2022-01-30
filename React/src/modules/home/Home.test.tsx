import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Home from './Home';

test('renders home page', () => {
    render(
        <MockedProvider>
            <Home />
        </MockedProvider>
    );

    const testButton = screen.getByText('Courses');

    expect(testButton).toBeInTheDocument();
});
