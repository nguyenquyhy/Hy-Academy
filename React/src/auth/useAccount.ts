import { useMsal, useAccount as useMsalAccount } from '@azure/msal-react';

const useAccount = () => {
    const { accounts } = useMsal();
    const account = accounts && accounts.length > 0 ? useMsalAccount({
        homeAccountId: accounts[0].homeAccountId
    }) : null;
    return account;
};

export default useAccount;
