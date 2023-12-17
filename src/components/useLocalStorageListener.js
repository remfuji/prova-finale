import { useEffect } from 'react';

function useLocalStorageListener(callback) {
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'isLoggedIn') {
        callback(event.newValue === 'true');
      }
    };
    window.addEventListener('storage', handleStorageChange);
    callback(localStorage.getItem('isLoggedIn') === 'true');
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [callback]);
}

export default useLocalStorageListener;
