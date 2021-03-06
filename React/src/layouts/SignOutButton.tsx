import { useMsal } from '@azure/msal-react';
import { Button } from 'controls';
import { logoutRequest } from 'auth/authConfig';
import { ButtonType } from 'controls/Button';

const SignOutButton = () => {
    const { instance } = useMsal();

    // Reference: https://github.com/Azure-Samples/ms-identity-javascript-react-spa/blob/main/src/components/SignOutButton.jsx
    const handleLogout = async () => {
        await instance.logoutRedirect(logoutRequest);
    };

    return (
        <Button onClick={() => handleLogout()} type={ButtonType.Secondary}>Log Out</Button>
    );
};

export default SignOutButton;
