import { useMsal } from '@azure/msal-react';
import TempGraphQLComponent from 'modules/temp/TempGraphQLComponent';
import { Button } from 'controls';

const Home = () => {
    const { accounts } = useMsal();
    
    return <>
        <h2>{accounts && accounts.length > 0 ? `Welcome ${accounts[0].name} !` : 'Welcome!'}</h2>
        <TempGraphQLComponent />
        <div className="buttons">
            <Button>Test button</Button><br />
            <Button loading={true}>Loading button</Button>
        </div>
    </>
};

export default Home;