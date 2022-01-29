import { render, screen } from '@testing-library/react';
import About from './About';

test('renders header', () => {
    render(<About />);

    const aboutHeader = screen.getByText('About');

    expect(aboutHeader).toBeInTheDocument();
});
