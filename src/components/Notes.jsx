import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './css/Notes.css';
import Header from './Header';

function Notes() {
const [notes,setNotes]=useState([])
 useEffect(()=>{
    getNotes();
 },[])
 const getNotes= async ()=>{
    const token=localStorage.getItem('token')
    
    try{
        const resp = await axios.get('/notes', {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        console.log('API Response:', resp.data);
        setNotes(resp.data)
    }catch(error){
        console.error('Error fetching notes:', error.response?error.response.data:error.message);
            alert("Failed to fetch notes")
    }
    
 }

 const deleteNote= async(id)=>{
  const token=localStorage.getItem('token')
  console.log(token);
  var isCofimed=window.confirm('do you want deleted')
  if (isCofimed)
    try{
      const resp =await axios.delete(`/notes/${id}`,{
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      console.log(resp);
      setNotes(notes.filter(note => note.id !== id));
      
    }catch(error){
      console.error('Error deleting note:', error.response ? error.response.data : error.message);
      alert('Failed to delete note');
    }

 }
  return (
      <>
      <div className='main'>
        <Header/>
      </div>
        <h1>Mes Notes</h1> 
        <Link to='/create'><button id='btn4'>Create Note</button></Link>
      <div className='notes_card'>
        <div className="info">
              <ul>
                  {notes.map((note) => 
                      (
                        <li key={note.id}>
                          <h3>{note.title}</h3>
                          <p> <strong>Content: </strong>{note.content}</p>
                          <p><strong>Created on: </strong> {new Date(note.date).toLocaleString()}</p>
                          <p>
                            <strong>Shared With:</strong>
                          </p>
                          <div className="shared-users">
                            {(note.shared_with || []).length > 0 ? (
                              note.shared_with.map((user) => (
                                <div key={user.id} className="initials">
                                  <span className="initial-badge" title={`${user.first_name} ${user.last_name}`}>
                                    {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                                  </span>
                                </div>
                              ))
                            ) : (
                              <div className='nothing'>No users shared</div>
                            )}
                          </div>


                          <span>
                            <button id='btn3' onClick={()=>deleteNote(note.id)}>del</button>
                            <Link to={`/notes/${note.id}`}><button>Edit</button></Link>
                          </span>
                        </li>
                      )
                    )
                  }
                </ul>
        </div>
        
        
        
      </div>        
      </>
  

  );
}

export default Notes