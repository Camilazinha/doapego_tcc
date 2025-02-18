// src/components/Inicio.js

import React from 'react';
import { Link } from 'react-router-dom';


function Inicio() {
  const userType = localStorage.getItem('userType'); // Recupera o tipo de usuário do localStorage

  const renderCards = () => {
    switch (userType) {
      case 'MASTER':
        return (
          <>

            <div id="card-pendentes" className="card funcong-card">
              <div className="card-body text-center">
                <h5 className="card-title">Gerenciar dados</h5>
                <p className="card-text align-self-center">Gerencie e visualize as informações cadastradas na plataforma.</p>
                <Link to="/gerenciar-dados" className="btn btn-navbar-custom w-75">Ver configurações</Link>
              </div>
            </div>

            <div id="card-pendentes" className="card funcong-card">
              <div className="card-body text-center">
                <h5 className="card-title">Configurações</h5>
                <p className="card-text align-self-center">Gerencie e visualize suas informações.</p>
                <Link to="/configuracoes" className="btn btn-navbar-custom w-75">Ver configurações</Link>
              </div>
            </div>

            <div id="card-pendentes" className="card funcong-card">
              <div className="card-body text-center">
                <h5 className="card-title">Ajuda</h5>
                <p className="card-text">Encontre respostas para dúvidas frequentes ou entre em contato com o suporte.</p>
                <Link to="/faq" className="btn btn-navbar-custom w-75">Suporte</Link>
              </div>
            </div>
          </>
        );

      case 'ONG':
        return (
          <>
            {/* Cards específicos para ONG */}
            <div id="card-pendentes" className="card funcong-card">
              <div className="card-body text-center">
                <h5 className="card-title">Gerenciar Doações</h5>
                <p className="card-text">Visualize e gerencie as doações recebidas por sua ONG.</p>
                <a href="/gerenciar" className="btn btn-navbar-custom w-75">Gerenciar</a>
              </div>
            </div>

            <div id="card-pendentes" className="card funcong-card">
              <div className="card-body text-center">
                <h5 className="card-title">Configurações</h5>
                <p className="card-text">Gerencie e visualize suas informações.</p>
                <Link to="/configuracoes" className="btn btn-navbar-custom w-75">Ver configurações</Link>
              </div>
            </div>

            <div id="card-pendentes" className="card funcong-card">
              <div className="card-body text-center">
                <h5 className="card-title">Ajuda</h5>
                <p className="card-text">Encontre respostas para dúvidas frequentes ou entre em contato com o suporte.</p>
                <Link to="/faq" className="btn btn-navbar-custom w-75">Suporte</Link>
              </div>
            </div>
          </>
        );

      case 'FUNCIONARIO_ONG':
        return (
          <>
            {/* Cards específicos para FUNCIONARIO_ONG */}


            <div id="card-pendentes" className="card funcong-card">
              <div className="card-body text-center">
                <h5 className="card-title">Gerenciar Doações</h5>
                <p className="card-text">Visualize e gerencie as doações recebidas por sua ONG.</p>
                <Link to="/gerenciar" className="btn btn-navbar-custom w-75">Gerenciar</Link>
              </div>
            </div>

            <div id="card-pendentes" className="card funcong-card">
              <div className="card-body text-center">
                <h5 className="card-title">Configurações</h5>
                <p className="card-text">Gerencie e visualize suas informações.</p>
                <Link to="/configuracoes" className="btn btn-navbar-custom w-75">Ver configurações</Link>
              </div>
            </div>

            <div id="card-pendentes" className="card funcong-card">
              <div className="card-body text-center">
                <h5 className="card-title">Ajuda</h5>
                <p className="card-text">Encontre respostas para dúvidas frequentes ou entre em contato com o suporte.</p>
                <Link to="/faq" className="btn btn-navbar-custom w-75">Suporte</Link>
              </div>
            </div>
          </>
        );

      default:
        return (
          <>
            {/* Cards visíveis para todos os usuários ou usuários não logados */}
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div id="card-pendentes" className="card funcong-card">
                <div className="card-body text-center">
                  <h5 className="card-title">Ajuda</h5>
                  <p className="card-text">Encontre respostas para dúvidas frequentes ou entre em contato com o suporte.</p>
                  <Link to="/faq" className="btn btn-navbar-custom w-75">Suporte</Link>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div id="profile-container" className="container px-4 py-5 px-sm-5 mt-5 borda">
      <h2 id="titulo-principal">Início - Atalhos</h2>
      <div id='cards-container2' className="mt-4 row">
        {renderCards()}
      </div>
    </div>
  );
}

export default Inicio;
