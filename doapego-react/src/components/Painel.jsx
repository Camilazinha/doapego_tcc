import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';
import '../styles/layout.css';
import '../styles/forms.css';

function Painel() {
  return (
    <>
      <div id="profile-container" className="container px-4 py-5 px-sm-5 mt-5 borda">
        <h2 id="titulo-principal">Configurações</h2>
        <div id="profile-section">

          {/* Editar Perfil */}
          <Link to='/' id="edit-info" className="d-flex align-items-center item-config">
            <span className="icon" id="icon-gerenc">
              <ion-icon name="pencil-outline" />
            </span>
            <h3 id="section-title">Editar perfil</h3>
            <span className="arrow-link-container ml-auto">
              <a href="edit-profile.html" className="arrow-link">
                <ion-icon name="chevron-forward" />
              </a>
            </span>
          </Link>
          {/* Segurança */}
          <Link to='/' id="security-settings" className="d-flex align-items-center item-config">
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
          </Link>
          {/* Notificações */}
          {/* <Link to='/' id="notifications-settings" className="d-flex align-items-center item-config">
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
          </Link> */}
          {/* Equipe */}
          <Link to='/' id="team-settings" className="d-flex align-items-center item-config">
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
          </Link>
          {/* Histórico de Atividades */}
          <Link to='/gerenciar' id="activity-history" className="d-flex align-items-center item-config">
            <span className="icon" id="icon-gerenc">
              <ion-icon name="document-text" />
            </span>
            <h3 id="section-title">
              Doações recebidas</h3>
            <span className="arrow-link-container ml-auto">
              <a href="historico.html" className="arrow-link">
                <ion-icon name="chevron-forward" />
              </a>
            </span>
          </Link>
          {/* Ajuda e FAQ */}
          <Link to="/" id='activity-history' className='d-flex align-items-center item-config'>

            <span className="icon" id="icon-gerenc">
              <ion-icon name="help-circle" />
            </span>
            <h3 id="section-title">
              Ajuda e FAQ</h3>
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
};

export default Painel;
