//src/pages/Teste.jsx

import { useState } from "react";
import { Link } from 'react-router-dom';

// import noImageIcon from "../img/noimage-icon.svg"
import errorIcon from "../img/errorexclamation-icon.svg"
import indexPic from "../img/imagem-teste.jpg"

export default function Teste() {
    const doacoes = [
        { id: 1, nome: "Carrinho", status: "pendente" },
        { id: 2, nome: "Boneca", status: "aceita" },
        { id: 3, nome: "Quebra-Cabeça", status: "recusada" },
        { id: 4, nome: "Urso de Pelúcia", status: "pendente" },
        { id: 5, nome: "Urso de Pelúcia", status: "pendente", categoria: "Boneco" },
        { id: 6, nome: "Urso de Pelúcia", status: "pendente", categoria: "Pelúcia" },
        { id: 7, nome: "Urso de Pelúcia", status: "pendente" },
        { id: 8, nome: "Urso de Pelúcia", status: "pendente" },
        { id: 9, nome: "Urso de Pelúcia", status: "pendente" },
        { id: 10, nome: "Urso de Pelúcia", status: "pendente" },
    ];

    const [abaAtiva, setAbaAtiva] = useState("pendente");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 3;

    // Filtrar doações por aba ativa
    const doacoesFiltradas = doacoes.filter((d) => d.status === abaAtiva);

    // Paginação
    const totalPaginas = Math.ceil(doacoesFiltradas.length / itensPorPagina);
    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const itensAtuais = doacoesFiltradas.slice(indiceInicial, indiceInicial + itensPorPagina);

    return (
        <div className="container my-5 nao-unico-elemento">
            <h2 className="titulo-pagina mb-5">GERENCIAR DOAÇÕES</h2>

            {/* Tabs do Bootstrap */}
            <ul className="nav nav-tabs mb-4">
                {["PENDENTE", "COLETADA", "RECUSADA"].map((status) => (
                    <li className="nav-item" key={status}>
                        <button
                            className={`nav-link ${abaAtiva === status ? "active" : ""}`}
                            onClick={() => {
                                setAbaAtiva(status);
                                setPaginaAtual(1); // Resetar a página ao trocar de aba
                            }}
                        >
                            {status}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="list-group mb-5">
                {itensAtuais.length > 0 ? (
                    itensAtuais.map((doacao) => (
                        <div key={doacao.id} className="list-group-item d-flex align-items-center">

                            {/* Foto da doação */}
                            <div className="me-4 p-1">
                                <img src={indexPic} alt="Sem imagem" className="com-imagem" />
                            </div>

                            {/* Informações da doação */}
                            <div className="flex-grow-1">
                                <h5 className="mb-1">{doacao.nome}</h5>
                                <p className="mb-0">
                                    <Link to="/configuracoes/categorias-doacao"><span className="badge tag-categoria">{doacao.categoria || "Não especificada"}</span></Link>
                                </p>
                            </div>
                            <div className="ms-auto me-4">
                                <button className="btn btn-custom-unfilled">Checar</button>
                            </div>
                        </div>

                    ))
                ) : (
                    <div className="list-group-item text-muted py-3"><img src={errorIcon} alt="" className="mx-2"></img> Nenhuma doação encontrada</div>
                )}

            </div>


            {/* Paginação */}
            <nav>
                <ul className="pagination mb-5">
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
        </div>
    );
}
