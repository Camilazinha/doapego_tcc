import teste from '../img/imagem-teste.jpg';

export default function Sobre() {
  return (
    <main>
      <div className="container my-5 nao-unico-elemento px-5">
        <div className="somos">
          <h2 className="titulo-pagina mb-5">QUEM SOMOS?</h2>
          <p>Somos um time apaixonado por impacto social, movido por empatia e tecnologia. Cada passo do Doapego é guiado pelo desejo de fazer a diferença na vida das crianças e de quem participa dessa corrente. Nosso compromisso é seguir conectanddo histórias, afetos e oportunidades, com um sorriso em cada entrega.</p>
        </div>

        <div className="missao">
          <h3 className="titulo-pagina custom-color-secondary mb-5">NOSSA MISSÃO</h3>
          <p>
            Conectar brinquedos que não são mais usados a crianças que precisam de carinho, criando laços entre quem doa e quem recebe. Acreditamos que cada brinquedo tem uma história e merece ser parte de outra, trazendo alegria e esperança para aqueles que mais precisam.
          </p>
        </div>

        <div className="visao">
          <h3 className="titulo-pagina custom-color-secondary mb-5">NOSSA VISÃO</h3>
          <p>
            Ser a plataforma de doação de brinquedos mais confiável e acessível, reconhecida por transformar vidas e comunidades. Queremos inspirar uma cultura de solidariedade, onde cada gesto conta e cada brinquedo tem o poder de mudar o mundo.
          </p>
        </div>

        <div className="valores">
          <h3 className="titulo-pagina custom-color-secondary mb-5">NOSSAS ODS</h3>

          <div className="card">
            <img src={teste} className="card-img-top" alt="Imagem de exemplo" />
            <div className="card-body">
              <h5 className="card-title">Objetivo de Desenvolvimento Sustentável 1</h5>
              <p className="card-text">
                lead-in to additional content. This content is a little bit longer.
              </p>

            </div>
          </div>
        </div>
      </div>

    </main>
  );
};