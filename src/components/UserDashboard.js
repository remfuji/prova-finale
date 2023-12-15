import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function App() {
  const [username, setUsername] = useState('');
  const [nome, setNome] = useState('');
  const [tipologia, setTipologia] = useState('');
  const [descrizione, setDescrizione] = useState('');
  const [segnalazioni, setSegnalazioni] = useState([]);
  const [editingSegnalazione, setEditingSegnalazione] = useState(null);
  const [editedNome, setEditedNome] = useState('');
  const [editedTipologia, setEditedTipologia] = useState('');
  const [editedDescrizione, setEditedDescrizione] = useState('');
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
      if (!nome || !tipologia || !descrizione) {
        alert("Per favore, riempi tutti i campi prima di inserire la segnalazione.");
        return;
      }
      const response = await axios.post('http://localhost:3001/insert-segnalazione', {
        username,
        nome,
        tipologia,
        descrizione,
      });

      if (response.status === 200) {
        console.log('Segnalazione inserita con successo!');
        setSegnalazioni(segnalazioni);
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
  const handleEditSegnalazione = (segnalazione) => {
    setEditingSegnalazione(segnalazione._id);
    setEditedNome(segnalazione.nome);
    setEditedTipologia(segnalazione.tipologia);
    setEditedDescrizione(segnalazione.descrizione);
  };

  const handleDeleteSegnalazione = async (segnalazioneId) => {
    try {
      
      const response = await axios.delete(`http://localhost:3001/delete-segnalazione/${segnalazioneId}`);
  
      if (response.status === 200) {
        console.log('Segnalazione cancellata con successo');
  
        setSegnalazioni(segnalazioni.filter(segnalazione => segnalazione._id !== segnalazioneId));
      } else {
        console.log('Errore durante la cancellazione della segnalazione');
      }
    } catch (error) {
      console.error('Errore durante la cancellazione della segnalazione:', error);
    }
  };
  const handleSaveEdit = async () => {
    try {
     
      if (!editedNome || !editedTipologia || !editedDescrizione) {
        alert("Per favore, riempi tutti i campi prima di salvare le modifiche.");
        return;
      }
  
      const response = await axios.put(`http://localhost:3001/update-segnalazione/${editingSegnalazione}`, {
        nome: editedNome,
        tipologia: editedTipologia,
        descrizione: editedDescrizione
      });
  
      if (response.status === 200) {
        console.log('Segnalazione aggiornata con successo');
  
        setSegnalazioni(segnalazioni.map(segnalazione => {
          if (segnalazione._id === editingSegnalazione) {
            return { ...segnalazione, nome: editedNome, tipologia: editedTipologia, descrizione: editedDescrizione };
          }
          return segnalazione;
        }));

        setEditingSegnalazione(null);
        setEditedNome('');
        setEditedTipologia('');
        setEditedDescrizione('');
      } else {
        console.log('Errore durante l\'aggiornamento della segnalazione');
      }
    } catch (error) {
      console.error('Errore durante l\'aggiornamento della segnalazione:', error);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div class="container">
      <div className='head-info'>
      <h2>Benvenuto {username}</h2>	
    <button class="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
   
    <h3>Inserisci una nuova segnalazione</h3>
 
   
    
    <div class="form-group">
        <label>
            Titolo:
            <input type="text" class="input-field" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>

        <label>
            Tipologia:
            <input type="text" class="input-field" value={tipologia} onChange={(e) => setTipologia(e.target.value)} />
        </label>

        <label>
            Descrizione:
            <textarea class="textarea-field" value={descrizione} onChange={(e) => setDescrizione(e.target.value)} />
        </label>

        <button class="submit-btn" onClick={handleInsertSegnalazione}>Inserisci Segnalazione</button>
    </div>

    <div class="user-reports">
        <h3>Le tue segnalazioni</h3>
        <ul class="report-list">
            {segnalazioni.map((segnalazione, index) => (
                <li key={index} class="report-item">
                    <div class="report-info">
                    <strong>Nome:</strong> {segnalazione.nome} <br />
                    <strong>Tipologia:</strong> {segnalazione.tipologia} <br />
                    <strong>Descrizione:</strong> {segnalazione.descrizione} <br />
                </div>
                <div class="report-actions">
                    <button class="edit-btn" onClick={() => handleEditSegnalazione(segnalazione)}>Modifica</button>
                    <button class="delete-btn" onClick={() => handleDeleteSegnalazione(segnalazione._id)}>Cancella</button>
                </div>

                    {editingSegnalazione === segnalazione._id && (
                        <div class="edit-form">
                            <label>
                                Titolo:
                                <input type="text" class="input-field" value={editedNome} onChange={(e) => setEditedNome(e.target.value)} />
                            </label>

                            <label>
                                Tipologia:
                                <input type="text" class="input-field" value={editedTipologia} onChange={(e) => setEditedTipologia(e.target.value)} />
                            </label>

                            <label>
                                Descrizione:
                                <textarea class="textarea-field" value={editedDescrizione} onChange={(e) => setEditedDescrizione(e.target.value)} />
                            </label>

                            <button class="save-btn" onClick={handleSaveEdit}>Salva Modifiche</button>
                            <button class="cancel-btn" onClick={() => setEditingSegnalazione(null)}>Annulla</button>
                        </div>
                    )}

                    
                </li>
            ))}
        </ul>
    </div>
</div>

  );
}

export default App;

