// src/pages/Home.jsx
import { Link } from "react-router-dom";

import boy1 from "../img/boy1.jpg"
import boy2 from "../img/boy2.jpg"
import boy3 from "../img/boy3.jpg"


export default function Home() {

  return (
    <main>
      <div className='container my-5 nao-unico-elemento'>

        <div className="container-fluid home-big p-5 mb-5">
          <h2 className="col-12 col-sm-12 col-md-9 col-lg-5 my-3">UMA PONTE DE AFETO: DE DOADORES PARA INFÂNCIAS QUE MERECEM SORRIR</h2>

          <div className="mt-5 mb-3 d-flex gap-3">
            <Link to=""><button className="btn btn-hidden-fill">Baixe o aplicativo</button></Link>
            <Link to="/como-doar"><button className="btn btn-hidden-unfill">Saiba como funciona</button></Link>
          </div>
        </div>

        <div className="mb-5">
          <h3 className="subtitulo-pagina mb-4">COMO FUNCIONA?</h3>
          <p>
            O Doapego é a coligação entre quem quer doar e quem acolhe. Por meio da nossa plataforma, conectamos doadores a ONGs que precisam de brinquedos para transformar a infância de muitas crianças. De forma simples, você escolhe a ONG, cadastra a doação e, após a aprovação, combina o ponto de entrega (para saber mais sobre como contribuir, acesse a aba "Como Doar?" e descubra outras formas de apoiar essa causa). Tudo pensado para que o carinho chegue a quem mais precisa.
          </p>
        </div>


        <div className="row row-cols-1 row-cols-md-4 text-center g-4 align-items-start mb-5">

          <div className="col d-flex flex-column align-items-center">
            <div className="rounded-circle cbg-tertiary text-white d-flex justify-content-center align-items-center" style={{ width: "50px", height: "50px" }}>
              1
            </div>
            <h6 className="fw-bold mt-3">Doação feita</h6>
            <p className="small mb-0">Você escolhe a ONG e faz a doação.</p>
          </div>

          <div className="col d-flex flex-column align-items-center">
            <div className="rounded-circle cbg-tertiary text-white d-flex justify-content-center align-items-center" style={{ width: "50px", height: "50px" }}>
              2
            </div>
            <h6 className="fw-bold mt-3">ONG aceita</h6>
            <p className="small mb-0">A ONG avalia sua doação e aceita.</p>
          </div>

          <div className="col d-flex flex-column align-items-center">
            <div className="rounded-circle cbg-tertiary text-white d-flex justify-content-center align-items-center" style={{ width: "50px", height: "50px" }}>
              3
            </div>
            <h6 className="fw-bold mt-3">Entrega combinada</h6>
            <p className="small mb-0">Você e a ONG combinam o ponto de entrega.</p>
          </div>

          <div className="col d-flex flex-column align-items-center">
            <div className="rounded-circle cbg-tertiary text-white d-flex justify-content-center align-items-center" style={{ width: "50px", height: "50px" }}>
              4
            </div>
            <h6 className="fw-bold mt-3">Alegria compartilhada</h6>
            <p className="small mb-0">O brinquedo chega e a felicidade é compartilhada!</p>
          </div>

        </div>


        <div className="mb-5">
          <h3 className="subtitulo-pagina mb-4">POR QUE DOAR?</h3>
          <p>
            Doar um brinquedo é muito mais do que dar algo material – é compartilhar momentos de felicidade e criar memórias afetivas que fazem a diferença na vida de uma criança. Ao doar, você oferece a chance de transformação e crescimento. Cada brinquedo que passa das suas mãos para a de outra criança traz não apenas diversão, mas também a oportunidade de aprendizado, imaginação e, principalmente, afeto.
            Em um mundo onde tantas crianças ainda carecem do direito de brincar, um simples gesto de carinho pode mudar completamente o dia delas. Um brinquedo é muito mais do que um objeto; ele pode ser o ponto de partida para novas descobertas, para a construção de amizades e para o fortalecimento de uma infância saudável e cheia de imaginação.
          </p>
        </div>

        <div className="valores mt-5">
          <h3 className="subtitulo-pagina mb-4">BENEFÍCIOS DE DOAR</h3>

          <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center align-items-lg-stretch gap-4">

            <div className="card shadow-sm border-0 p-3 d-flex flex-column align-items-center h-100">
              <img src={boy2} className="card-img-top" alt="ODS 10" />
              <div className="card-body">
                <h5 className="card-title text-center">Renova o valor do brinquedo</h5>
                <p className="card-text">
                  O brinquedo que você já não usa pode ter uma nova vida, trazendo alegria e emoção a quem mais precisa.
                </p>
              </div>
            </div>

            <div className="card shadow-sm border-0 p-3 d-flex flex-column align-items-center h-100">
              <img src={boy3} className="card-img-top" alt="ODS 10" style={{ maxHeight: "192px" }} />
              <div className="card-body">
                <h5 className="card-title text-center">Transforma o dia de uma criança</h5>
                <p className="card-text">
                  Doar é mais do que entregar um item; é levar um sorriso e criar memórias felizes.
                </p>
              </div>
            </div>


            <div className="card shadow-sm border-0 p-3 d-flex flex-column align-items-center h-100">
              <img src={boy1} className="card-img-top" alt="ODS 3" />
              <div className="card-body">
                <h5 className="card-title text-center">Constrói um futuro <br />mais solidário</h5>
                <p className="card-text">
                  Cada brinquedo doado contribui para a criação de um mundo mais empático e amoroso.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
