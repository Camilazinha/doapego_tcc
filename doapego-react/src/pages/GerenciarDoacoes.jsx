//src/pages/GerenciarDoacoes.jsx

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import noImageIcon from "../img/noimage-icon.svg"
import errorIcon from "../img/errorexclamation-icon.svg"
import errorTriangleIcon from "../img/errortriangle-icon.svg"

export default function GerenciarDoacoes() {

  const userType = localStorage.getItem('tipo') || ''
  const userOngId = Number(localStorage.getItem('ongId')) || null
  const [doacoes, setDoacoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [abaAtiva, setAbaAtiva] = useState("PENDENTE")
  const [paginaAtual, setPaginaAtual] = useState(1)
  const itensPorPagina = 5

  useEffect(() => {

    const fetchDoacoes = async () => {

      try {
        if (userType === "MASTER") {
          const response = await axios.get("http://localhost:8080/doacoes?sortDirection=asc&status=ANALISE")
          setDoacoes(response.data.items || response.data) // Ajuste conforme a estrutura da sua API
        }
        else {
          const response = await axios.get(`http://localhost:8080/doacoes?sortDirection=asc&ongId=${userOngId}`)
          setDoacoes(response.data.items || response.data) // Ajuste conforme a estrutura da sua API
        }
        setLoading(false)
      }
      catch (err) {
        console.error("Erro ao buscar doações:", err)

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
    }

    fetchDoacoes()
  }, [userOngId, userType])

  const doacoesFiltradas = userType === "MASTER"
    ? doacoes // mostra todas as doações para master (já estão filtradas por status=ANALISE na API)
    : doacoes.filter((d) => d["status"] === abaAtiva)

  // Paginação
  const totalPaginas = Math.ceil(doacoesFiltradas.length / itensPorPagina)
  const indiceInicial = (paginaAtual - 1) * itensPorPagina
  const itensAtuais = doacoesFiltradas.slice(indiceInicial, indiceInicial + itensPorPagina)


  if (loading)
    return (
      <main>
        <div className="container my-5 nao-unico-elemento">
          <h2 className="titulo-pagina mb-5">GERENCIAR DOAÇÕES</h2>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <div className="spinner-border text-secondary m-3" role="status" style={{ width: "3rem", height: "3rem" }}></div>
            <p className="loading-text">Carregando...</p>
          </div>
        </div>
      </main>
    )

  if (error)
    return (
      <main>
        <div className="container my-5 nao-unico-elemento">
          <h2 className="titulo-pagina mb-5">GERENCIAR DOAÇÕES</h2>

          <div className="alert alert-danger d-flex">
            <img src={errorTriangleIcon} className="me-2" alt="" />
            {error
              ? <p className="erro">{error}</p>
              : null}
          </div>
        </div>
      </main>
    )

  return (
    <main>
      <div className="container my-5 nao-unico-elemento">
        <h2 className="titulo-pagina mb-5">GERENCIAR DOAÇÕES</h2>

        {["FUNCIONARIO", "STAFF"].includes(userType) && (
          <ul className="nav nav-tabs mb-4 justify-content-center">
            {["PENDENTE", "COLETADA", "RECUSADA"].map((status) => (
              <li className="nav-item" key={status}>
                <button
                  className={`nav-link ${abaAtiva === status ? "active" : ""}`}
                  onClick={() => {
                    setAbaAtiva(status)
                    setPaginaAtual(1) // Resetar a página ao trocar de aba
                  }}
                >
                  {status}
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="list-group mb-5">
          {itensAtuais.length > 0 ? (
            itensAtuais.map((doacao) => (
              <div key={doacao.id} className="list-group-item d-flex align-items-center">

                <div className="me-4 p-1">
                  {doacao.arquivosDoacao?.some(a => a.tipo === 'FOTO') ? (
                    <img
                      src={doacao.arquivosDoacao.find(a => a.tipo === 'FOTO')?.link || noImageIcon}
                      alt={doacao.nome}
                      className="rounded-circle shadow-sm"
                      style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    />
                  ) : (
                    <div className="d-flex align-items-center justify-content-center">
                      <img src={noImageIcon} alt="Sem imagem" width={80} />
                    </div>
                  )}
                </div>

                <div className="flex-grow-1">
                  <h5 className="mb-0 mt-2 doacao-nome">{doacao.nome}</h5>
                  <p className="mb-0">
                    <Link to="/configuracoes/categorias-doacao">
                      <span className="badge tag-categoria">
                        {doacao.categoriaDoacao || "Não especificada"}
                      </span>
                    </Link>
                  </p>
                </div>

                <div className="ms-auto me-4">
                  <Link to={`/gerenciar-doacoes/${doacao.id}`} className="btn btn-sm btn-custom-unfilled">Checar</Link>
                </div>
              </div>
            ))
          ) : (
            <div className="list-group-item text-muted py-3"><img src={errorIcon} className="mx-2" alt="erro" /> Nenhuma doação encontrada</div>
          )}
        </div>

        {["FUNCIONARIO", "STAFF"].includes(userType) &&
          doacoesFiltradas.length > 0 && (
            <nav>
              <ul className="pagination">
                <li className={`page-item ${paginaAtual === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setPaginaAtual(paginaAtual - 1)}>
                    Anterior
                  </button>
                </li>

                {Array.from({ length: totalPaginas }, (_, i) => (
                  <li key={i} className={`page-item ${paginaAtual === i + 1 ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setPaginaAtual(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${paginaAtual === totalPaginas ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setPaginaAtual(paginaAtual + 1)}>
                    Próxima
                  </button>
                </li>
              </ul>
            </nav>
          )
        }


      </div>
    </main>
  )
}
