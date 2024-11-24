import './App.css';
import { useState } from 'react';
import Notes from './components/Notes';
import Login from './components/Login';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import CreateNotes from './components/CreateNotes';
import UpdateNotes from './components/UpdateNotes';

function App() {
  const [connected, setConnected]=useState(false);
  return (
    <>
    <div className='main'>
      <Header setConnected={setConnected}/>
    </div>
      
      <div className="App">
        <Routes>
          <Route path='' element={
          connected ? <Notes/> :<Login setConnected={setConnected}/>
        }/>
        </Routes>
        
      </div>
      <Routes>
        <Route path='/notes/:id' element={<UpdateNotes/>}/>
        <Route path='/create' element={<CreateNotes/>}/>
      </Routes>
    </>

  );
}

export default App;
