import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './css/Notes.css';
import Header from './Header';

function Notes(props) {
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
  try{
    const resp =await axios.delete(`/notes/${id}`,{
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    console.log(resp);
    setNotes(notes.filter(note => note.id !== id));
    props.setConnected(true)
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
         
          {notes.length > 0 ? (
              <ul>
                  {notes.map((note) => 
                      (
                        <li key={note.id}>
                          <h3>{note.title}</h3>
                          <p> <strong>Content: </strong>{note.content}</p>
                          <p><strong>Created on: </strong> {new Date(note.date).toLocaleString()}</p>
                          <span>
                            <button id='btn3' onClick={()=>deleteNote(note.id)}>del</button>
                            <Link to={`/notes/${note.id}`}><button>Edit</button></Link>
                          </span>
                        </li>
                      )
                    )
                  }
                </ul>
              ) : (
                <p>Aucune note disponible</p>
              )
          }
        </div>
        
        
        
      </div>        
      </>
  

  );
}

export default Notes