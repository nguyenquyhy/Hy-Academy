import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

test('renders header', () => {
    render(<NotFound />);

    const notFoundHeader = screen.getByText('Page Not Found!');

    expect(notFoundHeader).toBeInTheDocument();
});