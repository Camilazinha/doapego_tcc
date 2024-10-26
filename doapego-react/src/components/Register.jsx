import React from 'react';
import '../styles/main.css';
import '../styles/layout.css';
import '../styles/forms.css';


function Parceiros () {
  return (

<main>
  {/* <div class="position-relative text-white" id="imagem">

<div class="container-fluid" style="max-width: 100%; width: auto; text-align: center;">
  <h1 class="pl-sm-3" style="font-size: calc(1.5rem + 1vw);">
    Cadastre sua ONG para receber doações
  </h1>
</div>
    </div> */}
  <div className="container px-4 py-5 px-md-5 text-lg-start my-5 borda">
    <form id="form">

      <h1>Dados de contato</h1>
      <div className="row gx-lg-5 align-items-center mb-3">

        <div className="col-11 col-lg-3 mb-4 my-lg-4">
          <input type="text" className="inputs required form-control" placeholder="Seu nome completo" aria-label="Seu nome completo" required oninput="nameValidate()" />
        </div>
        <div className="col-11 col-lg-3 mb-4 my-lg-4">
          <input type="email" className="form-control" placeholder="Seu e-mail" aria-label="Seu e-mail" required />
        </div>
        <div className="col-11 col-lg-3 mb-4 my-lg-4">
          <input type="text" className="form-control" placeholder="Seu número de telefone" aria-label="Seu número de telefone" required />
        </div>

        <h1>Dados da organização não governamental</h1>
        <div className="col-11 col-lg-3 mb-4 my-lg-4">
          <input type="text" className="form-control" placeholder="Nome da ONG" aria-label="Nome da ONG" required />
        </div>
        <div className="col-11 col-lg-3 mb-4 my-lg-4">
          <input type="email" className="form-control" placeholder="E-mail da ONG" aria-label="E-mail da ONG" required />
        </div>
        <div className="col-11 col-lg-3 mb-4 my-lg-4">
          <input type="text" className="form-control" required placeholder="Site ou página virtual do projeto" />
        </div>

        
        <h1>Localização da ONG</h1>
        <div className="col-11 col-lg-1 mb-4 my-lg-4">
          <input type="text" className="form-control" id="validationDefault05" placeholder="CEP" required />
        </div>

        <div className="col-11 col-lg-2 mb-4 my-lg-4">
          <input type="text" className="form-control" id="EstadoONG" placeholder="Estado" required />
        </div>

        <div className="col-11 col-lg-2 mb-4 my-lg-4">
          <input type="text" className="form-control" id="CidadeONG" placeholder="Cidade" required />
        </div>
        <div className="col-11 col-lg-4 mb-4 my-lg-4">
          <input type="text" className="form-control" id="LogradouroONG" placeholder="Logradouro" required />
        </div>

        <div className="col col-12">
          <div className="form-check" id="checkText">
            <input className="form-check-input" type="checkbox" defaultValue id="invalidCheck2" required />
            <label className="form-check-label" htmlFor="invalidCheck2">
              Eu li e concordo com os termos de uso <strong>(obrigatório)</strong>
            </label>
          </div>

          <div className="form-check" id="checkText">
            <input className="form-check-input" type="checkbox" defaultValue id="invalidCheck1" required />
            <label className="form-check-label" htmlFor="invalidCheck1">
              Eu li e concordo com a política de privacidade <strong>(obrigatório)</strong>
            </label>
          </div>
        </div>
      </div>
      <button type="submit" className="mt-3 me-2 py-2 btn ml-auto btn-navbar-custom">Solicitar cadastro</button>
      <a href="login.html">
        <button type="button" className="mt-3 py-2 btn ml-auto alt-button">Já tenho
          cadastro</button>
      </a>
    </form>
  </div>
</main>

  
/* <script>
  const form = document.getElementById('form');
  const campos = document.querySelectorAll('.required');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function nameValidate(){
    if(campos[0].value.length < 3)
  {
    console.log('Seu nome deve ter no mínimo 3 caracteres.');
  }

  else {
    console.log('Nome validado yepi');
  }
  }
</script> */

);
};

export default Parceiros;
