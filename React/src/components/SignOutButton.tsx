import { useMsal } from "@azure/msal-react";

const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = () => {
        instance.logoutRedirect({postLogoutRedirectUri: "/",}).catch(e => {
            console.error(e);
        });
    
    }

    return (
        <button className="is-primary" onClick={() => handleLogout()}>Log Out</button>
    );
}

export default SignOutButton;