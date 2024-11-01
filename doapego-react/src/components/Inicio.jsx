// src/components/Inicio.js

import React from 'react';
import '../styles/main.css';
import '../styles/layout.css';

function Inicio() {
  const userType = localStorage.getItem('userType'); // Recupera o tipo de usuário do localStorage

  const renderCards = () => {
    switch (userType) {
      case 'MASTER':
        return (
          <>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div id="funcionario-card" className="card funcong-card">
                <div className="card-body">
                  <h5 className="card-title">Configurações</h5>
                  <p className="card-text">Gerencie e visualize suas informações.</p>
                  <a href="/configuracoes" className="btn btn-primary">Ver configurações</a>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div id="faq-card" className="card funcong-card">
                <div className="card-body">
                  <h5 className="card-title">Ajuda</h5>
                  <p className="card-text">Encontre respostas para dúvidas frequentes ou entre em contato com o suporte.</p>
                  <a href="/faq" className="btn btn-primary">Suporte</a>
                </div>
              </div>
            </div>
          </>
        );

      case 'ONG':
        return (
          <>
            {/* Cards específicos para ONG */}
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div id="doacoes-card" className="card funcong-card">
                <div className="card-body">
                  <h5 className="card-title">Gerenciar Doações</h5>
                  <p className="card-text">Visualize e gerencie as doações recebidas por sua ONG.</p>
                  <a href="/gerenciar" className="btn btn-primary">Acessar</a>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div id="funcionario-card" className="card funcong-card">
                <div className="card-body">
                  <h5 className="card-title">Configurações</h5>
                  <p className="card-text">Gerencie e visualize suas informações.</p>
                  <a href="/configuracoes" className="btn btn-primary">Ver configurações</a>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div id="faq-card" className="card funcong-card">
                <div className="card-body">
                  <h5 className="card-title">Ajuda</h5>
                  <p className="card-text">Encontre respostas para dúvidas frequentes ou entre em contato com o suporte.</p>
                  <a href="/gerenciar" className="btn btn-primary">Suporte</a>
                </div>
              </div>
            </div>
          </>
        );

      case 'FUNCIONARIO_ONG':
        return (
          <>
            {/* Cards específicos para FUNCIONARIO_ONG */}
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div id="funcionario-card" className="card funcong-card">
                <div className="card-body">
                  <h5 className="card-title">Configurações</h5>
                  <p className="card-text">Gerencie e visualize suas informações.</p>
                  <a href="/configuracoes" className="btn btn-primary">Ver configurações</a>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div id="doacoes-card" className="card funcong-card">
                <div className="card-body">
                  <h5 className="card-title">Gerenciar Doações</h5>
                  <p className="card-text">Visualize e gerencie as doações recebidas por sua ONG.</p>
                  <a href="/gerenciar" className="btn btn-primary">Acessar</a>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div id="faq-card" className="card funcong-card">
                <div className="card-body">
                  <h5 className="card-title">Ajuda</h5>
                  <p className="card-text">Encontre respostas para dúvidas frequentes ou entre em contato com o suporte.</p>
                  <a href="/faq" className="btn btn-primary">Suporte</a>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return (
          <>
            {/* Cards visíveis para todos os usuários ou usuários não logados */}
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div id="faq-card" className="card funcong-card">
                <div className="card-body">
                  <h5 className="card-title">Ajuda</h5>
                  <p className="card-text">Encontre respostas para dúvidas frequentes ou entre em contato com o suporte.</p>
                  <a href="/faq" className="btn btn-primary">Suporte</a>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div id="profile-container" className="container px-4 py-5 px-sm-5 mt-5 borda">
      <h2 className="text-center welcome-title">Bem-vindo novamente!</h2>
      <div className="row mt-12 justify-content-center cards-container-funcong">
        {renderCards()}
      </div>
    </div>
  );
}

export default Inicio;
