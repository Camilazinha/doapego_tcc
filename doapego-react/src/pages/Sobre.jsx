import teste from '../img/imagem-teste.jpg';
import ods10 from '../img/ods10.svg';
import ods3 from '../img/ods3.svg';

export default function Sobre() {
  return (
    <main>
      <div className="container my-5 px-5 d-flex flex-column gap-4">
        <div className="somos">
          <h2 className="titulo-pagina mb-5">QUEM SOMOS?</h2>
          <p>Somos um time apaixonado por impacto social, movido por empatia e tecnologia. Cada passo do Doapego é guiado pelo desejo de fazer a diferença na vida das crianças e de quem participa dessa corrente. Nosso compromisso é seguir conectanddo histórias, afetos e oportunidades, com um sorriso em cada entrega.</p>
        </div>

        <div className="missao mt-5">
          <h3 className="subtitulo-pagina mb-5">NOSSA MISSÃO</h3>
          <p>
            Conectar brinquedos que não são mais usados a crianças que precisam de carinho, criando laços entre quem doa e quem recebe. Acreditamos que cada brinquedo tem uma história e merece ser parte de outra, trazendo alegria e esperança para aqueles que mais precisam.
          </p>
        </div>

        <div className="visao mt-5">
          <h3 className="subtitulo-pagina mb-5">NOSSA VISÃO</h3>
          <p>
            Ser a plataforma de doação de brinquedos mais confiável e acessível, reconhecida por transformar vidas e comunidades. Queremos inspirar uma cultura de solidariedade, onde cada gesto conta e cada brinquedo tem o poder de mudar o mundo.
          </p>
        </div>

        <div className="valores mt-5">
          <h3 className="subtitulo-pagina mb-5">NOSSAS ODS</h3>

          <div className="d-flex flex-column flex-md-row justify-content-center align-items-stretch gap-4">


            <div className="card shadow-sm border-0 p-3 d-flex flex-column align-items-center h-100">
              <img src={ods3} className="card-img-top" alt="ODS 3" />
              <div className="card-body">
                <h5 className="card-title">ODS 3 - Saúde e Bem-estar</h5>
                <p className="card-text">
                  Brincar é essencial para o bem-estar infantil. Juntos, levamos alegria e saúde a quem mais precisa!
                </p>
              </div>
            </div>

            <div className="card shadow-sm border-0 p-3 d-flex flex-column align-items-center h-100">
              <img src={ods10} className="card-img-top" alt="ODS 10" />
              <div className="card-body">
                <h5 className="card-title">ODS 10 - Redução das Desigualdades</h5>
                <p className="card-text">
                  Ao doar brinquedos, espalhamos carinho e tornamos a infância mais justa para quem precisa de atenção e amor.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </main >
  );
};