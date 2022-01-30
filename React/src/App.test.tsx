import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders layout', () => {
    render(
        <MemoryRouter>
            <MockedProvider>
                <App />
            </MockedProvider>
        </MemoryRouter>
    );
    const linkElement = screen.getByText(/Login \/ Register/i);
    expect(linkElement).toBeInTheDocument();
});
