import { useMsal } from '@azure/msal-react';
import { Button } from 'controls';
import { editProfile } from 'auth/authConfig';

const EditProfileButton = () => {
    const { instance } = useMsal();

    const handleEditProfile = async () => {
        await instance.loginRedirect(editProfile);
    };

    return (
        <Button onClick={() => handleEditProfile()}>Edit Profile</Button>
    );
};

export default EditProfileButton;
