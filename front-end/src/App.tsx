import { useState } from 'react';
import './App.module.css';
import InputField from './common/field/input-field/InputField';

const App = () => {
  const [sample, setSample] = useState('');

  return (
    <div>
      <InputField 
        type="textarea"
        label="Sample"
        name="sample"
        id="sample"
        required={true}
        value={sample}
        onChange={(e) => {setSample(e.target.value)}}
      />
    </div>
    
  )
}

export default App;
