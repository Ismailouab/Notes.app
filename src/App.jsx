import './App.css';
import { useState } from 'react';
import Notes from './components/Notes';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import CreateNotes from './components/CreateNotes';
import UpdateNotes from './components/UpdateNotes';

function App() {
  const [connected, setConnected]=useState(false);
  return (
    <Routes>
    {!connected ? (
      <Route path="/" element={<Login setConnected={setConnected} />} />
    ) : (
      <>
        <Route path="/note" element={<Notes />} />
        <Route path="/create" element={<CreateNotes />} />
        <Route path="/notes/:id" element={<UpdateNotes />} />
      </>
    )}
    <Route path="*" element={<Login setConnected={setConnected} />} />
  </Routes>
  );
}

export default App;
