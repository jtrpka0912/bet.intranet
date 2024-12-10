import S from './Layout.module.css';
import ListPanel from '../panels/list/List';
import DetailPanel from '../panels/detail/Detail';

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

            <DetailPanel />
        </main>
    );
};

export default Layout;