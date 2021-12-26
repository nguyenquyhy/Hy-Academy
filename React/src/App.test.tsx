import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import App from './App';

test('renders welcome', () => {
    render(
        <MockedProvider>
            <App />
        </MockedProvider>
    );
    const linkElement = screen.getByText(/Welcome/i);
    expect(linkElement).toBeInTheDocument();
});
