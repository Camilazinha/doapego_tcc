import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Footer from './components/Footer';
import Navbar from './components/Navbar';

import Home from './components/Home';
import Sobre from './components/Sobre';
import Tutorial from './components/Tutorial';
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

export default function App() {

        return (
                <Router>
                        <AuthProvider>

                                <Navbar />
                                <Routes>
                                        {/* Rotas públicas */}
                                        <Route path="/" element={<Home />} />
                                        <Route path="/sobre" element={<Sobre />} />
                                        <Route path="/tutorial" element={<Tutorial />} />
                                        <Route path="/politica-de-privacidade" element={<Privacidade />} />
                                        <Route path="/termos-de-uso" element={<Termos />} />
                                        <Route path="/ajuda" element={<AjudaPublico />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/redefinir-senha" element={<ResetPassword />} />
                                        <Route path="/esqueci-minha-senha" element={<ForgotPassword />} />
                                        <Route path="/solicitar-cadastro" element={<CadastroStaff />} />
                                        <Route path="/teste" element={<Teste />} />

                                        {/* Rotas privadas */}
                                        <Route element={<ProtectedRoute allowedRoles={['MASTER', 'STAFF', 'FUNCIONARIO']} />}>
                                                <Route path="/inicio" element={<Inicio />} />
                                                <Route path="/perguntas-frequentes" element={<AjudaPrivado />} />
                                                <Route path="/painel-de-controle" element={<Painel />} />
                                                <Route path="/configuracoes" element={<Configuracoes />} />
                                                <Route path="/configuracoes/:entidade" element={<ListCrud />} />
                                                <Route path="/configuracoes/:entidade/adicionar" element={<AddCrud />} />
                                                <Route path="/configuracoes/:entidade/editar/:id" element={<EditCrud />} />
                                                <Route path="/configuracoes/:entidade/detalhes/:id" element={<ViewCrud />} />
                                        </Route>

                                        <Route element={<ProtectedRoute allowedRoles={['FUNCIONARIO', 'STAFF']} />}>
                                                <Route path="/gerenciar-doacoes" element={<GerenciarDoacoes />} />
                                        </Route>
                                        <Route element={<ProtectedRoute allowedRoles={['MASTER']} />}>
                                                <Route path="/gerenciar-solicitacoes" element={<Solicitacoes />} />
                                        </Route>

                                </Routes>
                                <Footer />
                        </AuthProvider>
                </Router>
        );
};