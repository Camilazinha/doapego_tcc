// src/components/GerenciarDados.js

import React from 'react';
import '../styles/main.css';
import '../styles/layout.css';
import '../styles/forms.css';
import { Link } from 'react-router-dom';

function GerenciarDados() {
  return (
    <div className="container px-4 py-5 px-md-5 borda mt-5">
      <h2 id="titulo-principal">Gerenciar dados</h2>

      <div id="cards-container2" className="mt-4 row">
        
        {/* Card para Ver Categorias */}
        <div id="card-pendentes" className="card col-md-6 mb-4">
          <div className="card-body text-center">
            <h5 className="card-title">Ver Categorias</h5>
            <p className="card-text">Gerencie as categorias dos brinquedos, adicione, edite ou remova conforme necessário.</p>
            <Link to="/categorias" className="btn btn-navbar-custom w-75">Gerenciar</Link>
          </div>
        </div>

        {/* Card para Ver Endereços Principais das ONGs */}
        <div id="card-pendentes" className="card col-md-6 mb-4">
          <div className="card-body text-center">
            <h5 className="card-title">Ver Endereços</h5>
            <p className="card-text">Visualize os endereços principais das ONGs cadastradas na plataforma.</p>
            <Link to="/enderecos" className="btn w-75 btn-navbar-custom">Gerenciar</Link>
          </div>
        </div>

        {/* Card para Ver Administradores */}
        <div id="card-pendentes" className="card col-md-6 mb-4">
          <div className="card-body text-center">
            <h5 className="card-title">Ver Administradores</h5>
            <p className="card-text">Gerencie as contas dos administradores das ONGs e suas permissões.</p>
            <Link to="/administradores" className="btn w-75 btn-navbar-custom">Gerenciar</Link>
          </div>
        </div>

        {/* Card para Ver e Suspender Usuários */}
        <div id="card-pendentes" className="card col-md-6 mb-4">
          <div className="card-body text-center">
            <h5 className="card-title">Ver Usuários</h5>
            <p className="card-text">Visualize os usuários cadastrados e suspenda suas contas, se necessário.</p>
            <Link to="/usuarios" className="btn w-75 btn-navbar-custom">Gerenciar</Link>
          </div>
        </div>

        {/* Card para Ver Todas as ONGs */}
        <div id="card-pendentes" className="card col-md-6 mb-4">
          <div className="card-body text-center">
            <h5 className="card-title">Ver ONGs</h5>
            <p className="card-text">Explore e gerencie todas as ONGs registradas na plataforma.</p>
            <Link to="/ongs" className="btn w-75 btn-navbar-custom">Gerenciar</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GerenciarDados;
