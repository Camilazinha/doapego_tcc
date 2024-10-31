import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';
import '../styles/layout.css';
import '../styles/forms.css';

function Configuracoes() {
  // Recupera o tipo de usuário do localStorage
  const userType = localStorage.getItem('userType');

  return (
    <>
      <div id="profile-container" className="container px-4 py-5 px-sm-5 mt-5 borda">
        <h2 id="titulo-principal">Configurações</h2>
        <div id="profile-section">

          {/* Editar Perfil */}
          <Link to='/' id="edit-info" className="d-flex align-items-center item-config">
            <span className="icon" id="icon-gerenc">
              <ion-icon name="person-circle" />
            </span>
            <h3 id="section-title">Meu perfil</h3>
            <span className="arrow-link-container ml-auto">
              <span className="arrow-link">
                <ion-icon name="chevron-forward" />
              </span>
            </span>
          </Link>

          {/* Perfil da Ong */}
          <Link to='/' id="ong-info" className="d-flex align-items-center item-config">
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
          
          {/* Equipe - Visível somente para ADMIN_ONG */}
          {userType === 'ONG' && (
            <Link to='/' id="team-settings" className="d-flex align-items-center item-config">
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
          )}

          {/* Doações recebidas */}
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

          {/* Segurança */}
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

          {/* Ajuda e FAQ */}
          <Link to="/ajuda" id='activity-history' className='d-flex align-items-center item-config'>
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
};

export default Configuracoes;
