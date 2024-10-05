import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Tutorial from './components/Tutorial'
import Register from './components/Register';
import Parceiros from './components/Parceiros';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/parceiros" element={<Parceiros />} />
        <Route path="/tutorial" element={<Tutorial />} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
