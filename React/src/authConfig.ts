export const msalConfig = {
    auth: {
        clientId: process.env.REACT_APP_B2C_CLIENT_ID ?? '',
        authority: process.env.REACT_APP_B2C_AUTHORITY ?? '',
        knownAuthorities: [process.env.REACT_APP_B2C_KNOWN_AUTHORITIES ?? ''],        
    }
};
export const b2cPolicies = {
    authorities: {
        editProfile: {
            authority: process.env.REACT_APP_B2C_EDIT_PROFILE ?? '',
        }
    }
}

export const loginRequest = {
    scopes: [process.env.REACT_APP_B2C_API_SCOPE ?? '']
};
