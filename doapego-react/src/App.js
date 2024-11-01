import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './components/Home';

import Sobre from './components/Sobre';
import Tutorial from './components/Tutorial'
import Cadastro from './components/Cadastro';
import Login from './components/Login';
import Parceiros from './components/Parceiros';
import Redefinicao from './components/Redefinicao';
import Esquecimento from './components/Esquecimento';
import Termos from './components/Termos';
import Privacidade from './components/Privacidade';
import Ajuda from './components/Ajuda';

import Faq from './components/Faq';
import Configuracoes from './components/Configuracoes';
import Gerenciar from './components/Gerenciar';
import GerenciarDados from './components/GerenciarDados';
import Pendentes from './components/Pendentes';
import Aceitas from './components/Aceitas';
import Recusadas from './components/Recusadas';


import Categorias from './components/CategoriasViews/Categorias';
import CreateCategoria from './components/CategoriasViews/CreateCategoria';
import EditCategoria from './components/CategoriasViews/EditCategoria';
import DetailsCategoria from './components/CategoriasViews/DetailsCategoria';

import Ongs from './components/OngsViews/Ongs';
import CreateOng from './components/OngsViews/CreateOng';
import EditOng from './components/OngsViews/EditOng';
import DetailsOng from './components/OngsViews/DetailsOng';

import Admin from './components/AdminViews/Admin';
import DetailsAdmin from './components/AdminViews/DetailsAdmin';

import Enderecos from './components/EnderecosViews/Enderecos';
import CreateEndereco from './components/EnderecosViews/CreateEndereco';
import EditEndereco from './components/EnderecosViews/EditEndereco';
import DetailsEndereco from './components/EnderecosViews/DetailsEndereco';

import Usuarios from './components/UsuariosViews/Usuarios';
import DetailsUsuario from './components/UsuariosViews/DetailsUsuario';

// import Arquivos from './components/ArquivosViews/Arquivos';
// import CreateArquivo from './components/ArquivosViews/CreateArquivo';
// import EditArquivo from './components/ArquivosViews/EditArquivo';
// import DetailsArquivo from './components/ArquivosViews/DetailsArquivo';


import './styles/main.css';
import './styles/layout.css';
import './styles/forms.css';
import './styles/login.css';
import './styles/views.css';
import './script/script.js';

const App = () => {

        const [userType, setUserType] = useState(null); // null representa usuário não logado
      
        const handleLogin = (type) => setUserType(type); // Recebe o tipo de admin no login
        const handleLogout = () => setUserType(null);

        useEffect(() => {
                // Recupera o userType do localStorage ao carregar o App
                const savedUserType = localStorage.getItem('userType');
                if (savedUserType) setUserType(savedUserType);
              }, []);
        
  return (
        <AuthProvider>        
    <Router>   
      <Navbar userType={userType} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />}/>
        <Route path="/parceiros" element={<Parceiros />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/redefinir-senha" element={<Redefinicao />} />
        <Route path="/esqueci-senha" element={<Esquecimento />} />
        <Route path="/politica-de-privacidade" element={<Privacidade />} />
        <Route path="/termos-de-uso" element={<Termos />} />
        <Route path="/ajuda" element={<Ajuda />}/>



        <Route path="/faq" element={<Faq />}/>
        <Route path="/gerenciar" element={<Gerenciar />} />
        <Route path="/doacoes-pendentes" element={<Pendentes />} />
        <Route path="/doacoes-recusadas" element={<Recusadas />} />
        <Route path="/doacoes-aceitas" element={<Aceitas />} />
        <Route path="/gerenciar-dados" element={<GerenciarDados />} />
        
        <Route path="/configuracoes" element={<Configuracoes />} />

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

        <Route path="/enderecos" element={<Enderecos />} />
        <Route path="/enderecos/criar" element={<CreateEndereco />} />
                <Route path="/enderecos/editar/:id" element={<EditEndereco />} />
                <Route path="/enderecos/detalhes/:id" element={<DetailsEndereco />} />
                
        <Route path="/administradores" element={<Admin />} />
                <Route path="/administradores/detalhes/:id" element={<DetailsAdmin />} />      

        {/* <Route path="/arquivos" element={<Arquivos />} />
        <Route path="/arquivos/criar" element={<CreateArquivo />} />
                <Route path="/arquivos/editar/:id" element={<EditArquivo />} />
                <Route path="/arquivos/detalhes/:id" element={<DetailsArquivo />} />       */}

      </Routes>
      <Footer />
    </Router>
    </AuthProvider>    
  );
};

export default App;
