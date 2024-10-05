import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';
import '../styles/layout.css';

function Home () {
  return (
    <>
      <div className="position-relative text-white hero-text" id="imagem-index"
        style={{
          backgroundImage: "url(indexpic.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "350px",
          alignContent: "center"
        }}>
        <div className="grad1" id="grad1">
          <div className="container-fluid" style={{ maxWidth: "100%", width: "auto", textAlign: "left" }}>
            <h1 className="ps-5" style={{ fontSize: "calc(1.5rem + 1vw)", paddingTop: "8%" }}>
              Uma doação,<br />um impacto,<br />juntos fazemos um mundo melhor!
            </h1>
          </div>
        </div>
      </div>

      <section className="cta-section">
        <div className="cta-content">
          <div className="cta-text">
            <h2>Transforme vidas!</h2>
            <p>Doe um brinquedo e faça a diferença na vida de uma criança. Cada doação conta!</p>
            <Link to="/comodoar" className="btn btn-primary">Doe agora</Link>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 about-text">
              <h2>Sobre nós</h2>
              <p>Bem-vindo ao Doapego, uma plataforma dedicada a conectar pessoas dispostas a fazer a diferença...</p>
              <p>Com o apoio de nossa comunidade e parceiros, conseguimos criar uma rede sólida...</p>
              <p>Junte-se a nós para fazer a diferença e espalhar alegria!</p>
            </div>
          </div>
        </div>
      </section>

      <h1 className="my-5 text-center">Conheça algumas de nossas ONG's parceiras!</h1>

      <div className="container" id="deck-container">
        <div className="cards">
          <div className="card card-one">
            <Link to="/ong" style={{ color: "#4e4e4e", textDecoration: "none" }}>
              <img src="cardong.jpg" id="img-deck" alt="ONG Luz da Esperança" />
              <h4 className="card-title" style={{ color: "#464646", textAlign: "center", marginTop: "10px" }}>
                Luz da Esperança
              </h4>
              <p className="description" style={{ textAlign: "left" }}>Na nossa ONG arrecadamos brinquedos para crianças da Zona Leste de São Paulo...</p>
            </Link>
          </div>

          <div className="card card-two">
            <Link to="/ong" style={{ color: "#4e4e4e", textDecoration: "none" }}>
              <img src="cardong2.jpg" id="img-deck" alt="ONG Coração Solidário" />
              <h4 className="card-title" style={{ color: "#464646", textAlign: "center", marginTop: "10px" }}>
                Coração Solidário
              </h4>
              <p className="description" style={{ textAlign: "left" }}>Nós nos dedicamos a trazer felicidade para crianças PcD...</p>
            </Link>
          </div>

          <div className="card card-three">
            <Link to="/parceiros" style={{ color: "#4e4e4e", textDecoration: "none" }}>
              <img src="cardong3.jpg" id="img-deck" alt="ONG Alegria na Ação" />
              <h4 className="card-title" style={{ color: "#464646", textAlign: "center", marginTop: "10px" }}>
                Alegria na Ação
              </h4>
              <p className="description" style={{ textAlign: "left" }}>Nossa ONG está arrecadando brinquedos para crianças em situação de risco...</p>
            </Link>
          </div>

          <div className="card card-four">
            <Link to="/ong" style={{ color: "#4e4e4e", textDecoration: "none" }}>
              <img src="cardong4.jpg" id="img-deck" alt="ONG Jovens Sorrisos" />
              <h4 className="card-title" style={{ color: "#464646", textAlign: "center", marginTop: "10px" }}>
                Jovens Sorrisos
              </h4>
              <p className="description" style={{ textAlign: "left" }}>Na ONG Jovens Sorrisos, arrecadamos brinquedos para crianças em comunidades indígenas...</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
