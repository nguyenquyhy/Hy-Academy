import { useMsal } from '@azure/msal-react';
import { Button } from 'controls';
import { loginRequest } from 'auth/authConfig';

const SignInButton = () => {
    const { instance } = useMsal();

    // Reference: https://github.com/Azure-Samples/ms-identity-javascript-react-spa/blob/main/src/components/SignInButton.jsx
    const handleLogin = async () => {
        await instance.loginRedirect(loginRequest);
    };

    return (
        <Button onClick={() => handleLogin()}>Login / Register</Button>
    );
};

export default SignInButton;
