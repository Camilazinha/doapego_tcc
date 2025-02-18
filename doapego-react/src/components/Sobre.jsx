import React from 'react';

function Sobre() {
  return (
    <>
      <main className='d-block'>
        <div className="position-relative" style={{ backgroundImage: `url("/crianca-mao-logo.png")`, backgroundSize: 'cover', backgroundPosition: 'center', height: '350px', alignContent: 'center' }}>

          <div className="layered-text">
            <h1 className="main-text" style={{ margin: '0.5rem 0' }}>Nosso Propósito: Descubra Alegria</h1>
            <h2 className="sub-text">Através de Doações de Brinquedos</h2>
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
