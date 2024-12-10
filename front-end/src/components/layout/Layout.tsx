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
                <h1>Detail Panel Coming Soon</h1>
            </Panel>
        </main>
    );
};

export default Layout;