import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-body-tertiary mt-4 pt-3">
      <div className="container text-center text-md-start mt-5">
        <div className="row mt-3">
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Doapego</h6>
            <p>
              Ajudamos você a doar brinquedos para ONGs parceiras que fazem a diferença na vida de muitas crianças.
              Juntos, podemos espalhar alegria e transformar momentos com simples gestos de carinho.
            </p>
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Utilidade</h6>
            <p><Link to="/" className="text-reset">Política de privacidade</Link></p>
            <p><Link to="/" className="text-reset">Termos de uso</Link></p>
            <p><Link to="/" className="text-reset">Como doar</Link></p>
            <p><Link to="/" className="text-reset">Ajuda</Link></p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Contato</h6>
            <p>Av. Grupo Bandeirantes 138, 06420-150</p>
            <p>doapegoitb@gmail.com</p>
            <p>+55 11 94002-8922</p>
            <p>+55 11 92078-7810</p>
          </div>
        </div>
      </div>

      <div className="text-center p-4" style={{backgroundColor: "#fcfcfc"}}>
        © 2024 Copyright:
        <Link className="fw-bold" to="/" style={{color: "#696969"}}>doapegoitb.com</Link>
      </div>
    </footer>
  );
}

export default Footer;
