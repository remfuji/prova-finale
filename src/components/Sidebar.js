import '../App.css';
import { Link } from 'react-router-dom';

// ... Altro codice

function Sidebar() {
  return (
    <aside>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/registrati">Registrati</Link></li>
          <li><Link to="/segnalazioni">Segnalazioni</Link></li>
          <li><Link to="/statistiche">Statistiche</Link></li>
          <li><Link to="/contatti">Contatti</Link></li>
        </ul>
      </nav>
    </aside>
  );
}

// ... Altro codice

  export default Sidebar;