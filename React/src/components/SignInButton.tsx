import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginRedirect(loginRequest).catch(e => {
            console.error(e);
        });
    
    }

    return (
        <button className="is-primary" onClick={() => handleLogin()}>Login</button>
    );
}

export default SignInButton;