import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AuthError, EventMessage, EventType, IPublicClientApplication } from '@azure/msal-browser';
import last from 'lodash/last';
import { resetPasswordRequest } from './authConfig';

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

            if (event.eventType === EventType.LOGIN_SUCCESS) {
                if (event?.payload && ('idTokenClaims' in event.payload)) {
                    /**
                     * We need to reject id tokens that were not issued with the default sign-in policy.
                     * "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr").
                     * To learn more about B2C tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
                     */
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any,prefer-destructuring
                    const idTokenClaims: any = event.payload.idTokenClaims;
                    const resetPasswordPolicyId = last(resetPasswordRequest.authority.split('/'));
                    if (idTokenClaims && idTokenClaims.tfp === resetPasswordPolicyId) {
                        instance.logout({
                            postLogoutRedirectUri: '/?reason=AADB2C90118'
                        });
                    }
                }
            }
        });

        return () => {
            if (callbackId) {
                instance.removeEventCallback(callbackId);
            }
        };
    }, [instance, setMessage]);

    return { message, setMessage };
};

export default useMsalEvents;
