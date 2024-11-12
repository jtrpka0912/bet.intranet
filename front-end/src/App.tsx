import './App.module.css';
import ParticipantCheckbox from './common/field/participant-checkbox/ParticipantCheckbox';

const App = () => {
  return (
    <div>
      <ParticipantCheckbox participant="Jeremy" />
      <ParticipantCheckbox participant="Hidemi" />
    </div>
    
  )
}

export default App;
