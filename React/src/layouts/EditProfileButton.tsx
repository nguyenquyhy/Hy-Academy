import { useMsal } from '@azure/msal-react';
import { Button } from 'controls';
import { editProfileRequest } from 'auth/authConfig';

const EditProfileButton = () => {
    const { instance } = useMsal();

    const handleEditProfile = async () => {
        await instance.loginRedirect(editProfileRequest);
    };

    return (
        <Button onClick={() => handleEditProfile()}>Edit Profile</Button>
    );
};

export default EditProfileButton;
