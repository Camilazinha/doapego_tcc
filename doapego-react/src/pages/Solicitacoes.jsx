//src/pages/Solicitacoes.jsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import noImageIcon from "../img/noimage-icon.svg";
import copyIcon from "../img/copy-icon.svg";
import viewIcon from "../img/view-icon.svg"
import errorTriangleIcon from "../img/errortriangle-icon.svg";
import successIcon from "../img/success-icon.svg"; // Você precisa ter este ícone

export default function Solicitacoes() {
  const [ongs, setOngs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  const handleCopyEmail = async (email) => {
    await navigator.clipboard.writeText(email);
    setSuccessMessage("E-mail copiado com sucesso!");

    // Remove a mensagem após 3 segundos
    setTimeout(() => {
      setSuccessMessage(null);
    }, 2000);
  }

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
          alert("Erro ao carregar os dados. Tente novamente mais tarde.")

        } else if (err.request) {
          setError("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.")
          alert("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.")

        } else {
          setError("Ocorreu um erro inesperado.")
          alert("Ocorreu um erro inesperado.")

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
      <div className="container my-5 nao-unico-elemento">
        <h2 className="titulo-pagina mb-5">GERENCIAR SOLICITAÇÕES</h2>

        {successMessage && (
          <div className="alert alert-success d-flex align-items-center mb-4">
            <img src={successIcon} className="me-2" alt="Sucesso" width="24" />
            <span>{successMessage}</span>
          </div>
        )}
        <section className='p-4'>
          <table className="table table-bordered table-hover">
            <thead className='table-light'>
              <tr className='text-center'>
                <th>Foto</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {itensAtuais.map(ong => (
                <tr key={ong.id} className='text-center align-middle'>
                  <td>
                    {ong.fotoPerfil ? (
                      <img
                        src={ong.fotoPerfil}
                        alt=""
                        className="rounded-circle shadow-sm"
                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                      />
                    ) : (
                      <div className="d-flex align-items-center justify-content-center">
                        <img src={noImageIcon} alt="Sem imagem" width={80} />
                      </div>
                    )}
                  </td>
                  <td>{ong.nome}</td>
                  <td>
                    {ong.email}
                  </td>
                  <td>
                    <Link
                      to={`/configuracoes/ongs/detalhes/${ong.id}`}>
                      <button className="btn btn-sm btn-custom-view mx-1">
                        <img src={viewIcon} alt="" className="me-1" />
                        Checar
                      </button>
                    </Link>
                    <button onClick={() => handleCopyEmail(ong.email)} className="btn btn-sm btn-custom-edit mx-1">
                      <img src={copyIcon} alt="" className="me-1" />Copiar e-mail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
        </section>

      </div>
    </main>
  );
}
