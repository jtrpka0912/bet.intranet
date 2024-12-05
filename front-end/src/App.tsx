import React from 'react';
import './App.module.css';
import Layout from './components/layout/Layout';

/**
 * @function App
 * @description The main application component
 * @author J. Trpka
 * @returns {JSX.Element}
 */
const App = () => {
  React.useEffect(() => {
    // createBet({
    //   stipulation: 'Can I create from the front-end?',
    //   jeremyAnswer: 'Yes I can',
    //   hidemiAnswer: 'No he won\'t',
    //   jeremyBets: 'Continue with the next task',
    //   hidemiBets: 'Fix the problem',
    //   endsAt: new Date('2025-01-01').toISOString()
    // })
  }, []);

  return (
    <main>
      <Layout />
    </main>
    
  );
}

export default App;
