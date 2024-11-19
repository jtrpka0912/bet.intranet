import React from 'react';
import './App.module.css';
import Layout from './components/layout/Layout';
import { retrieveBets } from './api/bets';

/**
 * @function App
 * @description The main application component
 * @author J. Trpka
 * @returns {JSX.Element}
 */
const App = () => {
  React.useEffect(() => {
    retrieveBets();
  }, []);

  return <Layout />
}

export default App;
