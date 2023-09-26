import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Accueil from './pages/accueil';
import Connexion from './pages/connexion';
import Profil from './pages/profil';
import './pages/css/main.css'
import Header from './composants/header';
import Footer from './composants/footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
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
