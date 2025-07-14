// src/pages/Solicitacoes.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

import noImageIcon from "../img/noimage-icon.svg";
import copyIcon from "../img/copy-icon.svg";
import viewIcon from "../img/view-icon.svg";
import errorTriangleIcon from "../img/errortriangle-icon.svg";
import successIcon from "../img/success-icon.svg";

export default function Solicitacoes() {
  // Mock de dados estáticos
  const mockOngs = [
    {
      id: 1,
      nome: "ONG Esperança Viva",
      email: "contato@esperancaviva.org.br",
      fotoPerfil: "https://exemplo.com/foto1.jpg"
    },
    {
      id: 2,
      nome: "Projeto Sorriso",
      email: "projetosorriso@ong.org",
      fotoPerfil: null
    },
    {
      id: 3,
      nome: "Mãos Solidárias",
      email: "contato@maossolidarias.org",
      fotoPerfil: "https://exemplo.com/foto3.jpg"
    },
    {
      id: 4,
      nome: "Instituto Luz",
      email: "luz@institutoluz.com.br",
      fotoPerfil: null
    },
    {
      id: 5,
      nome: "Associação Vida Nova",
      email: "vidanova@associacao.org",
      fotoPerfil: "https://exemplo.com/foto5.jpg"
    },
    // Adicione mais 15 itens para testar paginação
    ...Array.from({ length: 15 }, (_, i) => ({
      id: i + 6,
      nome: `ONG Exemplo ${i + 6}`,
      email: `ong${i + 6}@exemplo.com`,
      fotoPerfil: i % 3 === 0 ? `https://exemplo.com/foto${i + 6}.jpg` : null
    }))
  ];

  const [ongs] = useState(mockOngs);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  const handleCopyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      setSuccess("E-mail copiado com sucesso.");
      setError(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Falha ao copiar e-mail");
      setSuccess(null);
      setTimeout(() => setError(null), 3000);
    }
  };

  // Cálculos de paginação
  const totalPaginas = Math.ceil(ongs.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const itensAtuais = ongs.slice(indiceInicial, indiceInicial + itensPorPagina);

  return (
    <main>
      {error && (
        <div className="alert alert-danger d-flex align-items-start popup-alert">
          <img src={errorTriangleIcon} className="me-2" alt="erro" />
          <div className='ms-1'>
            <p className="fw-semibold alert-heading">Erro!</p>
            <p className="mb-0">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="alert alert-success d-flex align-items-start popup-alert">
          <img src={successIcon} className="me-2" alt="sucesso" />
          <div className='ms-1'>
            <p className="fw-semibold alert-heading">Sucesso!</p>
            <p className="mb-0">{success}</p>
          </div>
        </div>
      )}

      <div className="container my-5 nao-unico-elemento">
        <h2 className="titulo-pagina mb-5">GERENCIAR SOLICITAÇÕES</h2>

        <section className='p-4'>
          <div className="table-responsive mb-2">
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
                          <img
                            src={noImageIcon}
                            alt="Sem imagem"
                            style={{ width: "80px", height: "80px" }}
                          />
                        </div>
                      )}
                    </td>
                    <td>{ong.nome}</td>
                    <td>{ong.email}</td>
                    <td>
                      <Link to={`/configuracoes/ongs/detalhes/${ong.id}`}>
                        <button className="btn btn-sm btn-custom-view mx-1">
                          <img src={viewIcon} alt="Ver detalhes" className="me-1" />
                          Checar
                        </button>
                      </Link>
                      <button
                        onClick={() => handleCopyEmail(ong.email)}
                        className="btn btn-sm btn-custom-edit mx-1"
                      >
                        <img src={copyIcon} alt="Copiar e-mail" className="me-1" />
                        Copiar e-mail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table></div>

          {ongs.length > itensPorPagina && (
            <nav>
              <ul className="pagination justify-content-center">
                <li className={`page-item ${paginaAtual === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setPaginaAtual(p => Math.max(1, p - 1))}
                  >
                    Anterior
                  </button>
                </li>

                {Array.from({ length: Math.min(5, totalPaginas) }, (_, i) => {
                  const pagina = paginaAtual <= 3
                    ? i + 1
                    : paginaAtual >= totalPaginas - 2
                      ? totalPaginas - 4 + i
                      : paginaAtual - 2 + i;

                  return (
                    <li
                      key={i}
                      className={`page-item ${paginaAtual === pagina ? "active" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setPaginaAtual(pagina)}
                      >
                        {pagina}
                      </button>
                    </li>
                  );
                })}

                <li className={`page-item ${paginaAtual === totalPaginas ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setPaginaAtual(p => Math.min(totalPaginas, p + 1))}
                  >
                    Próxima
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </section>
      </div>
    </main>
  );
}