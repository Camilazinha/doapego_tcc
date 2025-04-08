import React from 'react';

function Privacidade() {
  return (
    <>
      <div>
        <div className="container px-4 py-5 px-md-5 mt-5 text-lg-start borda">
          <h1 className="title"> Conheça nossa política de privacidade</h1>

          <div className="container">
            <div className="text text-center mx-auto fs-4 my-5">
              <p>Agradecemos o interesse em conhecer o Doapego!
                Estamos à disposição para esclarecer qualquer dúvida.</p>
              <p>
                No Doapego, a segurança e privacidade dos nossos usuários e parceiros são fundamentais.
                Valorizamos a transparência no uso e tratamento dos dados pessoais. Por isso, esta Política de
                Privacidade explica como coletamos, utilizamos e compartilhamos informações de quem acessa ou
                utiliza nossa plataforma, seja doador, ONG ou visitante.
              </p>
            </div>
          </div>
          <div className="container">
            <div className="row row-ana text-center">
              <div className="col">
                <div className="card-ana shadow p-3 mb-5 bg-body rounded">
                  <div className="card-body">
                    <h5 className="card-title fs-3">Coleta de Dados</h5>
                    <p className="card-text fs-5">Coletamos informações, como nome, e-mail e telefone, para
                      facilitar a comunicação entre doadores e ONGs.</p>
                  </div>
                </div>

              </div>
              <div className="col">
                <div className="card-ana shadow p-3 mb-5 bg-body rounded">
                  <div className="card-body">
                    <h5 className="card-title fs-3">Uso dos Dados</h5>
                    <p className="card-text fs-5">Usamos os dados apenas para facilitar o contato entre usuários e melhorar o site.</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card-ana shadow p-3 mb-5 bg-body rounded">
                  <div className="card-body">
                    <h5 className="card-title fs-3">Seus Direitos</h5>
                    <p className="card-text fs-5">Você pode acessar, corrigir ou excluir seus dados a qualquer momento,
                      entrando em contato conosco.</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card-ana shadow p-3 mb-5 bg-body rounded">
                  <div className="card-body">
                    <h5 className="card-title fs-3">Compartilhamento</h5>
                    <p className="card-text fs-5">Usamos os dados apenas para facilitar o contato entre usuários e melhorar o site.</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card-ana shadow p-3 mb-5 bg-body rounded">
                  <div className="card-body">
                    <h5 className="card-title fs-3">Segurança</h5>
                    <p className="card-text fs-5">Tomamos medidas para proteger seus dados, mas não podemos garantir segurança total.</p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card-ana shadow p-3 mb-5 bg-body rounded">
                  <div className="card-body">
                    <h5 className="card-title fs-3">Mudanças na Política</h5>
                    <p className="card-text fs-5">Podemos atualizar a Política de Privacidade. Avisaremos sobre mudanças, e o uso contínuo
                      do site indica sua aceitação.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>

  );
};

export default Privacidade;
