import React, { useState, useEffect } from 'react';

function Segnalazioni() {
  const [segnalazioni, setSegnalazioni] = useState([]);

  useEffect(() => {
    async function fetchSegnalazioni() {
      try {
        const response = await fetch('http://localhost:3001/all-segnalazioni'); 
        if (response.ok) {
          const data = await response.json();
          setSegnalazioni(data.segnalazioni);
        } else {
          console.error('Errore nella risposta del server:', response.status);
        }
      } catch (error) {
        console.error('Errore durante il fetch delle segnalazioni:', error);
      }
    }

    fetchSegnalazioni();
  }, []);

  return (
    <div className="container">
      <h2>Segnalazioni</h2>
      <ul className="report-list">
        {segnalazioni.map((segnalazione, index) => (
          <li key={index} className="report-item">
            <div className="report-info">
            <strong>Nome:</strong> {segnalazione.nome}<br />
            <strong>Tipologia:</strong> {segnalazione.tipologia}<br />
            <strong>Descrizione:</strong> {segnalazione.descrizione}<br />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Segnalazioni;
