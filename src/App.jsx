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
    
      
      <div className="App">
      <Routes>
        {
          
          connected ? <Route path='/note' element={<Notes />}/> 
          :<Route path='/' element={<Login setConnected={setConnected}/>}/> 
        }  
        </Routes>  
      </div>
      <Routes>
      <Route path='/n' element={<Header setConnected={setConnected}/>}/>
        <Route path='/notes/:id' element={<UpdateNotes setConnected={setConnected}/>}/>
        <Route path='/create' element={<CreateNotes setConnected={setConnected}/>}/>
      </Routes>
    </>

  );
}

export default App;
