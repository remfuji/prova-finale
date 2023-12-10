import React from 'react';
import { useAuth } from './AuthContext';

function UserDashboard() {
  const { isLoggedIn, username, logout } = useAuth();

  return (
    <div>
      {isLoggedIn ? (
        <p>Ciao, {username}! <button onClick={logout}>Logout</button></p>
      ) : (
        <p>Non sei loggato.</p>
      )}
    </div>
  );
}

export default UserDashboard;
