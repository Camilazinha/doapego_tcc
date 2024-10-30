import React from 'react';
import '../styles/main.css';
import '../styles/layout.css';

function Sobre() {
  return (
    <>
      <main className='d-block'>
        <div className="position-relative" id="capa" style={{ backgroundImage: `url("/fundo.jpg")` }}>
          <img src="futebol.png" className="rounded position-absolute top-100 start-50 translate-middle" id="futebolkids" alt="..." />
          <div className="card text-white bg-primary top-0 start-0" id="bloco-card1">
            <div className="card-body">
              <h1 className="card-text">Nosso Propósito: Descubra Alegria</h1>
            </div>
          </div>
          <div className="card text-white bg-primary position-absolute bottom-0 end-0" id="bloco-card2">
            <div className="card-body">
              <h1 className="card-text">Através de Doações de Brinquedos</h1>
            </div>
          </div>
        </div>
      </main>
      <div className="container" id="textos">
        <p className="text-center fs-4 mx-auto" id="texto1"> <span id="textocor">
          Transformar vidas através da generosidade:</span> Doar brinquedos não é apenas um ato de caridade,
          mas uma oportunidade de proporcionar momentos de felicidade
          e diversão para crianças em situações desfavorecidas.</p>
        <p className="text-center fs-4 mx-auto" id="texto2"> <span id="textocor">
          Promover o desenvolvimento infantil:</span> Brinquedos estimulam a imaginação, a criatividade e
          fortalecem laços sociais, contribuindo para o crescimento saudável e feliz das crianças</p>
        <p className="text-center fs-4 mx-auto" id="texto2"> <span id="textocor">
          Fomentar a sustentabilidade e responsabilidade social:</span> Ao doar brinquedos, estamos contribuindo
          para a redução do desperdício e promovendo uma cultura de reutilização e reciclagem, ensinando valores
          essenciais de cuidado com o meio ambiente.</p>
        <p className="text-center fs-4 mx-auto" id="texto2"> <span id="textocor">
          Construir uma comunidade solidária e empática:</span> Através das doações, fortalecemos os
          laços comunitários, promovendo uma sociedade mais compassiva onde o cuidado com o próximo é uma prioridade.</p>
        <p className="text-center fs-4 mx-auto" id="texto3"> <span id="textocor">
          Oferecer esperança e oportunidades:</span> Cada doação de brinquedo é um gesto de amor e apoio, oferecendo
          às crianças a certeza de que são amadas e valorizadas pela comunidade, enquanto proporciona um vislumbre
          de um futuro mais brilhante.</p>
      </div>
    </>
  );
};

export default Sobre;
