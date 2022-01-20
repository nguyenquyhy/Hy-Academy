import { RedirectRequest } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import Button from "controls/Button";
import { b2cPolicies } from "../authConfig";

const EditProfileButton = () => {
    const { instance } = useMsal();

    const handleEditProfile = async () => {
        try {
            await instance.loginRedirect({ ...b2cPolicies.authorities.editProfile} as RedirectRequest)
        } catch(e) {
            console.error(e);
        };    
    }

    return (
        <Button onClick={() => handleEditProfile()}>Edit Profile</Button>
    );
}

export default EditProfileButton;