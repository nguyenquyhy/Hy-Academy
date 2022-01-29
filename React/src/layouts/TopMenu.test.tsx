import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TopMenu from './TopMenu';

test('renders brand link', () => {
    render(
        <MemoryRouter>
            <TopMenu />
        </MemoryRouter>
    );

    const brandImage = screen.getByTitle('Hy Academy');

    expect(brandImage).toBeInTheDocument();
    expect(brandImage).toHaveAttribute('href', '/');
});

test('renders about link', () => {
    render(
        <MemoryRouter>
            <TopMenu />
        </MemoryRouter>
    );

    const brandImage = screen.getByText('About');

    expect(brandImage).toBeInTheDocument();
    expect(brandImage).toHaveAttribute('href', '/about');
});
