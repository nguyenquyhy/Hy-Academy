import { render, screen } from '@testing-library/react';
import { Course } from './Course';

test('temp', () => {
    render(
        <Course course={{
            id: 'a87be17f-13f6-4d6c-b5a6-91e89d54de94',
            title: 'Test course',
            description: 'Test description'
        }}
        />
    );

    const title = screen.getByText('Test course');
    const description = screen.getByText('Test description');

    expect(title).toBeVisible();
    expect(description).toBeVisible();
});
