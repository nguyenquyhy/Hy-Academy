import { useMsal } from "@azure/msal-react";

const SignInButton = () => {
    const { instance } = useMsal();
    const scopes: string[] = ['https://mocpos.onmicrosoft.com/api/global'];

    const handleLogin = () => {
        instance.loginRedirect({ scopes }).catch(e => {
            console.error(e);
        });
    
    }

    return (
        <button className="is-primary" onClick={() => handleLogin()}>Login</button>
    );
}

export default SignInButton;