import './App.module.css';
import Button from './common/button/Button';

const App = () => {
  return (
    <div>
      <Button color="secondary" size="large" disabled={true}>Hello World</Button>  
    </div>
    
  )
}

export default App;
