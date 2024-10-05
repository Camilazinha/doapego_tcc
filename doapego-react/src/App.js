import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';
import Parceiros from './components/Parceiros';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parceiros" element={<Parceiros />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
