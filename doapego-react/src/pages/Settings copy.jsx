// src/pages/Settings.jsx

import React from 'react';
import { Link } from 'react-router-dom';

export default function Settings() {
  const userType = localStorage.getItem('userType'); // Recupera o tipo de usuário do localStorage

  const renderLinks = () => {
    switch (userType) {
      case 'MASTER':
        return (
          <>
            {/* Links visíveis apenas para MASTER */}
            <Link to='/ongs' id="ong-info" className="d-flex align-items-center item-config">
              <span className="icon" id="icon-gerenc">
                <ion-icon name="heart-circle" />
              </span>
              <h3 id="section-title">ONGs Registradas</h3>
              <span className="arrow-link-container ml-auto">
                <span className="arrow-link">
                  <ion-icon name="chevron-forward" />
                </span>
              </span>
            </Link>

            <Link to='/enderecos' id="edit-info" className="d-flex align-items-center item-config">
              <span className="icon" id="icon-gerenc">
                <ion-icon name="business" />
              </span>
              <h3 id="section-title">Endereços de ONGs</h3>
              <span className="arrow-link-container ml-auto">
                <span className="arrow-link">
                  <ion-icon name="chevron-forward" />
                </span>
              </span>
            </Link>

            <Link to='/administradores' id="team-settings" className="d-flex align-items-center item-config">
              <span className="icon" id="icon-gerenc">
                <ion-icon name="people" />
              </span>
              <h3 id="section-title">Administradores</h3>
              <span className="arrow-link-container ml-auto">
                <span className="arrow-link">
                  <ion-icon name="chevron-forward" />
                </span>
              </span>
            </Link>
          </>
        );

      case 'ONG':
        return (
          <>
            {/* Links visíveis para ONG */}
            <Link to='/ongs' id="ong-info" className="d-flex align-items-center item-config">
              <span className="icon" id="icon-gerenc">
                <ion-icon name="heart-circle" />
              </span>
              <h3 id="section-title">Minha ONG</h3>
              <span className="arrow-link-container ml-auto">
                <span className="arrow-link">
                  <ion-icon name="chevron-forward" />
                </span>
              </span>
            </Link>

            <Link to='/enderecos' id="edit-info" className="d-flex align-items-center item-config">
              <span className="icon" id="icon-gerenc">
                <ion-icon name="business" />
              </span>
              <h3 id="section-title">Endereços da ONG</h3>
              <span className="arrow-link-container ml-auto">
                <span className="arrow-link">
                  <ion-icon name="chevron-forward" />
                </span>
              </span>
            </Link>

            <Link to='/gerenciar' id="activity-history" className="d-flex align-items-center item-config">
              <span className="icon" id="icon-gerenc">
                <ion-icon name="document-text" />
              </span>
              <h3 id="section-title">Doações recebidas</h3>
              <span className="arrow-link-container ml-auto">
                <span className="arrow-link">
                  <ion-icon name="chevron-forward" />
                </span>
              </span>
            </Link>

            {/* Equipe - apenas para ONG */}
            <Link to='/administradores' id="team-settings" className="d-flex align-items-center item-config">
              <span className="icon" id="icon-gerenc">
                <ion-icon name="people" />
              </span>
              <h3 id="section-title">Minha equipe</h3>
              <span className="arrow-link-container ml-auto">
                <span className="arrow-link">
                  <ion-icon name="chevron-forward" />
                </span>
              </span>
            </Link>
          </>
        );

      case 'FUNCIONARIO_ONG':
        return (
          <>
            {/* Links visíveis para ONG */}
            <Link to='/ongs' id="ong-info" className="d-flex align-items-center item-config">
              <span className="icon" id="icon-gerenc">
                <ion-icon name="heart-circle" />
              </span>
              <h3 id="section-title">Minha ONG</h3>
              <span className="arrow-link-container ml-auto">
                <span className="arrow-link">
                  <ion-icon name="chevron-forward" />
                </span>
              </span>
            </Link>

            <Link to='/enderecos' id="edit-info" className="d-flex align-items-center item-config">
              <span className="icon" id="icon-gerenc">
                <ion-icon name="business" />
              </span>
              <h3 id="section-title">Endereços da ONG</h3>
              <span className="arrow-link-container ml-auto">
                <span className="arrow-link">
                  <ion-icon name="chevron-forward" />
                </span>
              </span>
            </Link>

            <Link to='/gerenciar' id="activity-history" className="d-flex align-items-center item-config">
              <span className="icon" id="icon-gerenc">
                <ion-icon name="document-text" />
              </span>
              <h3 id="section-title">Doações recebidas</h3>
              <span className="arrow-link-container ml-auto">
                <span className="arrow-link">
                  <ion-icon name="chevron-forward" />
                </span>
              </span>
            </Link>
          </>
        );

      default:
        return (
          <>
            {/* Links visíveis para visitantes ou outros tipos */}
            <Link to='/login' className="d-flex align-items-center item-config">
              <span className="icon" id="icon-gerenc">
                <ion-icon name="log-in" />
              </span>
              <h3 id="section-title">Entrar</h3>
              <span className="arrow-link-container ml-auto">
                <span className="arrow-link">
                  <ion-icon name="chevron-forward" />
                </span>
              </span>
            </Link>
          </>
        );
    }
  };

  return (
    <>
      <div id="profile-container" className="container px-4 py-5 px-sm-5 mt-5 borda">
        <h2 id="titulo-principal">Configurações</h2>
        <div id="profile-section">
          {renderLinks()}

          {/* Links comuns para todos os usuários */}
          <Link to='/politica-de-privacidade' id="security-settings" className="d-flex align-items-center item-config">
            <span className="icon" id="icon-gerenc">
              <ion-icon name="shield-checkmark" />
            </span>
            <h3 id="section-title">Segurança e Privacidade</h3>
            <span className="arrow-link-container ml-auto">
              <span className="arrow-link">
                <ion-icon name="chevron-forward" />
              </span>
            </span>
          </Link>

          <Link to="/faq" id='activity-history' className='d-flex align-items-center item-config'>
            <span className="icon" id="icon-gerenc">
              <ion-icon name="help-circle" />
            </span>
            <h3 id="section-title">Ajuda e FAQ</h3>
            <span className="arrow-link-container ml-auto">
              <span className="arrow-link">
                <ion-icon name="chevron-forward" />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}