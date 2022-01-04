import { Route, Routes } from 'react-router-dom';

import Layout from 'layouts/Layout';
import NotFound from 'modules/notfound';
import Home from 'modules/home';
import About from 'modules/about';

const App = () => (
    <div className="App">
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </div>
);

export default App;
