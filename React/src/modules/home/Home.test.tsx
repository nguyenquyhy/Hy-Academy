import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Home from './Home';

test('renders header', () => {
    render(
    
        <MockedProvider>
            <Home />
        </MockedProvider>
    );

    const homeHeader = screen.getByText('Welcome!');

    expect(homeHeader).toBeInTheDocument();
});