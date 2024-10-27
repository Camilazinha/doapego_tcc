import React from 'react';
// import { Link } from 'react-router-dom';
import '../styles/main.css';
import '../styles/layout.css';

function Home () {
  return (
    <>
  <main className>
    <div className="position-relative text-white hero-text" alt="" id="imagem-index" style={{backgroundImage: 'url(indexpic.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', height: 350, alignContent: 'center'}}>
      <div className="grad1" id="grad1">
        <div className="container-fluid" style={{maxWidth: '100%', width: 'auto', textAlign: 'left'}}>
          <h1 className="ps-5" style={{fontSize: 'calc(1.5rem + 1vw)', paddingTop: '8%'}}>
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
          <a href="comodoar.html" className="btn btn-primary">Doe agora</a>
        </div>
      </div>
    </section>
    {/* Sobre Nós */}
    <section id="about" className="about-section">
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
    <h1 className="my-5 text-center">Conheça algumas de nossas ONG's parceiras!</h1>
    {/*cards*/}
    <div className="container" id="deck-container">
      <div className="cards">
        <div className="card card-one">
          <a href="ong.html" style={{color: '#4e4e4e', textDecoration: 'none'}}>
            <img src="cardong.jpg" id="img-deck" alt="imagem ong"/>
            <h4 className="card-title" style={{color: '#464646', textAlign: 'center', marginTop: 10}}>Luz da Esperança</h4>
            <p className="description" style={{textAlign: 'left'}}>Na nossa ONG arrecadamos brinquedos para crianças da Zona Leste de São Paulo que enfrentam dificuldades. Cada brinquedo doado traz um pouco de alegria e esperança para essas crianças. Junte-se a nós e ilumine o dia de alguém!</p>
          </a>
        </div>
        <div className="card card-two">
          <a href="ong.html" style={{color: '#4e4e4e', textDecoration: 'none'}}>
            <img src="cardong2.jpg" id="img-deck" alt="imagem ong" />
            <h4 className="card-title" style={{color: '#464646', textAlign: 'center', marginTop: 10}}>Coração Solidário</h4>
            <p className="description" style={{textAlign: 'left'}}>Nós nos dedicamos a trazer felicidade para crianças PcD. Estamos buscando brinquedos adaptados para proporcionar momentos de diversão e inclusão. Sua doação pode fazer uma grande diferença para essas crianças.</p>
          </a>
        </div>
        <div className="card card-three">
          <a href="ong.html" style={{color: '#4e4e4e', textDecoration: 'none'}}>
            <img src="cardong3.jpg" id="img-deck" alt="imagem ong" />
            <h4 className="card-title" style={{color: '#464646', textAlign: 'center', marginTop: 10}}>Alegria na Ação</h4>
            <p className="description" style={{textAlign: 'left'}}>Nossa ONG está arrecadando brinquedos para crianças em situação de risco nas comunidades periféricas. Cada doação contribui para momentos de diversão e aprendizado. Faça parte desta missão e ajude a transformar vidas!</p>
          </a>
        </div>
        <div className="card card-four">
          <a href="ong.html" style={{color: '#4e4e4e', textDecoration: 'none'}}>
            <img src="cardong4.jpg" id="img-deck" alt="imagem ong" />
            <h4 className="card-title" style={{color: '#464646', textAlign: 'center', marginTop: 10}}>Jovens Sorrisos</h4>
            <p className="description" style={{textAlign: 'left'}}>Na ONG Jovens Sorrisos, arrecadamos brinquedos para crianças em comunidades indígenas do Brasil. Cada brinquedo doado ajuda a trazer momentos de diversão e conexão cultural para esses pequenos, contribua!</p>
          </a>
        </div>
      </div>
    </div>
  </main>
  {/* Seção de Depoimentos */}
  {/* Sobre Nós */}
  <section id="testimonials" className="testimonials-section">
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
