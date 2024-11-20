import S from './Layout.module.css';
import Panel from "../common/panel/Panel";
import ListPanel from '../panels/list/List';

/**
 * @function Layout
 * @description The general layout of the web app
 * @author J. Trpka
 * @returns {JSX.Element}
 */
const Layout = () => {
    return (
        <main className={S.layout}>
            <ListPanel />

            <Panel>
                <h1>Detail View</h1>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </Panel>
        </main>
    );
};

export default Layout;