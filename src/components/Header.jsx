import React from 'react'
import './css/Header.css';
function Header({setConnected}) {
  const logout = () => {
    localStorage.removeItem("token");
    setConnected(false);
  }
  return (
    <div className='header'>
        <h1 className='title'>Notes</h1>
        <button id='btn2' onClick={logout}>Logout</button> 
    </div>

  )
}

export default Header