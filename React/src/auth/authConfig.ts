import { RedirectRequest } from '@azure/msal-browser';

if (!process.env.REACT_APP_B2C_CLIENT_ID) throw new Error('CLIENT_ID must have value');
if (!process.env.REACT_APP_B2C_API_SCOPE) throw new Error('API_SCOPE must have value');
if (!process.env.REACT_APP_B2C_AUTHORITY) throw new Error('AUTHORITY must have value');
if (!process.env.REACT_APP_B2C_SIGNUP_SIGNIN) throw new Error('SIGNUP_SIGNIN must have value');
if (!process.env.REACT_APP_B2C_EDIT_PROFILE) throw new Error('EDIT_PROFILE must have value');
if (!process.env.REACT_APP_B2C_RESET_PASSWORD) throw new Error('RESET_PASSWORD must have value');

export const msalConfig = {
    auth: {
        clientId: process.env.REACT_APP_B2C_CLIENT_ID,
        authority: process.env.REACT_APP_B2C_SIGNUP_SIGNIN,
        knownAuthorities: [process.env.REACT_APP_B2C_AUTHORITY]
    }
};

export const loginRequest: RedirectRequest = {
    scopes: [process.env.REACT_APP_B2C_API_SCOPE],
    redirectUri: process.env.REACT_APP_B2C_REDIRECT_URL,
    state: process.env.REACT_APP_B2C_STATE
};

export const logoutRequest = {
    postLogoutRedirectUri: '/'
};

export const editProfile = {
    authority: process.env.REACT_APP_B2C_EDIT_PROFILE,
    scopes: []
};

export const resetPasswordRequest = {
    authority: process.env.REACT_APP_B2C_RESET_PASSWORD,
    scopes: []
};

export const loginSilentRequest = {
    scopes: [process.env.REACT_APP_B2C_API_SCOPE]
};
