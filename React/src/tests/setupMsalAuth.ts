import { AccountInfo, PublicClientApplication } from '@azure/msal-browser';
import polyfillCryto from './polyfillCryto';

const setupMsalAuth = (name: string) => {
    polyfillCryto();

    const testAccount: AccountInfo = {
        homeAccountId: 'abc',
        localAccountId: 'abc',
        environment: 'login.windows.net',
        tenantId: '123',
        username: 'example@microsoft.com',
        name
    };
    const pca = new PublicClientApplication({ auth: { clientId: '123' } });
    const getAllAccountsSpy = jest.spyOn(pca, 'getAllAccounts');
    getAllAccountsSpy.mockImplementation(() => [testAccount]);

    return { pca };
};

export default setupMsalAuth;
