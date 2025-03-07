// src/components/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import lockIcon from "../img/lock-icon.svg"
import logoutIcon from "../img/logout-icon.svg"

export default function Navbar({ userType, onLogout }) {

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
              <Link className="nav-link mt-2 mt-lg-0" to="/inicio">Início</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gerenciar">Gerenciar doações</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/configuracoes">Configurações</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link d-flex align-items-center" onClick={handleLogout}><img src={logoutIcon} alt="Apenas para administradores" /><strong>Sair</strong></button>
            </li>
          </>
        );
      case 'MASTER':
        return (
          <>
            <li className="nav-item">
              <Link className="nav-link mt-2 mt-lg-0" to="/inicio">Início</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/painel-de-controle">Painel de controle</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/configuracoes">Configurações</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link d-flex align-items-center" onClick={handleLogout}><img src={logoutIcon} alt="" /><strong>Sair</strong></button>
            </li>
          </>
        );
      case 'FUNCIONARIO_ONG':
        return (
          <>
            <li className="nav-item">
              <Link className="nav-link mt-2 mt-lg-0" to="/inicio">Início</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gerenciar">Gerenciar doações</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/configuracoes">Configurações</Link>
            </li>
            <li className="nav-item d-flex align-items-center">
              <button className="nav-link d-flex align-items-center" onClick={handleLogout}><img src={logoutIcon} alt="Apenas para administradores" /><strong>Sair</strong></button>
            </li>
          </>
        );

      default:
        return (
          <>
            <li className="nav-item">
              <Link className="nav-link mt-2 mt-lg-0" to="/">Início</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sobre">Sobre nós</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tutorial">Como doar?</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/login"><img src={lockIcon} alt="Apenas para administradores" />Entrar</Link>
            </li>
          </>
        );
    }
  };

  return (

    <header>
      <nav className='navbar navbar-expand-lg'>
        <div className='container-fluid'>
          <a href='/'><img src='/logo.png' alt='Doapego' className='logo-imagem me-3' /></a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span> </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mb-2 mb-lg-0">
              {renderMenu()}
            </ul>

            <div className="d-flex ms-auto">
              <a href="https://www.figma.com/proto/bmqmNIZJerSPvmC0WHdVQm/TCC---Prot%C3%B3tipo-Mobile---Doapego?node-id=4-2&t=gtSMir502SSKgJ1x-1&starting-point-node-id=4%3A2&scaling=scale-down content-scaling=fixed" target="_blank" rel="noopener noreferrer" className="ml-auto btn btn-custom-filled">Baixe o App!</a>
            </div>
          </div>
        </div>
      </nav>
    </header>

  );
}