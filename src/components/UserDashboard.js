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
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      const storedUsername = localStorage.getItem('username'); 
      if (storedUsername) {
        setUsername(storedUsername);
        fetchSegnalazioni(storedUsername);
      } else {
        console.error('Username non trovato nel localStorage');
      }
    }
  }, [navigate]);
  

  const handleInsertSegnalazione = async () => {
    try {
     
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
  
  const fetchSegnalazioni = async (username) => {
    try {
      const response = await axios.get(`http://localhost:3001/get-segnalazioni?username=${username}`);
      if (response.status === 200) {
        setSegnalazioni(response.data.segnalazioni);
      }
    } catch (error) {
      console.error('Errore durante il recupero delle segnalazioni:', error);
    }
  };




const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div>
     
      <h1>Inserisci una nuova segnalazione</h1>
      <p>Logged in as: {username}</p> 
      <button onClick={handleLogout}>Logout</button>
      
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

