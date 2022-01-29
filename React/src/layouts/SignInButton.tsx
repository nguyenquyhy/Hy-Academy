import { useMsal } from '@azure/msal-react';
import { Button } from 'controls';
import { loginRequest } from 'auth/authConfig';

const SignInButton = () => {
    const { instance } = useMsal();

    // Reference: https://github.com/Azure-Samples/ms-identity-javascript-react-spa/blob/main/src/components/SignInButton.jsx
    const handleLogin = async () => {
        try {
            await instance.loginRedirect(loginRequest);
        } catch (e) {
            // TODO: need to implement handle exception
            console.error(e);
        }
    };

    return (
        <Button onClick={() => handleLogin()}>Login / Register</Button>
    );
};

export default SignInButton;
