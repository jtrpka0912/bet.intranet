import './App.module.css';
import InputField from './common/field/input-field/InputField';

const App = () => {
  return (
    <div>
      <InputField 
        type="text"
        label="Sample"
        name="sample"
        id="sample"
        required={true}
        error="This has an error"
      />
    </div>
    
  )
}

export default App;
