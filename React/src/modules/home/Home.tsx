import TempGraphQLComponent from 'modules/temp/TempGraphQLComponent';
import { Button } from 'controls';

const Home = () => (
    <>
        <TempGraphQLComponent />
        <div className="buttons">
            <Button>Test button</Button><br />
            <Button loading>Loading button</Button>
        </div>
    </>
);

export default Home;
