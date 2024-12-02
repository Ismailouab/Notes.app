import axios from 'axios';
import React, { useState } from 'react'
import './css/Login.css';
import { useNavigate} from 'react-router-dom';


function Login(props) {
    const [cin,setCin]=useState('')
    const [password,setPasword]=useState('')
    const navigate = useNavigate();
    const clickbutton=async(e)=>{
        e.preventDefault();
        try{
            const resp = await axios.post('/login',{
                cin:cin ,
                password:password
            })
            console.log(resp);
            const token=localStorage.setItem("token",resp.data.token)
            console.log(token);
            props.setConnected(true)
            navigate('/note');
        }catch(error){
            if (error.response) {
                if (error.response.status === 401) {
                    navigate('/');
                } else {
                    console.error('Error status:', error.response.status);
                    console.error('Error data:', error.response.data);
                }
            } else {
                console.error('Error message:', error.message);
            }
        }
    }
  return (
    <div className='loginCard'>
        <div className='login'>
            <form  onSubmit={clickbutton}>
                <label>login</label>
                <input type="text" placeholder='Cin' value={cin} onChange={(e)=>setCin(e.target.value)} />
                <input type='password' placeholder='Password'value={password} onChange={(e)=>setPasword(e.target.value)} />
                <button id='btn1'>Login</button>
            </form>
        </div>   
    </div>

  );
}

export default Login