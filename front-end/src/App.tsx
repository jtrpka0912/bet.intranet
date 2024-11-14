import './App.module.css';
import InputField from './common/field/input-field/InputField';
import Panel from './common/panel/Panel';

const App = () => {

  return (
    <div>
      <Panel>
        <InputField 
          type="text"
          label="Sample"
          name="sample"
          id="sample"
          value="Sample"
          onChange={() => {}}
        />
      </Panel>
    </div>
    
  )
}

export default App;
