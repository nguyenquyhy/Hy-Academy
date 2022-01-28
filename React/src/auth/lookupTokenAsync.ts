import { InteractionRequiredAuthError, IPublicClientApplication } from '@azure/msal-browser';
import { loginRequest, loginSilentRequest } from './authConfig';

const lookupTokenAsync = async (instance: IPublicClientApplication, inProgress: string) => {
    const accounts = await instance.getAllAccounts();

    const account = accounts[0];
    if (inProgress === 'none') {
        if (account) {
            try {
                const result = await instance.acquireTokenSilent({
                    ...loginSilentRequest,
                    account,
                });
                return result.accessToken;
            } catch (err) {
                if (err instanceof InteractionRequiredAuthError) {
                    // fallback to interaction when silent call fails
                    return instance.acquireTokenRedirect(loginRequest);
                }
            }
        } else if (!account) {
            // We don't force login if the user has not logged in before
            return null;
        }
    }
};

export default lookupTokenAsync;