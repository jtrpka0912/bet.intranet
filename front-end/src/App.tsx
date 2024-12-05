import React from 'react';
import './App.module.css';
import Layout from './components/layout/Layout';
import { createBet } from './api/bets';
import Modal from './components/common/modal/Modal';

/**
 * @function App
 * @description The main application component
 * @author J. Trpka
 * @returns {JSX.Element}
 */
const App = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);


  React.useEffect(() => {
    // createBet({
    //   stipulation: 'Can I create from the front-end?',
    //   jeremyAnswer: 'Yes I can',
    //   hidemiAnswer: 'No he won\'t',
    //   jeremyBets: 'Continue with the next task',
    //   hidemiBets: 'Fix the problem',
    //   endsAt: new Date('2025-01-01').toISOString()
    // })

    setTimeout(() => {
      setModalOpen(true);
    }, 3000);
  }, []);

  const handleOnClose = () => {
    setModalOpen(false);
  }

  return (
    <main>
      <Layout />
      <Modal title="Sample" isOpen={modalOpen} onClose={handleOnClose}>
        <p>Hello World</p>
      </Modal>
    </main>
    
  );
}

export default App;
