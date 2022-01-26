if (!process.env.REACT_APP_B2C_CLIENT_ID) throw new Error("CLIENT_ID must have value");
if (!process.env.REACT_APP_B2C_SIGNUP_SIGNIN) throw new Error("SIGNUP_SIGNIN must have value");
if (!process.env.REACT_APP_B2C_KNOWN_AUTHORITIES) throw new Error("KNOWN_AUTHORITIES must have value");
if (!process.env.REACT_APP_B2C_EDIT_PROFILE) throw new Error("KNOWN_AUTHORITIES must have value");
if (!process.env.REACT_APP_B2C_RESET_PASSWORD) throw new Error("RESET_PASSWORD must have value");
if (!process.env.REACT_APP_B2C_API_SCOPE) throw new Error("API_SCOPE must have value");

export const msalConfig = {        
    auth: {
        clientId: process.env.REACT_APP_B2C_CLIENT_ID ,
        authority: process.env.REACT_APP_B2C_SIGNUP_SIGNIN,
        knownAuthorities: [process.env.REACT_APP_B2C_KNOWN_AUTHORITIES]       
    }
};

export const loginRequest = {
    scopes: [process.env.REACT_APP_B2C_API_SCOPE]
};

export const editProfile = {
    authority: process.env.REACT_APP_B2C_EDIT_PROFILE,
    scopes: []
};

export const forgotPassword = {
    authority: process.env.REACT_APP_B2C_EDIT_PROFILE,
    scopes: []
};
