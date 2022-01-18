import { useMsal } from "@azure/msal-react";
import Button from "controls/Button";

const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = () => {
        instance.logoutRedirect({postLogoutRedirectUri: "/",}).catch(e => {
            console.error(e);
        });
    
    }

    return (
        <Button onClick={() => handleLogout()}>Log Out</Button>
    );
}

export default SignOutButton;