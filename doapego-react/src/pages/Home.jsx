// src/pages/Inicio.js
export default function Home() {

  return (
    <main>
      <div className='container my-5 nao-unico-elemento'>
        <h2 className="titulo-pagina mb-5">CONHEÇA MAIS SOBRE O DOAPEGO</h2>

        <div className="mb-5">
          <h4 className="subtitulo-pagina mb-3">POR QUE DOAR?</h4>
          <p>
            Doar um brinquedo é muito mais do que dar algo material – é compartilhar momentos de felicidade e criar memórias afetivas que fazem a diferença na vida de uma criança. Ao doar, você oferece a chance de transformação e crescimento. Cada brinquedo que passa das suas mãos para a de outra criança traz não apenas diversão, mas também a oportunidade de aprendizado, imaginação e, principalmente, afeto.
            Em um mundo onde tantas crianças ainda carecem do direito de brincar, um simples gesto de carinho pode mudar completamente o dia delas. Um brinquedo é muito mais do que um objeto; ele pode ser o ponto de partida para novas descobertas, para a construção de amizades e para o fortalecimento de uma infância saudável e cheia de imaginação.
          </p>
        </div>

        <div className="row text-center border rounded py-4 bg-light mb-5">
          <div className="col-md-3 px-3">
            <h6 className="fw-bold">Doação feita.</h6>
            <p className="small mb-0">Você escolhe a ONG e faz a doação.</p>
          </div>
          <div className="col-md-3 px-3 border-start border-end">
            <h6 className="fw-bold">ONG aceita.</h6>
            <p className="small mb-0">A ONG avalia sua doação e aceita.</p>
          </div>
          <div className="col-md-3 px-3">
            <h6 className="fw-bold">Entrega combinada.</h6>
            <p className="small mb-0">Você e a ONG combinam o ponto de entrega.</p>
          </div>
          <div className="col-md-3 px-3 border-start">
            <h6 className="fw-bold">Alegria compartilhada.</h6>
            <p className="small mb-0">O brinquedo chega e a felicidade é compartilhada!</p>
          </div>
        </div>

        <div className="mb-5">
          <h4 className="subtitulo-pagina mb-3">COMO FUNCIONA?</h4>
          <p>
            O Doapego é a coligação entre quem quer doar e quem acolhe. Por meio da nossa plataforma, conectamos doadores a ONGs que precisam de brinquedos para transformar a infância de muitas crianças. De forma simples, você escolhe a ONG, cadastra a doação e, após a aprovação, combina o ponto de entrega (Para saber mais sobre como contribuir, acesse nossa página Como Doar? e descubra outras formas de apoiar essa causa). Tudo pensado para que o carinho chegue a quem mais precisa.
          </p>
        </div>


      </div>
    </main>
  );
}
