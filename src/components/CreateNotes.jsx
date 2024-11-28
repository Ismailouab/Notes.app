import axios from 'axios'
import React, { useState } from 'react'
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import './css/CreateNotes.css';


function CreateNotes(props) {
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
        props.setConnected(true)
        navigate('/note');
        
    }catch(error){
        console.error('login error:', error.response?error.response.data:error.message);
        alert("login failed please check your credentials")
    }
 }
  return (
    <>
        <div className='main'>
            <Header />
        </div>
        <div className='note'>
            <form onSubmit={createNote} className='form'>
                <h1>Create Note</h1>
                <input id='inputCreate' type="text" placeholder='Title'  value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <textarea  id='content'rows={9} placeholder='Type...'  value={content} maxLength={100}onChange={(e)=>setContent(e.target.value)}></textarea>
                <button id='btn5' type="submit">Create Note</button>
            </form>

            <div className='note_footer'>
            </div>
        </div>
    </>

  )
}

export default CreateNotes