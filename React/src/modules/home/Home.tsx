import TempGraphQLComponent from 'modules/temp/TempGraphQLComponent';
import Button from 'controls/Button';

const Home = () => (
    <>
        <h2>Welcome!</h2>
        <TempGraphQLComponent />
        <div className="buttons">
            <Button>Test button</Button><br />
            <Button loading={true}>Loading button</Button>
        </div>
    </>
);

export default Home;