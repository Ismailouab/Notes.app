import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import './css/CreateNotes.css';
function CreateNotes() {
const [title,setTitle]=useState('')
const [content,setContent]=useState('')
const [users, setUsers] = useState([]);
const [sharedWith, setSharedWith] = useState([]);
const navigate = useNavigate();

useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      try {
        const resp = await axios.get('/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(resp.data);
      } catch (error) {
        console.error('Error fetching users:', error.response ? error.response.data : error.message);
        alert('Failed to load users');
      }
    };
    fetchUsers();
}, []);

const handleShareChange = (e) => {
    const selectedUsers = Array.from(e.target.selectedOptions, (option) => parseInt(option.value));
    console.log('Selected users:', selectedUsers);
    setSharedWith(selectedUsers);
};

const createNote =async(e)=>{
    e.preventDefault();
    console.log('Attempting to create note with:', { title, content });
    const token = localStorage.getItem('token');
    console.log('Updating note with shared users:', sharedWith);
    try{
        const resp = await axios.post('/notes',
            { title:title, content:content , shared_with: sharedWith },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        console.log('Created Note:', resp.data);
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
                
                <select multiple value={sharedWith} onChange={handleShareChange}>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.first_name} ({user.last_name})
                        </option>
                     ))}
                </select>


                <button id='btn5' type="submit">Create Note</button>
            </form>

            <div className='note_footer'>
            </div>
        </div>
    </>

  )
}

export default CreateNotes