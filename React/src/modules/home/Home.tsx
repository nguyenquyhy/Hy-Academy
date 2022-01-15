import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import TempGraphQLComponent from 'modules/temp/TempGraphQLComponent';
import Button from 'controls/Button';
import { loginRequest } from 'authConfig';

const Home = () => {
    const { instance, accounts, inProgress } = useMsal();
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const f = async () => {
            if (inProgress === 'none' && accounts.length > 0) {
                // Retrieve an access token
                const response = await instance.acquireTokenSilent({
                    ...loginRequest,
                    account: accounts[0]
                });
                if (response.accessToken) {
                    setAccessToken(response.accessToken);
                }
            }
        };
        f();
    }, [inProgress, accounts, instance])
    
    return <>
        <h2>Welcome!</h2>
        <TempGraphQLComponent />
        <div className="buttons">
            <Button>Test button</Button><br />
            <Button loading={true}>Loading button</Button>
        </div>
    </>
};

export default Home;