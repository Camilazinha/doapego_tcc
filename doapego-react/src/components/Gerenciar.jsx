import React from 'react';
import '../styles/main.css';
import '../styles/layout.css';
import '../styles/forms.css';


function Cadastro () {
  return (

<div className="container mt-5">
  <h2 id="titulo-principal">Gerenciamento de Doações</h2>
  <div id="cards-container" className="mt-4 row">
    <div id="card-pendentes" className="card col-md-4 mb-4">
      <div className="card-body text-center">
        <h5 className="card-title">Doações Pendentes</h5>
        <p className="card-text">Veja aqui solicitações de doações que ainda estão aguardando <strong>aprovação.</strong></p>
        <a id="link-canceladas" href="#pendentes" className="btn btn-primary">Ver pendentes</a>
      </div>
    </div>
    <div id="card-feitas" className="card col-md-4 mb-4">
      <div className="card-body text-center">
        <h5 className="card-title">Doações Feitas</h5>
        <p className="card-text">Veja aqui todas as doações <strong>aceitas</strong> e já processadas.</p>
        <a id="link-canceladas" href="#feitas" className="btn btn-success">Ver feitas</a>
      </div>
    </div>
    <div id="card-canceladas" className="card col-md-4 mb-4">
      <div className="card-body text-center">
        <h5 className="card-title">Doações Canceladas</h5>
        <p className="card-text">Veja aqui as doações que foram <strong>canceladas</strong> ou <strong>recusadas.</strong></p>
        <a id="link-canceladas" href="#canceladas" className="btn btn-danger">Ver canceladas</a>
      </div>
    </div>
  </div>
</div>

);
};

export default Cadastro;
