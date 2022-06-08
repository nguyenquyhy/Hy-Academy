import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout';

test('renders nav', () => {
    render(
        <MemoryRouter>
            <MockedProvider>
                <Layout />
            </MockedProvider>
        </MemoryRouter>
    );

    const brandLogo = screen.getByTitle('Hy Academy');

    expect(brandLogo).toBeInTheDocument();
});
