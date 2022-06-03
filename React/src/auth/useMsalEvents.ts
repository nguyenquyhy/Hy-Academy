import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AuthError, EventMessage, EventType, IPublicClientApplication } from '@azure/msal-browser';
import last from 'lodash/last';
import { editProfileRequest, loginRequest, resetPasswordRequest } from './authConfig';

const useMsalEvents = (instance: IPublicClientApplication) => {
    const [message, setMessage] = useState<string | null>(null);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get('reason') === 'AADB2C90118') {
            searchParams.delete('reason');
            setSearchParams(searchParams);
            setMessage('Password has been reset successfully. \nPlease sign-in with your new password.');
        }
    }, [searchParams, setSearchParams]);

    /**
     * Register MSAL event callback
     * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/events.md
     */
    useEffect(() => {
        const callbackId = instance.addEventCallback((event: EventMessage) => {
            if (event.eventType === EventType.LOGIN_FAILURE) {
                // Reference: https://github.com/Azure-Samples/ms-identity-javascript-react-tutorial/tree/main/1-Authentication/2-sign-in-b2c
                if (event.error && event.error instanceof AuthError && event.error.errorMessage.indexOf('AADB2C90118') > -1) {
                    // AADB2C90118:+The+user+has+forgotten+their+password.
                    instance.loginRedirect(resetPasswordRequest);
                }
            }

            if (event?.payload && ('idTokenClaims' in event.payload) && event.payload.idTokenClaims && ('tfp' in event.payload.idTokenClaims)) {
                /**
                 * We need to reject id tokens that were not issued with the default sign-in policy.
                 * "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr").
                 * To learn more about B2C tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
                 */
                switch (event.payload.idTokenClaims.tfp) {
                    case last(resetPasswordRequest.authority.split('/')):
                        switch (event.eventType) {
                            case EventType.LOGIN_SUCCESS:
                                instance.logout({
                                    postLogoutRedirectUri: '/?reason=AADB2C90118'
                                });
                                break;
                            default:
                                break;
                        }
                        break;
                    case last(editProfileRequest.authority.split('/')):
                        switch (event.eventType) {
                            case EventType.LOGIN_SUCCESS:
                            case EventType.ACQUIRE_TOKEN_SUCCESS:
                                // Note: msal:loginSuccess occurs for the first edit, and msal:acquireTokenSuccess for subsequent ones
                                instance.loginRedirect(loginRequest);
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
            }
        });

        return () => {
            if (callbackId) {
                instance.removeEventCallback(callbackId);
            }
        };
    }, [instance, setMessage]);

    return { message };
};

export default useMsalEvents;
