import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders home page', () => {
    render(
        <MemoryRouter>
            <MockedProvider>
                <App />
            </MockedProvider>
        </MemoryRouter>
    );
    const linkElement = screen.getByText(/Welcome/i);
    expect(linkElement).toBeInTheDocument();
});
