import './App.css';
import {useEffect} from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Accueil from './pages/accueil';
import Connexion from './pages/connexion';
import Profil from './pages/profil';
import './pages/css/main.css'
import Header from './composants/header';
import Footer from './composants/footer';
import { useDispatch, useSelector } from "react-redux";
import { disconnecting } from "./state/store"

function App() {
 /* const dispatch = useDispatch();
  // Réinitialisé le state pour que l'utilisateur doivent se connecter au premier connexion de l'appli
  useEffect(() => {
    // Réinitialise le state à la première connexion
    dispatch(disconnecting());
  },[]); */

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/se-connecter" element={<Connexion />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
