import React from 'react';
import '../styles/main.css';
import '../styles/layout.css';
import '../styles/forms.css';


function Gerenciar() {
  return (

    <div className="container mt-5">
      <h2 id="titulo-principal">Gerenciamento de Doações</h2>
      <div id="cards-container2" className="mt-4 row">
        <div id="card-pendentes" className="card col-md-4 mb-4">
          <div className="card-body text-center">
            <h5 className="card-title">Doações Pendentes</h5>
            <p className="card-text">Veja aqui solicitações de doações que <strong>aguardam aprovação.</strong></p>
            <a id="link-pendentes" href="pendentes.html" className="btn btn-primary">Ver pendentes</a>
          </div>
        </div>
        <div id="card-feitas" className="card col-md-4 mb-4">
          <div className="card-body text-center">
            <h5 className="card-title">Doações Aceitas</h5>
            <p className="card-text">Veja aqui o histórico de doações <strong>aceitas</strong> e já processadas.</p>
            <a id="link-feitas" href="feitas.html" className="btn btn-primary">Ver histórico</a>
          </div>
        </div>
        <div id="card-canceladas" className="card col-md-4 mb-4">
          <div className="card-body text-center">
            <h5 className="card-title">Doações Recusadas</h5>
            <p className="card-text">Veja aqui o histórico de doações que foram <strong>recusadas.</strong></p>
            <a id="link-recusadas" href="canceladas.html" className="btn btn-primary">Ver histórico</a>
          </div>
        </div>
      </div>
    </div>


  );
};

export default Gerenciar;
