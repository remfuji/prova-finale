import { useEffect } from 'react';

function useLocalStorageListener(callback) {
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'isLoggedIn') {
        callback(event.newValue === 'true');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Inizializza lo stato in base al valore corrente di localStorage
    callback(localStorage.getItem('isLoggedIn') === 'true');

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [callback]);

  // Aggiungi una logica qui per forzare un aggiornamento del componente
  // quando il valore di isLoggedIn cambia in localStorage
}

export default useLocalStorageListener;
