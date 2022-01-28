import { useMsal } from '@azure/msal-react';
import { Button } from 'controls';
import { editProfile } from 'auth/authConfig';

const EditProfileButton = () => {
    const { instance } = useMsal();

    const handleEditProfile = async () => {
        try {
            await instance.loginRedirect(editProfile)
        } catch(e) {
            //TODO: need to implement handle excecption 
            console.error(e);
        };    
    }

    return (
        <Button onClick={() => handleEditProfile()}>Edit Profile</Button>
    );
}

export default EditProfileButton;