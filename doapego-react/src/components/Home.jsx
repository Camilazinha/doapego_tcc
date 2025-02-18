import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <main className>
        <div className="position-relative text-white main-text" alt="" id="imagem-index" style={{ backgroundImage: 'url(/indexpic.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', height: 350, alignContent: 'center' }}>
          <div className="grad1" id="grad1">
            <div className="container-fluid" style={{ maxWidth: '100%', width: 'auto', textAlign: 'left' }}>
              <h1 className="ps-5" style={{ fontSize: 'calc(1.5rem + 1vw)', paddingTop: '10vh' }}>
                Uma doação,<br />um impacto,<br />juntos fazemos um mundo melhor!
              </h1></div>
          </div>
        </div>
        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <div className="cta-text">
              <h2>Transforme vidas!</h2>
              <p>Doe um brinquedo e faça a diferença na vida de uma criança. Cada doação conta!</p>
              <Link to='/tutorial' className="btn btn-primary">Doe agora</Link>
            </div>
          </div>
        </section>
        {/* Sobre Nós */}
        <section id="about" className="about-section mt-4">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 about-text">
                <h2>Sobre nós</h2>
                <p>Bem-vindo ao Doapego, uma plataforma dedicada a conectar pessoas dispostas a fazer a diferença na vida das crianças com ONGs que precisam de apoio através de doações de brinquedos. Nossa missão é facilitar essa conexão para que, juntos, possamos levar alegria e esperança para crianças que enfrentam dificuldades.</p>
                <p>Com o apoio de nossa comunidade e parceiros, conseguimos criar uma rede sólida que amplia o impacto das doações, garantindo que cada brinquedo encontre seu caminho para quem realmente precisa. Acreditamos que cada doação pode transformar a vida de uma criança e queremos convidá-lo a fazer parte desta missão.</p>
                <p>Junte-se a nós para fazer a diferença e espalhar alegria!</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Seção de Depoimentos */}
      {/* Sobre Nós */}
      <section id="testimonials" className="testimonials-section mt-3">
        <div className="container">
          <h2>O que falam sobre nós</h2>
          <div className="testimonial-cards">
            <div className="testimonial-card">
              <p>"A Doapego faz um trabalho maravilhoso. Cada brinquedo doado traz um sorriso para as crianças."</p>
              <footer>- Ana Souza, Coordenadora de Abrigo</footer>
            </div>
            <div className="testimonial-card">
              <p>"É gratificante saber que minhas doações têm um impacto real e positivo nas causas que apoio."</p>
              <footer>- Carlos Lima, Voluntário e Doador</footer>
            </div>
            <div className="testimonial-card">
              <p>"Receber brinquedos para nossas crianças em situação de risco foi uma verdadeira bênção."</p>
              <footer>- Maria Silva, Líder Comunitária</footer>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Home;
