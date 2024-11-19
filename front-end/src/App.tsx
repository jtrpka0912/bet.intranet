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
    retrievePaginatedBets();
  }, []);

  /**
   * @async
   * @function retrievePaginatedBets
   * @description Retrieve a paginated amount of bets
   * @author J. Trpka
   * @param {number} page 
   * @param {number} limit 
   */
  const retrievePaginatedBets = async (page: number = 0, limit: number = 20) => {
    try {
      const response = await retrieveBets(page, limit);

      console.info(response);
    } catch(e) {
      console.error(e);
    }
  }

  return <Layout />
}

export default App;
