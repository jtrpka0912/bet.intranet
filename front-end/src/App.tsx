import React from 'react';
import './App.module.css';
import ParticipantCheckbox from './common/field/participant-checkbox/ParticipantCheckbox';

const App = () => {
  const [didJeremyWon, setDidJeremyWon] = React.useState(false);
  const [didHidemiWon, setDidHidemiWon] = React.useState(false);

  return (
    <div>
      <ParticipantCheckbox 
        participant="Jeremy" 
        checked={didJeremyWon}
        onChange={() => setDidJeremyWon(!didJeremyWon)} 
      />
      
      <ParticipantCheckbox 
        participant="Hidemi" 
        checked={didHidemiWon}
        onChange={() => setDidHidemiWon(!didHidemiWon)}
      />
    </div>
    
  )
}

export default App;
