import React from 'react';
import '../styles/main.css';
import '../styles/layout.css';

function Tutorial() {
  return (
    <div>
      <div className="position-relative text-white">
        <div className=" position-relative main-text" style={{ backgroundImage: 'url(/index1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', height: 350, alignContent: 'center'}}>
          <div className="container-fluid" style={{ maxWidth: '100%', width: 'auto', textAlign: 'center' }} >
            <h1 className="ps-5" style={{ fontSize: 'calc(1.5rem + 1vw)' }}>
              Quer nos ajudar com uma doação?
            </h1>
          </div>
        </div>
      </div>
      <div className="container-fluid px-2 mx-2">
        <div className="box">
          <h3 className="text-center mt-5" style={{ textAlign: 'left' }}>Baixe o aplicativo hoje e <br /> se torne <span style={{ color: '#ffcd99' }}> uma estrela</span> para <br /> crianças que realmente precisam!
          </h3>
        </div>
        <h3 className="text-center mt-5" style={{ textAlign: 'left' }}>
          Seguindo as nossas etapas, <br /> você conseguirá contribuir<br /> com a sua doação!
        </h3>
      </div>
      <div className="d-flex justify-content-center" id="ul-list">
        <ol className="w-50 p-3" style={{ fontSize: 20, marginTop: 50 }} id="list-circles">
          <li>Instale o nosso aplicativo Doapego;</li>
          <li>Entrando no Doapego, você pode acessar a sua conta já existente com o login. Caso ainda não tenha sua conta,
            você cadastrará uma nova;</li>
          <li>Com a conta já iniciada, você poderá fazer uma doação de duas maneiras: selecionando uma ONG já cadastrada na
            plataforma ou selecionando no botão de navegação com o símbolo de coração; </li>
          <li>Em ambos os casos vai ter um botão escrito “DOAR”. Clicando nele, aparecerá uma tela para preencher os dados
            da doação;</li>
          <li>Adicionando todos os dados relevantes para a doação, você poderá enviar para a revisão da ONG em que escolheu;
          </li>
          <li>Depois de aprovada, você e a ONG discutirão em particular sobre onde será o ponto de entrega da doação feita; </li>
          <li>Caso essas etapas não tenham dado certo, você poderá nos comunicar sobre o erro ocorrido em nosso e-mail de
            contato.</li>
        </ol></div>
    </div>

  );
};

export default Tutorial;
