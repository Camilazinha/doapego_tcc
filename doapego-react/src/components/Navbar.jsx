// src/components/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/main.css';
import '../styles/layout.css';

function Navbar({ userType, onLogout }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    onLogout();
    navigate('/');
  }
  const renderMenu = () => {
    switch (userType) {
      case 'ONG':
        return (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/inicio">Início</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gerenciar">Gerenciar doações</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/configuracoes">Configurações</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={handleLogout}><strong>Logout</strong></button>
            </li>
          </>
        );
      case 'MASTER':
        return (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/inicio">Início</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gerenciar-dados">Gerenciar dados</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/configuracoes">Configurações</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={handleLogout}><strong>Logout</strong></button>
            </li>
          </>
        );
      case 'FUNCIONARIO_ONG':
        return (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/inicio">Início</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gerenciar">Gerenciar doações</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/configuracoes">Configurações</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={handleLogout}><strong>Logout</strong></button>
            </li>
          </>
        );
      default:
        return (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/">Início</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/parceiros">Parceiros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sobre">Propósito</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tutorial">Como doar</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Entrar</Link>
            </li>          
            {/* <li className="nav-item">
              <Link className="nav-link" to="/login">Minha ONG</Link>
            </li> */}
          </>
        );
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid px-2 mx-2">
          <Link className="navbar-brand" to="/">Doapego</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {renderMenu()}
            </ul>
            <div className="d-flex ms-auto">
              <a href="https://www.figma.com/proto/bmqmNIZJerSPvmC0WHdVQm/TCC---Prot%C3%B3tipo-Mobile---Doapego?node-id=4-2&t=gtSMir502SSKgJ1x-1&starting-point-node-id=4%3A2&scaling=scale-down content-scaling=fixed" target="_blank" rel="noopener noreferrer" className="btn ml-auto btn-navbar-custom">Baixe o App!</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
