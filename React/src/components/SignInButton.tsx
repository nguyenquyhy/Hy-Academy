import { useMsal } from "@azure/msal-react";
import Button from "controls/Button";
import { loginRequest } from "../authConfig";

const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = async () => {
        try {
            await instance.loginRedirect(loginRequest)
        } catch(e) {
            console.error(e);
        };    
    }

    return (
        <Button onClick={() => handleLogin()}>Login / Register</Button>
    );
}

export default SignInButton;