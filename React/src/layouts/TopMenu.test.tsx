import { MsalProvider } from '@azure/msal-react';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ApolloApp from 'ApolloApp';
import { setupMsalAuth, setupMsalNoAuth } from 'tests';
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

test('shows login for unauthenticated user', async () => {
    const { pca } = setupMsalNoAuth();

    render(
        <MemoryRouter>
            <MsalProvider instance={pca}>
                <ApolloApp />
            </MsalProvider>
        </MemoryRouter>
    );

    await act(() => Promise.resolve());

    const loginButton = screen.getByText(/Login/);

    expect(loginButton).toBeVisible();
});

test('shows welcome message for logged in user', async () => {
    const { pca } = setupMsalAuth('Test User');

    render(
        <MemoryRouter>
            <MsalProvider instance={pca}>
                <ApolloApp />
            </MsalProvider>
        </MemoryRouter>
    );

    await act(() => Promise.resolve());

    const welcomeText = screen.getByText(/Welcome Test User/);

    expect(welcomeText).toBeVisible();
});
