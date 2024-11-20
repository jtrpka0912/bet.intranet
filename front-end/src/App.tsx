import React from 'react';
import './App.module.css';
import Layout from './components/layout/Layout';
import { createBet } from './api/bets';

/**
 * @function App
 * @description The main application component
 * @author J. Trpka
 * @returns {JSX.Element}
 */
const App = () => {
  React.useEffect(() => {
    createBet({
      stipulation: 'Can I create from the front-end?',
      jeremyAnswer: 'Yes I can',
      hidemiAnswer: 'No he won\'t',
      jeremyBets: 'Continue with the next task',
      hidemiBets: 'Fix the problem',
      endsAt: new Date().toISOString()
    })
  }, [])
  return <Layout />
}

export default App;
