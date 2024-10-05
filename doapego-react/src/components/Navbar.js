import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';
import '../styles/layout.css';

function Navbar() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid px-2 mx-2">
          <Link className="navbar-brand" to="/">Doapego</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Início</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/parceiros">Parceiros</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Propósito</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Como doar</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Minha ONG</Link>
              </li>
            </ul>
            <div className="d-flex ms-auto">
              <Link to="/">
                <button type="button" className="btn ml-auto btn-navbar-custom">Baixe o App!</button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
