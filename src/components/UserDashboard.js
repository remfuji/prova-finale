import React, { useState } from 'react';
import axios from 'axios';
import Login from './Login';

function App() {
  const [username, setUsername] = useState('');
  const [nome, setNome] = useState('');
  const [tipologia, setTipologia] = useState('');
  const [descrizione, setDescrizione] = useState('');
  const [segnalazioni, setSegnalazioni] = useState([]);

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
  const [token, setToken] = useState(null);

  const handleLogin = (userToken) => {
    // La funzione viene chiamata dal componente LoginForm
    // userToken è il token JWT restituito dal server durante il login
    setToken(userToken);
  };

  const handleLogout = () => {
    // Aggiorna lo stato del token quando l'utente esegue il logout
    setToken(null);
  };

  return (
    <div>
     
      <h1>Inserisci una nuova segnalazione</h1>
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

