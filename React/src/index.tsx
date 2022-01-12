import './sass/styles.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { MsalProvider } from '@azure/msal-react';
import { Configuration, PublicClientApplication } from '@azure/msal-browser';
import App from './App';
import reportWebVitals from './reportWebVitals';

const apollo = new ApolloClient({
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
    cache: new InMemoryCache()
});

const configuration: Configuration = {
    auth: {
        clientId: '0b4344df-c1ea-4ff2-ba85-299c41f62fd7',
        authority: 'https://hyacademyproduction.b2clogin.com/hyacademyproduction.onmicrosoft.com/B2C_1_HyAcademySignUpSignIn',
        knownAuthorities: ['hyacademyproduction.b2clogin.com']
    }
};

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ApolloProvider client={apollo}>
                <MsalProvider instance={new PublicClientApplication(configuration)}>
                    <App />
                </MsalProvider>
            </ApolloProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
