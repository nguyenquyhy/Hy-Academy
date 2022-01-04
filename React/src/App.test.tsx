import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

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
