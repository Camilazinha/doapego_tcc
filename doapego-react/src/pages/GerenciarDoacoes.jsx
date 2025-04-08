import React, { useState } from 'react';

export default function GerenciarDoacoes() {

  const doacoes = [
    { id: 1, nome: "Carrinho", status: "pendente" },
    { id: 2, nome: "Boneca", status: "aceita" },
    { id: 3, nome: "Quebra-Cabeça", status: "recusada" },
    { id: 4, nome: "Urso de Pelúcia", status: "pendente" },
    { id: 5, nome: "Urso de Pelúcia", status: "pendente" },
    { id: 6, nome: "Urso de Pelúcia", status: "pendente" },
    { id: 7, nome: "Urso de Pelúcia", status: "pendente" },
    { id: 8, nome: "Urso de Pelúcia", status: "pendente" },
    { id: 9, nome: "Urso de Pelúcia", status: "pendente" },
    { id: 10, nome: "Urso de Pelúcia", status: "pendente" },
    { id: 14, nome: "Urso de Pelúcia", status: "pendente" },
    { id: 41, nome: "Urso de Pelúcia", status: "pendente" },
    { id: 411, nome: "Urso de Pelúcia", status: "pendente" },
    { id: 4111, nome: "Urso de Pelúcia", status: "pendente" },
    { id: 141, nome: "Urso de Pelúcia", status: "pendente" },
    { id: 1141, nome: "Urso de Pelúcia", status: "pendente" },
    { id: 11, nome: "Urso de Pelúcia", status: "pendente" },
    { id: 1114, nome: "Urso de Pelúcia", status: "pendente" },
    { id: 11114, nome: "Urso de Pelúcia", status: "pendente" },
    { id: 41111111111111, nome: "Urso de Pelúcia", status: "pendente" },
    { id: 0, nome: "Urso de Pelúcia", status: "pendente" },
  ];

  const itensPorPagina = 5;
  const [abaAtiva, setAbaAtiva] = useState("pendente");
  const [paginaAtual, setPaginaAtual] = useState(1);

  const doacoesFiltradas = doacoes.filter((d) => d.status === abaAtiva);
  const totalPaginas = Math.ceil(doacoesFiltradas.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const itensAtuais = doacoesFiltradas.slice(indiceInicial, indiceInicial + itensPorPagina);

  return (
    <main>
      <div className='container my-5'>
        <h2 className="titulo-pagina">GERENCIAR DOAÇÕES</h2>

        {["pendente", "aceita", "recusada"].map((status) => (
          <button
            key={status}
            onClick={() => {
              setAbaAtiva(status);
              setPaginaAtual(1); // Resetar para primeira página ao mudar de aba
            }}
            className={`px-4 py-2 border ${abaAtiva === status ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {status.toUpperCase()}
          </button>
        ))}
      </div>

      <div>
        {itensAtuais.map((doacao) => (
          <div key={doacao.id} className="border p-2 mb-2">
            {doacao.nome}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button onClick={() => setPaginaAtual(paginaAtual - 1)} disabled={paginaAtual === 1}>
          Anterior
        </button>
        <span> Página {paginaAtual} de {totalPaginas} </span>
        <button onClick={() => setPaginaAtual(paginaAtual + 1)} disabled={paginaAtual === totalPaginas}>
          Próxima
        </button>
      </div>

      <div id="filter-container" className="d-flex justify-content-center mt-4">
        <a href="pendentes.html">
          <button id="btn-pendentes" className="filter-btn btn active" onclick="setActiveFilter(this)">Pendentes</button></a>
        <a href="aceitos.html">
          <button id="btn-aceitos" className="filter-btn btn mx-2" onclick="setActiveFilter(this)">Aceitos</button></a>
        <a href="recusados.html">
          <button id="btn-recusados" className="filter-btn btn" onclick="setActiveFilter(this)">Recusados</button></a>
      </div>

      <div className="container">
        <div id="donation-pending-container" className="row">
          <div id="donation-card" className="col-12 d-flex flex-column flex-md-row align-items-center p-3 mb-3">
            <img id="donation-image" src="../img/brinquedo.jpg" alt="Foto do brinquedo" className="img-fluid" />
            <div id="donation-info" className="ms-md-3 mt-2 mt-md-0">
              <h5 id="donation-title">Caminhãozinho</h5>
              <p id="donation-category">Categoria: Carrinhos &amp; Automóveis</p>
              <p id="donation-description">Caminhão de brinquedo da marca Happy&amp; em ótimo estado.</p>
              <div id="button-container" className="d-flex justify-content-end mt-3">
                <a href="doacao.html">
                  <button id="details-button" className="btn btn-primary">Ver detalhes</button></a>
              </div>
            </div>
          </div>
        </div>

        <div id="donation-pending-container" className="row">
          <div id="donation-card" className="col-12 d-flex flex-column flex-md-row align-items-center p-3 mb-3">
            <img id="donation-image" src="../img/brinquedo.jpg" alt="Foto do brinquedo" className="img-fluid" />
            <div id="donation-info" className="ms-md-3 mt-2 mt-md-0">
              <h5 id="donation-title">Caminhãozinho</h5>
              <p id="donation-category">Categoria: Carrinhos &amp; Automóveis</p>
              <p id="donation-description">Caminhão de brinquedo da marca Happy&amp; em ótimo estado.</p>
              <div id="button-container" className="d-flex justify-content-end mt-3">
                <a href="doacao.html">
                  <button id="details-button" className="btn btn-primary">Ver detalhes</button></a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main >
  );
};
