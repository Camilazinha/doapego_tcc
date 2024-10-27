import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Sobre from './components/Sobre';
import Tutorial from './components/Tutorial'
import Cadastro from './components/Cadastro';
import Parceiros from './components/Parceiros';

import Painel from './components/Painel';
import Gerenciar from './components/Gerenciar';


import Categorias from './components/CategoriasViews/Categorias';
import CreateCategoria from './components/CategoriasViews/CreateCategoria';
import EditCategoria from './components/CategoriasViews/EditCategoria';
import DetailsCategoria from './components/CategoriasViews/DetailsCategoria';

import Ongs from './components/OngsViews/Ongs';
import CreateOng from './components/OngsViews/CreateOng';
import EditOng from './components/OngsViews/EditOng';
import DetailsOng from './components/OngsViews/DetailsOng';

import Admin from './components/AdminViews/Admin';
import CreateAdmin from './components/AdminViews/CreateAdmin';
import EditAdmin from './components/AdminViews/EditAdmin';
import DetailsAdmin from './components/AdminViews/DetailsAdmin';

import Usuarios from './components/UsuariosViews/Usuarios';
import DetailsUsuario from './components/UsuariosViews/DetailsUsuario';

import Arquivos from './components/ArquivosViews/Arquivos';
import CreateArquivo from './components/ArquivosViews/CreateArquivo';
import EditArquivo from './components/ArquivosViews/EditArquivo';
import DetailsArquivo from './components/ArquivosViews/DetailsArquivo';


import './styles/main.css';
import './styles/layout.css';
import './styles/forms.css';
import './styles/login.css';
import './styles/views.css';
import './script/script.js';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/parceiros" element={<Parceiros />} />
        <Route path="/tutorial" element={<Tutorial />} />

        <Route path="/gerenciar" element={<Gerenciar />} />
        <Route path="/painel" element={<Painel />} />
        

        <Route path="/categorias" element={<Categorias />} />
        <Route path="/categorias/criar" element={<CreateCategoria />} />
                <Route path="/categorias/editar/:id" element={<EditCategoria />} />
                <Route path="/categorias/detalhes/:id" element={<DetailsCategoria />} />

        <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/usuarios/detalhes/:id" element={<DetailsUsuario />} />

        <Route path="/ongs" element={<Ongs />} />
        <Route path="/ongs/criar" element={<CreateOng />} />
                <Route path="/ongs/editar/:id" element={<EditOng />} />
                <Route path="/ongs/detalhes/:id" element={<DetailsOng />} /> 

        {/* <Route path="/endereco-ong" element={<EnderecosOng />} />
        <Route path="/endereco-ong/criar" element={<CreateEndereco />} />
                <Route path="/endereco-ong/editar/:id" element={<EditEndereco />} />
                <Route path="/endereco-ong/detalhes/:id" element={<DetailsEndereco />} /> */}
{/* 
        <Route path="/doacoes" element={<Doacoes />} />
                <Route path="/doacoes/detalhes/:id" element={<DetailsDoacao />} />                 */}
                
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/criar" element={<CreateAdmin />} />
                <Route path="/admin/editar/:id" element={<EditAdmin />} />
                <Route path="/admin/detalhes/:id" element={<DetailsAdmin />} />      

        <Route path="/arquivos" element={<Arquivos />} />
        <Route path="/arquivos/criar" element={<CreateArquivo />} />
                <Route path="/arquivos/editar/:id" element={<EditArquivo />} />
                <Route path="/arquivos/detalhes/:id" element={<DetailsArquivo />} />      

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
