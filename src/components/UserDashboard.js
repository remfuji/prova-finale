import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function App() {
  const [username, setUsername] = useState('');
  const [nome, setNome] = useState('');
  const [tipologia, setTipologia] = useState('');
  const [descrizione, setDescrizione] = useState('');
  const [segnalazioni, setSegnalazioni] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login if not logged in
    } else {
      // If logged in, set the username (adjust this logic as per your application's design)
      // For example, you might want to retrieve the username from local storage
      const storedUsername = localStorage.getItem('username'); // Assuming you store username in local storage on successful login
      setUsername(storedUsername);
      localStorage.setItem('username', username)
    }
  }, [navigate]);

  const handleInsertSegnalazione = async () => {
    try {
      // Chiamata API per inserire la segnalazione
      const response = await axios.post('http://localhost:3001/insert-segnalazione', {
        username,
        nome,
        tipologia,
        descrizione,
      });

      if (response.status === 200) {
        console.log('Segnalazione inserita con successo!');
      } else {
        console.log('Errore durante l\'inserimento della segnalazione.');
      }
    } catch (error) {
      console.error('Errore durante la chiamata API:', error);
    }
  };
  



const handleLogout = () => {
    // Aggiorna lo stato del token quando l'utente esegue il logout
    localStorage.removeItem('isLoggedIn');
    navigate('/login'); // Reindirizza all'area di login dopo il logout
  };

  return (
    <div>
     
      <h1>Inserisci una nuova segnalazione</h1>
      <p>Logged in as: {username}</p> 
      <button onClick={handleLogout}>Logout</button>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Titolo:
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </label>
      <br />
      <label>
        Tipologia:
        <input type="text" value={tipologia} onChange={(e) => setTipologia(e.target.value)} />
      </label>
      <br />
      <label>
        Descrizione:
        <textarea value={descrizione} onChange={(e) => setDescrizione(e.target.value)} />
      </label>
      <br />
      <button onClick={handleInsertSegnalazione}>Inserisci Segnalazione</button>
      <div>
      <h1>Segnalazioni dell'utente {username}</h1>
      <ul>
        {segnalazioni.map((segnalazione, index) => (
          <li key={index}>
            <strong>Nome:</strong> {segnalazione.nome} <br />
            <strong>Tipologia:</strong> {segnalazione.tipologia} <br />
            <strong>Descrizione:</strong> {segnalazione.descrizione} <br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default App;

