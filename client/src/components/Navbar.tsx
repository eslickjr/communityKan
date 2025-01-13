import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();

  const [ loginCheck, setLoginCheck ] = useState(false);

  const logout = (e: React.MouseEvent<HTMLElement>) => {
    console.log('logout');
    e.preventDefault();
    auth.logout();
    navigate('/login');
  }

  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck])

  return (
    <div className='nav'>
      <div className='nav-title'>
        <Link to='/'>Krazy Kanban Board</Link>
      </div>
      <ul>
      {
        !loginCheck ? (
          <li className='nav-item'>
            <button type='button'>
              <Link to='/login'>Login</Link>
            </button>
          </li>
        ) : (
          <li className='nav-item'>
            <button type='button' onClick={logout}>Logout</button>
          </li>
        )
      }
      </ul>
    </div>
  )
}

export default Navbar;
