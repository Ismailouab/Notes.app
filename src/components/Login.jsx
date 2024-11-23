import axios from 'axios';
import React, { useState } from 'react'
import './css/Login.css';

function Login(props) {
    const [cin,setCin]=useState('')
    const [password,setPasword]=useState('')

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
        }catch(error){
            console.error('login error:', error.response?error.response.data:error.message);
            alert("login failed please check your credentials")
        }
    }
  return (
    <div className='main'>
        <div className='login'>
            <form  onSubmit={clickbutton}>
                <label>login</label>
                <input type="text" placeholder='Cin' value={cin} onChange={(e)=>setCin(e.target.value)} />
                <input type='password' placeholder='Password'value={password} onChange={(e)=>setPasword(e.target.value)} />
                <button>Login</button>
            </form>
        </div>   
    </div>

  )
}

export default Login