import { PublicClientApplication } from '@azure/msal-browser';
import polyfillCryto from './polyfillCryto';

const setupMsalNoAuth = () => {
    polyfillCryto();

    const pca = new PublicClientApplication({ auth: { clientId: '123' } });
    const getAllAccountsSpy = jest.spyOn(pca, 'getAllAccounts');
    getAllAccountsSpy.mockImplementation(() => []);

    return { pca };
};

export default setupMsalNoAuth;
