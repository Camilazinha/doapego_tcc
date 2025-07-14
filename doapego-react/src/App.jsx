import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import NotAuthorized from './components/NotAuthorized';

import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Tutorial from './pages/Tutorial';
import AjudaPublico from './pages/AjudaPublico';
import Privacidade from './pages/Privacidade';
import Termos from './pages/Termos';

import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';

import Inicio from './pages/Inicio';
import Painel from './pages/Painel';
import Configuracoes from './pages/Configuracoes';
import AjudaPrivado from './pages/AjudaPrivado';

import CadastroStaff from "./pages/CadastroStaff";
import GerenciarDoacoes from './pages/GerenciarDoacoes';
import Solicitacoes from './pages/Solicitacoes';

import ListCrud from "./pages/ListCrud";
import AddCrud from "./pages/AddCrud";
import EditCrud from "./pages/EditCrud";
import ViewCrud from "./pages/ViewCrud";
import Doacoes from "./pages/Doacoes";

import Teste from './pages/Teste';

import "./styles/import.css";
import "./styles/global.css";
import "./styles/auth.css";
import "./styles/info.css";
import "./styles/admin.css";
import "./styles/modal.css";
import "./styles/buttons.css";
import "./styles/footer.css";
import "./styles/crud.css";

// Componente para verificar autenticação e permissões
const ProtectedRoute = ({ allowedRoles }) => {
        const token = localStorage.getItem('token');
        const tipo = localStorage.getItem('tipo');

        if (!token) return <Navigate to="/login" replace />;

        if (allowedRoles && !allowedRoles.includes(tipo)) return <Navigate to="/pagina-nao-existente" replace />;

        return <Outlet />;
};

export default function App() {

        return (
                <Router>
                        <Navbar />
                        <Routes>
                                {/* Rotas públicas */}
                                <Route path="/" element={<Home />} />
                                <Route path="/sobre-nos" element={<Sobre />} />
                                <Route path="/como-doar" element={<Tutorial />} />
                                <Route path="/politica-de-privacidade" element={<Privacidade />} />
                                <Route path="/termos-de-uso" element={<Termos />} />
                                <Route path="/ajuda" element={<AjudaPublico />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/redefinir-senha" element={<ResetPassword />} />
                                <Route path="/esqueci-minha-senha" element={<ForgotPassword />} />
                                <Route path="/solicitar-cadastro" element={<CadastroStaff />} />
                                <Route path="/teste" element={<Teste />} />
                                <Route path="/pagina-nao-encontrada" element={<NotAuthorized />} />

                                {/* Rotas privadas */}
                                {/* <Route element={<ProtectedRoute />}> */}
                                <Route path="/inicio" element={<Inicio />} />
                                <Route path="/perguntas-frequentes" element={<AjudaPrivado />} />
                                <Route path="/painel-de-controle" element={<Painel />} />

                                <Route path="/gerenciar-doacoes" element={<GerenciarDoacoes />} />
                                <Route path="/gerenciar-doacoes/:id" element={<Doacoes />} />

                                <Route path="/configuracoes" element={<Configuracoes />} />
                                <Route path="/configuracoes/:entidade" element={<ListCrud />} />
                                <Route path="/configuracoes/:entidade/adicionar" element={<AddCrud />} />
                                <Route path="/configuracoes/:entidade/editar/:id" element={<EditCrud />} />
                                <Route path="/configuracoes/:entidade/detalhes/:id" element={<ViewCrud />} />
                                {/* </Route> */}

                                {/* <Route element={<ProtectedRoute allowedRoles={['MASTER']} />}> */}
                                <Route path="/gerenciar-solicitacoes" element={<Solicitacoes />} />
                                {/* </Route> */}

                                <Route path="*" element={<Navigate to="/pagina-nao-encontrada" replace />} />
                        </Routes>
                        <Footer />
                </Router>
        );
};