import { Outlet } from 'react-router-dom';
import TopMenu from 'layouts/TopMenu';

const Layout = () => (
    <>
        <TopMenu />
        <Outlet />
    </>
);

export default Layout;
