import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


function CreateNotes() {
const [title,setTitle]=useState('')
const [content,setContent]=useState('')
const navigate = useNavigate(); 
const createNote =async(e)=>{
    e.preventDefault();
    console.log('Attempting to create note with:', { title, content });
    const token = localStorage.getItem('token');
    try{
        const resp = await axios.post('/notes',
            { title:title, content:content },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        console.log('Created Note:', resp.data);
        navigate('/');
    }catch(error){
        console.error('login error:', error.response?error.response.data:error.message);
        alert("login failed please check your credentials")
    }
 }
  return (
    <div className='note'>
        <form onSubmit={createNote}>
            <input type="text" placeholder='Title'  value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <textarea cols={10} rows={5} placeholder='Type...'  value={content} maxLength={100}onChange={(e)=>setContent(e.target.value)}></textarea>
            <button type="submit">Create Note</button>
        </form>

        <div className='note_footer'>
        </div>
    </div>
  )
}

export default CreateNotes