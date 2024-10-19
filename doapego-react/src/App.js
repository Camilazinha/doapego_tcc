import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Tutorial from './components/Tutorial'
import Register from './components/Register';
import Parceiros from './components/Parceiros';

import Categorias from './components/CategoriasViews/Categorias';
import CreateCategoria from './components/CategoriasViews/CreateCategoria';
import EditCategoria from './components/CategoriasViews/EditCategoria';
import DeleteCategoria from './components/CategoriasViews/DeleteCategoria';
import DetailsCategoria from './components/CategoriasViews/DetailsCategoria';

import './styles/main.css';
import './styles/layout.css';
import './styles/forms.css';
import './styles/login.css';
import './styles/views.css';

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
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/categorias/criar" element={<CreateCategoria />} />
                <Route path="/categorias/editar/:id" element={<EditCategoria />} />
                <Route path="/categorias/excluir/:id" element={<DeleteCategoria />} />
                <Route path="/categorias/detalhes/:id" element={<DetailsCategoria />} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
