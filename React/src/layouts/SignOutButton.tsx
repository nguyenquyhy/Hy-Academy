import { useMsal } from "@azure/msal-react";
import Button from "controls/Button";

const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = async () => {
        try {
            await instance.logoutRedirect({postLogoutRedirectUri: "/",})
        } catch(e) {
            //TODO: need to implement handle excecption 
            console.error(e);
        };
    
    }

    return (
        <Button onClick={() => handleLogout()}>Log Out</Button>
    );
}

export default SignOutButton;