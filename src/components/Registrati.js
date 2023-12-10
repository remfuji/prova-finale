import React, { useState } from 'react';

function Registrazione() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = async (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);

    try {
      const response = await fetch('http://localhost:3001/verifica-utente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: newUsername,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setUserExists(result.message === 'Utente già esistente');
        setErrorMessage(''); // Resetta l'eventuale messaggio di errore
      } else {
        console.error('Errore durante la verifica dell\'utente');
      }
    } catch (error) {
      console.error('Errore durante la verifica dell\'utente:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword && !userExists) {
      try {
        const response = await fetch('http://localhost:3001/registrati', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });

        if (response.ok) {
          console.log('Registrazione avvenuta con successo!');
          console.log('Username:', username);
          console.log('Password:', password);
          setRegistrationSuccess(true);
          setUsername('');
          setPassword('');
          setConfirmPassword('');
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'Errore durante la registrazione');
        }
      } catch (error) {
        console.error('Errore durante la registrazione:', error);
      }
    } else {
      setErrorMessage('Le password non corrispondono o l\'utente esiste già');
    }
  };

  return (
    <div>
      <h2>Registrazione</h2>
      {registrationSuccess ? (
        <p>Registrazione avvenuta con successo!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={username} onChange={handleUsernameChange} />
          </label>
          {userExists && <p style={{ color: 'red' }}>Utente già esistente</p>}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <label>
            Conferma Password:
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </label>
          <br />
          <button type="submit">Registrati</button>
        </form>
      )}
    </div>
  );
}

export default Registrazione;
