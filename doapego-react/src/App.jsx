import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './components/Home';

import Sobre from './components/Sobre';
import Tutorial from './components/Tutorial'
import Cadastro from './components/Cadastro';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import Termos from './pages/Termos';
import Privacidade from './pages/Privacidade';
import AjudaPrivado from './pages/AjudaPrivado';

import Teste from './pages/Teste';
import GerenciarDoacoes from './pages/GerenciarDoacoes';


import AjudaPublico from './pages/AjudaPublico';
import Settings from './pages/Settings';
import Gerenciar from './components/Gerenciar';
import Panel from './pages/Panel';
import Pendentes from './components/Pendentes';
import Inicio from './pages/Inicio';

import ListCrud from "./pages/ListCrud";


import "./styles/import.css";
import "./styles/global.css";
import "./styles/auth.css";
import "./styles/info.css";
import "./styles/admin.css";
import "./styles/modal.css";
import "./styles/buttons.css";
import "./styles/footer.css";
import "./styles/crud.css";


export default function App() {

        //IMPORTANTISSIMO
        const [userType, setUserType] = useState('master'); // null representa usuário não logado

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
                                        <Route path="/" element={userType ? <Navigate to="/inicio" /> : <Home />} />
                                        <Route path="/sobre" element={<Sobre />} />
                                        <Route path="/cadastro" element={<Cadastro />} />
                                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                                        <Route path="/tutorial" element={<Tutorial />} />
                                        <Route path="/redefinir-senha" element={<ResetPassword />} />
                                        <Route path="/esqueci-minha-senha" element={<ForgotPassword />} />
                                        <Route path="/politica-de-privacidade" element={<Privacidade />} />
                                        <Route path="/termos-de-uso" element={<Termos />} />
                                        <Route path="/ajuda" element={<AjudaPublico />} />


                                        <Route path="/inicio" element={<Inicio />} />

                                        <Route path="/teste" element={<Teste />} />

                                        <Route path="/configuracoes/:entidade" element={<ListCrud />} />

                                        <Route path="/gerenciar-doacoes" element={<GerenciarDoacoes />} />


                                        <Route path="/perguntas-frequentes" element={<AjudaPrivado />} />
                                        <Route path="/gerenciar" element={<Gerenciar />} />
                                        <Route path="/doacoes-pendentes" element={<Pendentes />} />
                                        <Route path="/painel-de-controle" element={<Panel />} />

                                        <Route path="/configuracoes" element={<Settings />} />


                                </Routes>
                                <Footer />
                        </Router>
                </AuthProvider>
        );
};