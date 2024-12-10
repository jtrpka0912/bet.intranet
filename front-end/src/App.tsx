import './App.module.css';
import Layout from './components/layout/Layout';
import { Provider } from 'react-redux';
import { store } from './store';

/**
 * @function App
 * @description The main application component
 * @author J. Trpka
 * @returns {JSX.Element}
 */
const App = () => {
  return (
    <Provider store={store}>
      <main>
        <Layout />
      </main>
    </Provider>
  );
}

export default App;
