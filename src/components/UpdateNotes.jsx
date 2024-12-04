import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';


function UpdateNotes() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [users, setUsers] = useState([]);
  const [sharedWith, setSharedWith] = useState([]);
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
        setSharedWith(resp.data.shared_with.map(user => user.id));


        const usersResp = await axios.get('/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersResp.data);

      }catch(error){
        console.error('Error fetching note:', error.response ? error.response.data : error.message);
        alert('Failed to load note');
      }
    }
    getNote();
  },[id])

  const handleShareChange = (e) => {
    const value = Array.from(e.target.selectedOptions,(option) => parseInt(option.value));
    setSharedWith(value);
 
  };

  const update=async (e)=>{
    e.preventDefault();
    const token = localStorage.getItem('token');
  
    console.log('Token:', token); 

    if (!token) {
      alert('You are not logged in!');
      return;
    }
     console.log('Updating note with shared users:', sharedWith);
    try {
      const resp = await axios.put(`/notes/${id}`,
      { title ,  content, shared_with: sharedWith },
      {
          headers: { Authorization: `Bearer ${token}` },
      }
      )
      console.log('Response:', resp.data);
      navigate('/note');
    }catch(error){
        console.error('Error fetching notes:', error.response?error.response.data:error.message);
            alert("Failed to fetch notes")
    
    }
  }
  return (
    <>
      <div className='main'>
        <Header />
      </div>
      <div className='note'>
          <form onSubmit={update}>
          <h1>Create Note</h1>
          <input id='inputCreate' type="text" placeholder='Title'  value={title} onChange={(e) => setTitle(e.target.value)}/>
          <textarea id='content' rows={9} placeholder='Type...' maxLength={100} value={content} onChange={(e) => setContent(e.target.value)} ></textarea> 
          
          <select multiple value={sharedWith} onChange={handleShareChange}>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.first_name} ({user.last_name})
                </option>
              ))}
          </select>
          
          <button id='btn5' type='submit'>update Note</button> 
          </form>

      </div>    
    </>

  )
}

export default UpdateNotes