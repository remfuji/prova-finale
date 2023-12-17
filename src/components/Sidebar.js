import '../App.css';

import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import useLocalStorageListener from './useLocalStorageListener';

function Sidebar({ userLoggedIn }) {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  useLocalStorageListener(setIsLoggedIn);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, [isLoggedIn]);
  return (
    <aside>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/registrati">Registrati</Link></li>
          <li><Link to="/segnalazioni">Segnalazioni</Link></li>
          <li><Link to="/user-dashboard">User Dashboard</Link></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
