import { render, screen } from "@testing-library/react";
import LoaderBlocking from "./LoaderBlocking";

test('renders message', () => {
    render(<LoaderBlocking message="Test message" />);

    const message = screen.getByText('Test message');

    expect(message).toBeInTheDocument();
})