import { fireEvent, render, screen } from '@testing-library/react';
import Notification from './Notification';

test('renders message by default', () => {
    render(<Notification message="Test notification" />);

    const message = screen.queryByText('Test notification');

    expect(message).toBeVisible();
});

test('dismisses on clicking close', () => {
    render(<Notification message="Test notification" />);

    const background = screen.getByLabelText('close');

    fireEvent.click(background);

    const message = screen.queryByText('Test notification');

    expect(message).not.toBeInTheDocument();
});
