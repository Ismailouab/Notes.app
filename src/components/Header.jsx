import React from 'react'
import './css/Header.css';
import { Link } from 'react-router-dom';
function Header({setConnected}) {
  const logout = () => {
    localStorage.removeItem("token");
    setConnected(false);
  }
  return (
    <div className='header'>
        <Link to='/' className='link'><h1 className='title'>Notes</h1></Link>
        <button id='btn2' onClick={logout}>Logout</button> 
    </div>

  )
}

export default Header