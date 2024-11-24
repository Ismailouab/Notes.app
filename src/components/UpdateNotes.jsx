import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


function UpdateNotes() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams(); 
  const navigate = useNavigate();


  useEffect(()=>{
    const getNote = async()=>{
      const token = localStorage.getItem('token');
      try{
        const resp= await axios.get(`/notes/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTitle(resp.data.title);
        setContent(resp.data.content);
      }catch(error){
        console.error('Error fetching note:', error.response ? error.response.data : error.message);
        alert('Failed to load note');
      }
    }
    getNote();
  },[id])


  const update=async (e)=>{
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log('Attempting to update note with:', { title, content });
    console.log('Token:', token); 

    if (!token) {
      alert('You are not logged in!');
      return;
    }
    const shared_with = [];
    try {
      console.log('Sending PUT request to update note');
      const resp = await axios.put(`/notes/${id}`,
      { title:title , content: content, shared_with  },
      {
          headers: { Authorization: `Bearer ${token}` },
      }
      )
      console.log('Response:', resp.data);
      navigate('/');
    }catch(error){
        console.error('Error fetching notes:', error.response?error.response.data:error.message);
            alert("Failed to fetch notes")
    
    }
  }
  return (
    <div className='note'>
        <form onSubmit={update}>
        <h1>Create Note</h1>
        <input id='inputCreate' type="text" placeholder='Title'  value={title} onChange={(e) => setTitle(e.target.value)}/>
        <textarea id='content' rows={9} placeholder='Type...' maxLength={100} value={content} onChange={(e) => setContent(e.target.value)} ></textarea> 
        <button id='btn5' type='submit'>update Note</button> 
        </form>

    </div>
  )
}

export default UpdateNotes