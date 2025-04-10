import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import noImageIcon from "../img/noimage-icon.svg";
import errorIcon from "../img/errorexclamation-icon.svg";
import errorTriangleIcon from "../img/errortriangle-icon.svg";

export default function Solicitacoes() {
  const [ongs, setOngs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  useEffect(() => {
    const fetchOngsPendentes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/ongs?statusOng=PENDENTE");
        setOngs(response.data.items || response.data);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar ONGs pendentes:", err);

        if (err.response) {
          setError("Erro ao carregar os dados. Tente novamente mais tarde.")
        } else if (err.request) {
          setError("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.")
        } else {
          setError("Ocorreu um erro inesperado.")
        }

      } finally {
        setLoading(false);
      }
    };
    fetchOngsPendentes();
  }, []);

  const totalPaginas = Math.ceil(ongs.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const itensAtuais = ongs.slice(indiceInicial, indiceInicial + itensPorPagina);

  if (loading)
    return (
      <div className="container my-5 nao-unico-elemento">
        <h2 className="titulo-pagina mb-5">GERENCIAR SOLICITAÇÕES</h2>
        <div className="d-flex justify-content-center align-items-center flex-column">
          <div className="spinner-border text-secondary m-3" role="status" style={{ width: "3rem", height: "3rem" }}></div>
          <p className="loading-text">Carregando...</p>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="container my-5 nao-unico-elemento">
        <h2 className="titulo-pagina mb-5">GERENCIAR SOLICITAÇÕES</h2>

        <div className="alert alert-danger d-flex">
          <img src={errorTriangleIcon} className="me-2" alt="" />
          {error
            ? <p className="erro">{error}</p>
            : null}
        </div>
      </div>
    )

  return (
    <main>
      <div className="container my-5">
        <h2 className="titulo-pagina mb-5">GERENCIAR SOLICITAÇÕES</h2>

        <div className="list-group mb-5">
          {itensAtuais.length > 0 ? (
            itensAtuais.map((ong) => (
              <div key={ong.id} className="list-group-item d-flex align-items-center">
                <div className="me-4 p-1">
                  {ong.foto ? (
                    <img src={ong.foto} alt={ong.nome} className="com-imagem" style={{ objectFit: "cover" }} />
                  ) : (
                    <img src={noImageIcon} alt="Sem imagem" width={80} />
                  )}
                </div>

                <div className="flex-grow-1">
                  <h5 className="mb-1">{ong.nome}</h5>
                </div>

                <div className="ms-auto me-4">
                  <Link to={`/ong/${ong.id}`} className="btn btn-sm btn-custom-unfilled">
                    Ver detalhes
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="list-group-item text-muted py-3">
              <img src={errorIcon} className="mx-2" alt="erro" /> Nenhuma ONG pendente encontrada
            </div>
          )}
        </div>

        {ongs.length > 0 && (
          <nav>
            <ul className="pagination">
              <li className={`page-item ${paginaAtual === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPaginaAtual(paginaAtual - 1)}>Anterior</button>
              </li>
              {Array.from({ length: totalPaginas }, (_, i) => (
                <li key={i} className={`page-item ${paginaAtual === i + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setPaginaAtual(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${paginaAtual === totalPaginas ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPaginaAtual(paginaAtual + 1)}>Próxima</button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </main>
  );
}
