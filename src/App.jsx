import './App.css';
import { useState } from 'react';
import Notes from './components/Notes';
import Login from './components/Login';

function App() {
  const [connected, setConnected]=useState(false);
  return (
    <div className="App">
      {
        connected ? <Notes/> :<Login setConnected={setConnected}/>
      }
    </div>
  );
}

export default App;
