import { ApolloProvider, ApolloClient, InMemoryCache, from, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useMsal } from '@azure/msal-react';
import App from 'App';
import { lookupTokenAsync, useMsalEvents } from 'auth';
import { Dialog, LoaderBlocking } from 'controls';

const ApolloApp = () => {
    const { instance, inProgress } = useMsal();

    const { message } = useMsalEvents(instance);

    const withToken = setContext(async (_, { headers }) => {
        const token = await lookupTokenAsync(instance, inProgress);
        if (token) {
            return {
                headers: {
                    ...headers,
                    Authorization: token ? `Bearer ${token}` : null,
                },
            };
        } else {
            return { headers };
        }
    });

    const httpLink = createHttpLink({
        uri: `${process.env.REACT_APP_API_URL}/graphql`
    });

    const apollo = new ApolloClient({
        cache: new InMemoryCache(),
        link: from([withToken, httpLink])
    });

    return (
        <ApolloProvider client={apollo}>
            {inProgress === 'none' || <LoaderBlocking message='Please wait...' />}
            {!!message && <Dialog title='Account' message={message} />}
            <App />
        </ApolloProvider>
    );
}

export default ApolloApp;