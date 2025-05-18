//src/components/NotAuthorized.jsx

import brokenHeart from "../img/brokenHeart.png"
import { Link } from "react-router-dom"


export default function NotAuthorized() {
  const userType = localStorage.getItem('tipo') || '';

  return (
    <main>
      <div className="container my-5">
        <div className="d-grid justify-content-center justify-items-center gap-2" style={{ justifyItems: "center" }}>
          <img src={brokenHeart} style={{ width: "104px", height: "104px" }} alt="coração partido" />
          <h3 className="text-muted fw-bold">Desculpe! Tela não encontrada.</h3>
          <p className="fs-5 text-muted">Se o problema persistir, entre em contato conosco.</p>

          {userType ? (
            <Link to="/inicio">
              <button className="mt-3 btn btn-custom-notfound">Voltar ao início</button>
            </Link>
          ) : (
            <Link to="/">
              <button className="mt-3 btn btn-custom-notfound">Voltar ao início</button>
            </Link>
          )}

        </div>
      </div>
    </main>
  );
}