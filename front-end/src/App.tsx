import './App.css';
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
      <Layout />
    </Provider>
  );
}

export default App;
