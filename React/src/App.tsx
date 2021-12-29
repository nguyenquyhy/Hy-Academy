import TopMenu from 'layouts/TopMenu';
import TempGraphQLComponent from 'modules/temp/TempGraphQLComponent';
import Button from 'controls/Button';

const App = () => (
    <div className="App">
        <TopMenu />
        <header className="App-header">
            <p>
                Welcome!
            </p>
        </header>
        <TempGraphQLComponent />
        <div className="buttons">
            <Button>Test button</Button><br />
            <Button loading={true}>Loading button</Button>
        </div>
    </div>
);

export default App;
