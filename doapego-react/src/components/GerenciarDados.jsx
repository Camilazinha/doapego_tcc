import React from 'react';
import '../styles/main.css';
import '../styles/layout.css';
import '../styles/forms.css';
import { Link } from 'react-router-dom';

function GerenciarDados() {
  return (

    <div className="container px-4 py-5 px-md-5 borda mt-5">
      <h2 id="titulo-principal">Doações recebidas</h2>

      <div id="cards-container2" className="mt-4 row">
        <div id="card-pendentes" className="card col-md-6 mb-4">
          <div className="card-body text-center">
            <h5 className="card-title">Doações Pendentes</h5>
            <p className="card-text">Veja aqui solicitações de doações que <strong>aguardam aprovação</strong>.</p>
            <Link to="" className="btn btn-navbar-custom w-75">Ver pendentes</Link>
          </div>
        </div>
        <div id="card-feitas" className="card col-md-6 mb-4">
          <div className="card-body text-center">
            <h5 className="card-title">Doações Aceitas</h5>
            <p className="card-text">Veja aqui o histórico de doações <strong>aceitas e já processadas</strong>.</p>
            <Link to="" className="btn w-75 btn-navbar-custom">Ver histórico</Link>
          </div>
        </div>
        <div id="card-canceladas" className="card col-md-6 mb-4">
          <div className="card-body text-center">
            <h5 className="card-title">Doações Recusadas</h5>
            <p className="card-text">Veja aqui o histórico de doações que foram <strong>recusadas</strong>.</p>

            <Link to='' className="btn w-75 btn-navbar-custom">Ver histórico</Link>
          </div>
        </div>
      </div>
    </div>


  );
};

export default GerenciarDados;
