import React, { useState } from 'react'
import './css/Header.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Header() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate('/');
  }
  return (
    <div className='header'>
        <Link to='/note' className='link'><h1 className='title'>Notes</h1></Link>
        <button id='btn2' onClick={logout}>Logout</button> 
    </div>

  )
}

export default Header