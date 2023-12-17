import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import Login from "../components/Login";
import Registrati from "../components/Registrati";
import Segnalazioni from "../components/Segnalazioni";
import UserDashboard from "../components/UserDashboard";

import "../App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function HomePage() {

  return (
    
    <Router>
      
      <div className="app-container">
        <Header />
        <div className="app-body">
          <Sidebar/>
          <Routes>
          
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrati" element={<Registrati />} />
            <Route path="/segnalazioni" element={<Segnalazioni />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            
          </Routes>
        </div>
        <Footer />
      </div>
      
    </Router>
  
    
  );
}
export default HomePage;
