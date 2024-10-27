import React from 'react';
// import { Link } from 'react-router-dom';
import '../styles/main.css';
import '../styles/layout.css';

function Gerenciar () {
  return (
    <>
  <div id="profile-container" className="container">
  <h2 id="titulo-principal">Gerenciamento do Perfil da ONG</h2>
  <div id="profile-section">
    {/* Editar Perfil */}
    <div id="edit-info" className="d-flex align-items-center">
      <span className="icon" id="icon-gerenc">
        <ion-icon name="pencil-outline" />
      </span>
      <h3 id="section-title">Edite seu Perfil</h3>
      <span className="arrow-link-container ml-auto">
        <a href="edit-profile.html" className="arrow-link">
          <ion-icon name="chevron-forward" />
        </a>
      </span>
    </div>
    {/* Segurança */}
    <div id="security-settings" className="d-flex align-items-center">
      <span className="icon" id="icon-gerenc">
        <ion-icon name="shield-checkmark" />
      </span>
      <h3 id="section-title">
        Segurança e Privacidade</h3>
      <span className="arrow-link-container ml-auto">
        <a href="seguranca.html" className="arrow-link">
          <ion-icon name="chevron-forward" />
        </a>
      </span>
    </div>
    {/* Notificações */}
    <div id="notifications-settings" className="d-flex align-items-center">
      <span className="icon" id="icon-gerenc">
        <ion-icon name="notifications" />
      </span>
      <h3 id="section-title">
        Notificações</h3>
      <span className="arrow-link-container ml-auto">
        <a href="notif.html" className="arrow-link">
          <ion-icon name="chevron-forward" />
        </a>
      </span>
    </div>
    {/* Equipe */}
    <div id="team-settings" className="d-flex align-items-center">
      <span className="icon" id="icon-gerenc">
        <ion-icon name="people" />
      </span>
      <h3 id="section-title">
        Equipe</h3>
      <span className="arrow-link-container ml-auto">
        <a href="equipe.html" className="arrow-link">
          <ion-icon name="chevron-forward" />
        </a>
      </span>
    </div>
    {/* Histórico de Atividades */}
    <div id="activity-history" className="d-flex align-items-center">
      <span className="icon" id="icon-gerenc">
        <ion-icon name="document-text" />
      </span>
      <h3 id="section-title">
        Histórico de Atividades</h3>
      <span className="arrow-link-container ml-auto">
        <a href="historico.html" className="arrow-link">
          <ion-icon name="chevron-forward" />
        </a>
      </span>
    </div>
    {/* Ajuda e FAQ */}
    <div id="activity-history" className="d-flex align-items-center">
      <span className="icon" id="icon-gerenc">
        <ion-icon name="help-circle" />
      </span>
      <h3 id="section-title">
        Ajuda e FAQ</h3>
      <span className="arrow-link-container ml-auto">
        <a href="faq.html" className="arrow-link">
          <ion-icon name="chevron-forward" />
        </a>
      </span>
    </div>
  </div>
</div>
    
    </>
  );
};

export default Gerenciar;
