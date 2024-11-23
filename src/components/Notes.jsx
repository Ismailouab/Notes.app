import axios from 'axios';
import React, { useEffect, useState } from 'react'

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
        setNotes(resp);
        console.log(resp);
    }catch(error){
        console.error('Error fetching notes:', error.response?error.response.data:error.message);
            alert("Failed to fetch notes")
    }
 }
  return (
    <div>
        <h1>Mes Notes</h1>
        {
            notes.length > 0 ? (
                <ul>
                    {
                        notes.map((note,index)=>{
                            <li key={index}>
                                <h3>{note.data.title}</h3>
                                <p> {note.data.content}</p>
                            </li>
                        })
                    }
                </ul>
            ):(
                <p>aucune note disponible</p>
            )
        }
    </div>
  )
}

export default Notes