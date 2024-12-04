import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './css/Header.css';


function Header() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate('/');
  }
  return (
    <div className='header'>
        <Link to='/note' className='link'>
          <h1 className='title'>Notes</h1>
        </Link>
        <nav className="nav-links">
          <Link to='/note' className='link'>Home</Link>
          <Link to='/create' className='link'>Create</Link>
        </nav>
        <button id='btn2' onClick={logout}>Logout</button> 
    </div>

  )
}

export default Header