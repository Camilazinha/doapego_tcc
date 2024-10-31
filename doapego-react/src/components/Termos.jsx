import React from 'react';
import '../styles/main.css';
import '../styles/layout.css';

function Termos() {
  return (
<>
  <main>
    <div className="container">
      <div className="title">
        <h1>
          Conheça nossos termos de uso
        </h1>
      </div>
    </div>
  </main>
  <div className="container">
    <div className="text text-center mx-auto fs-4" style={{margin: '5rem'}}>
      <p>Obrigado por seu interesse no Doapego! Estamos aqui para esclarecer qualquer 
        dúvida sobre nossos serviços e termos.</p>
      <p>
        No Doapego, priorizamos a segurança e a privacidade dos nossos usuários e parceiros. Nossa 
        plataforma conecta doadores de brinquedos a ONGs que precisam desses itens, promovendo solidariedade 
        e simplicidade nesse processo. Ao utilizar o Doapego, você concorda com nossos Termos de Uso, que 
        incluem as seguintes diretrizes:
      </p>
    </div>
  </div>
  <div className="container">
    <div className="row text-center">
      <div className="col-sm-6 mt-5">
        <div className="card shadow p-3 mb-5 bg-body rounded">
          <div className="card-body">
            <h5 className="card-title fs-3">Afirmação</h5>
            <p className="card-text fs-5">Ao usar o Doapego, você concorda com estes Termos de Uso. Se não concordar, 
              por favor, não utilize o site.</p>
          </div>
        </div>
      </div>
      <div className="col-sm-6 mt-5">
        <div className="card shadow p-3 mb-5 bg-body rounded">
          <div className="card-body">
            <h5 className="card-title fs-3">O que Fazemos?</h5>
            <p className="card-text fs-5">O Doapego é uma plataforma que conecta doadores de brinquedos a ONGs que 
              precisam desses itens.</p>
          </div>
        </div>
      </div>
      <div className="col-sm-6 mt-5">
        <div className="card shadow p-3 mb-5 bg-body rounded">
          <div className="card-body">
            <h5 className="card-title fs-3">Rsponsabilidades</h5>
            <p className="card-text fs-5">Você é responsável pela veracidade dos dados que fornece e pela qualidade dos brinquedos doados. 
              A entrega dos brinquedos deve ser combinada entre doador e ONG.</p>
          </div>
        </div>
      </div>
      <div className="col-sm-6 mt-5">
        <div className="card shadow p-3 mb-5 bg-body rounded">
          <div className="card-body">
            <h5 className="card-title fs-3">Conteúdo</h5>
            <p className="card-text fs-5">O conteúdo do site, como textos e imagens, é protegido por direitos autorais.</p>
          </div>
        </div>
      </div>
      <div className="col-sm-6 mt-5">
        <div className="card shadow p-3 mb-5 bg-body rounded">
          <div className="card-body">
            <h5 className="card-title fs-3">Limitação de responsabilidade</h5>
            <p className="card-text fs-5">O Doapego não se responsabiliza por problemas relacionados ao uso do site ou às doações.</p>
          </div>
        </div>
      </div>
      <div className="col-sm-6 mt-5">
        <div className="card shadow p-3 mb-5 bg-body rounded">
          <div className="card-body">
            <h5 className="card-title fs-3">Cadastro e Uso</h5>
            <p className="card-text fs-5">Para usar o site, você pode precisar se cadastrar. Mantenha suas informações atualizadas 
              e sua senha segura.</p>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-sm-6 mt-5">
          <div className="card shadow p-3 mb-5 bg-body rounded">
            <div className="card-body">
              <h5 className="card-title fs-3">Mudanças nos Termos</h5>
              <p className="card-text fs-5">Podemos alterar estes Termos a qualquer momento. Avisaremos sobre mudanças, 
                e o uso contínuo indica sua aceitação.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</>

  );
};

export default Termos;