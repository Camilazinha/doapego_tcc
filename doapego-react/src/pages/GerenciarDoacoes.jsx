import { useState, useEffect } from "react"
import axios from "axios"

import noImageIcon from "../img/noimage-icon.svg"
import errorIcon from "../img/errorexclamation-icon.svg"


export default function GerenciarDoacoes() {
  // Estados para armazenar os dados e controlar o carregamento
  const [doacoes, setDoacoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [abaAtiva, setAbaAtiva] = useState("PENDENTE")
  const [paginaAtual, setPaginaAtual] = useState(1)
  const itensPorPagina = 5

  // Efeito para buscar os dados da API
  useEffect(() => {
    const fetchDoacoes = async () => {
      try {
        // Fazendo a requisição para o endpoint de doações
        const response = await axios.get("http://localhost:8080/doacoes?sortDirection=asc")
        setDoacoes(response.data.items || response.data) // Ajuste conforme a estrutura da sua API
        setLoading(false)
      } catch (err) {
        console.error("Erro ao buscar doações:", err)

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
    }

    fetchDoacoes()
  }, []) // Array vazio significa que o efeito só roda uma vez, quando o componente monta

  // Filtrar doações por aba ativa usando o campo status-doacao
  const doacoesFiltradas = doacoes.filter((d) => d["status"] === abaAtiva)

  // Paginação
  const totalPaginas = Math.ceil(doacoesFiltradas.length / itensPorPagina)
  const indiceInicial = (paginaAtual - 1) * itensPorPagina
  const itensAtuais = doacoesFiltradas.slice(indiceInicial, indiceInicial + itensPorPagina)

  // Renderização condicional para estados de carregamento e erro

  if (loading)
    return (
      <div className="container my-5 nao-unico-elemento">
        <h2 className="titulo-pagina mb-5">GERENCIAR DOAÇÕES</h2>
        <div className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "200px" }}>
          <div className="spinner-border text-secondary m-3" role="status" style={{ width: "3rem", height: "3rem" }}></div>
          <p className="loading-text">Carregando...</p>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="container my-5 nao-unico-elemento">
        <h2 className="titulo-pagina mb-5">GERENCIAR DOAÇÕES</h2>

        <div className="alert alert-danger">
          {error
            ? <p className="erro">{error}</p>
            : null}
        </div>
      </div>
    )

  return (
    <main>
      <div className="container my-5 nao-unico-elemento">
        <h2 className="titulo-pagina mb-5">GERENCIAR DOAÇÕES</h2>

        {/* Tabs do Bootstrap */}
        <ul className="nav nav-tabs mb-4">
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

        {/* Lista de Doações com mais detalhes */}

        <div className="list-group mb-5">
          {itensAtuais.length > 0 ? (
            itensAtuais.map((doacao) => (
              <div key={doacao.id} className="list-group-item d-flex align-items-center">
                {/* Foto da doação */}
                <div className="me-4 p-1">
                  {doacao.foto ? (
                    <img
                      src={doacao.foto || "/placeholder.svg"}
                      alt={doacao.nome}
                      width="120"
                      height="120"
                      style={{ objectFit: "cover", borderRadius: ".5rem" }}
                    />
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ width: "7.5rem", height: "7.5rem", borderRadius: ".5rem" }}
                    >
                      <img src={noImageIcon} alt="Sem imagem" width={80} />
                    </div>
                  )}
                </div>

                {/* Informações da doação */}
                <div className="flex-grow-1">
                  <h5 className="mb-1">{doacao.nome}</h5>
                  <p className="mb-0">
                    <span className="badge tag-categoria">Categoria: {doacao.categoria || "Não especificada"}</span>
                  </p>
                </div>

                <div className="ms-auto me-4">
                  <button className="btn btn-sm btn-custom-unfilled">Ver</button>
                  {/* {abaAtiva === "PENDENTE" && (
                  <>
                    <button className="btn btn-sm btn-success me-2">Aceitar</button>
                    <button className="btn btn-sm btn-danger">Recusar</button>
                  </>
                )} */}
                </div>
              </div>
            ))
          ) : (
            <div className="list-group-item text-muted py-3"><img src={errorIcon} className="mx-2"></img> Nenhuma doação encontrada</div>
          )}
        </div>

        {/* Paginação - só mostrar se houver itens */}
        {doacoesFiltradas.length > 0 && (
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
        )}
      </div>
    </main>
  )
}
