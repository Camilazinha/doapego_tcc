import ods10 from '../img/ods10.svg';
import ods3 from '../img/ods3.svg';

export default function Sobre() {
  return (
    <main>
      <div className="container my-5 px-5 d-flex flex-column gap-4">
        <div className="somos">
          <h2 className="titulo-pagina mb-5">QUEM SOMOS?</h2>
          <p>Somos um time apaixonado por impacto social, movido por empatia, inovação e tecnologia. Trabalhamos diariamente para transformar a vida das crianças e de todos os envolvidos no Doapego, criando uma rede de solidariedade e afetividade. Cada brinquedo doado é mais que um simples objeto: é uma chance de proporcionar alegria, conforto e dignidade, conectando histórias e corações em uma jornada de transformação social. Nosso trabalho é uma missão, e o sorriso no rosto de cada criança que recebe uma doação é a maior recompensa.</p>
        </div>

        <div className="missao mt-5">
          <h3 className="subtitulo-pagina mb-5">NOSSA MISSÃO</h3>
          <p>
            Nossa missão é conectar brinquedos que não são mais utilizados a crianças que precisam de carinho e atenção, promovendo a doação como uma ferramenta de transformação social. Buscamos criar laços afetivos entre quem doa e quem recebe, promovendo não apenas a troca de brinquedos, mas também de histórias e de afetos. Acreditamos que cada brinquedo carrega uma história única e, por meio dele, podemos espalhar alegria, esperança e oportunidades, ajudando a melhorar a vida das crianças que mais necessitam de atenção e cuidado. Cada doação feita fortalece a nossa missão de gerar um impacto positivo nas comunidades.
          </p>
        </div>

        <div className="visao mt-5">
          <h3 className="subtitulo-pagina mb-5">NOSSA VISÃO</h3>
          <p>
            Nossa visão é ser a plataforma de doação de brinquedos mais confiável e acessível do país, reconhecida por sua capacidade de transformar vidas, comunidades e gerar um impacto social real e duradouro. Queremos criar um movimento de solidariedade que inspire pessoas de todas as idades a contribuir com o bem-estar e a felicidade das crianças em situação de vulnerabilidade social. Sonhamos com uma sociedade mais justa, onde o simples ato de doar um brinquedo possa fazer uma grande diferença na vida de quem recebe, criando uma cultura de empatia e colaboração, onde cada gesto de carinho tem o poder de mudar o mundo.
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