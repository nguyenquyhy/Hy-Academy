# Unit Tests

## React

In order to inject non-props data to React components for unit testing, we can wrap the component under test (CUT) as follows.

### Router

If the CUT contains `<Link />`, `<Navigate />` or other React Router components, we can use `<MemoryRouter>` to set current location and static history.

```tsx
import { MemoryRouter } from 'react-router-dom';

render(
    <MemoryRouter>
        <TestComponent />
    </MemoryRouter>
);
```

### Authentication

If the CUT needs authentication (e.g. `useMsal`, `useAuthentication` or `<AuthenticatedTemplate>`), we can use `setupMsalAuth` and `<MsalProvider>` as in the following example.

We can also use `setupMsalNoAuth` to test unauthorized scenarios.

```tsx
import { MsalProvider } from '@azure/msal-react';
import { setupMsalAuth } from 'tests';

const { pca } = setupMsalAuth('Test User');

render(
    <MsalProvider instance={pca}>
        <TestComponent />
    </MsalProvider>
);
```

### Apollo

If the CUT uses Apollo to query GraphQL data, mock results can be injected with `<MockedProvider>` as in the following example.

```tsx
import { MockedProvider } from '@apollo/client/testing';

const mocks = [
    {
        request: {
            query: GetCoursesDocument
        },
        result: {
            data: {
                courses: {
                    nodes: [
                        {
                            id: '14310e65-5340-42d3-a56f-93715725f6a0',
                            title: 'Test'
                        }
                    ]
                }
            }
        }
    }
];

render(
    <MockedProvider mocks={mocks}>
        <TestComponent />
    </MockedProvider>
);

// Check for loading state here
// ...

// Give time for async load
await act(() => new Promise(resolve => { setTimeout(resolve, 0); }));

// Check for loaded state here
// ...
```

## API