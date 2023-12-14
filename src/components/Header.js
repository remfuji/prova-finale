import "../App.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Header() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      const storedUsername = localStorage.getItem('username'); 
      if (storedUsername) {
        setUsername(storedUsername);
        
      } else {
        console.error('Username non trovato nel localStorage');
      }
    }
  }, [navigate]);
  return (
    <header >
      <div className="header-logo">
        <div>
          <img src="../../logo2.png" alt="earthGuardian" />
        </div>    
      </div>
      <div className="header-text">
          <h2>Un mondo Ecosostenibile</h2>
          <h3>Grazie a te!</h3>
      </div>
      <div>
      <p>Logged in as: {username}</p>
      </div>
      
    </header>
  )
}
export default Header;
