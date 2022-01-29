import { fireEvent, screen } from '@testing-library/react';
import Dialog from './Dialog';
import renderWithStyle from './renderWithStyle';

test('renders title and message by default', () => {
    renderWithStyle(
        <Dialog title="Test title" message="Test message" />,
        { stylesheet: '.modal { display:none } .modal.is-active { display:block }' }
    );

    const title = screen.getByText('Test title');
    const message = screen.getByText('Test message');

    expect(title).toBeVisible();
    expect(message).toBeVisible();
});

test('dismisses on clicking background', () => {
    // Render with some Bulma styles
    renderWithStyle(
        <Dialog title="Test title" message="Test message" />,
        { stylesheet: '.modal { display:none } .modal.is-active { display:block }' }
    );

    const background = screen.getByTestId('dialog-background');

    fireEvent.click(background);

    const title = screen.getByText('Test title');
    const message = screen.getByText('Test message');

    expect(title).not.toBeVisible();
    expect(message).not.toBeVisible();
});

test('dismisses on clicking close', () => {
    // Render with some Bulma styles
    renderWithStyle(
        <Dialog title="Test title" message="Test message" />,
        { stylesheet: '.modal { display:none } .modal.is-active { display:block }' }
    );

    const background = screen.getByLabelText('close');

    fireEvent.click(background);

    const title = screen.getByText('Test title');
    const message = screen.getByText('Test message');

    expect(title).not.toBeVisible();
    expect(message).not.toBeVisible();
});
