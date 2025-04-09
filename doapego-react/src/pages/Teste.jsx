import { useState } from "react";

export default function Teste() {
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
    ];

    const [abaAtiva, setAbaAtiva] = useState("pendente");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 1;

    // Filtrar doações por aba ativa
    const doacoesFiltradas = doacoes.filter((d) => d.status === abaAtiva);

    // Paginação
    const totalPaginas = Math.ceil(doacoesFiltradas.length / itensPorPagina);
    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const itensAtuais = doacoesFiltradas.slice(indiceInicial, indiceInicial + itensPorPagina);

    return (
        <div className="container my-5">
            <h2 className="titulo-pagina mb-5">GERENCIAR DOAÇÕES</h2>

            {/* Tabs do Bootstrap */}
            <ul className="nav nav-tabs mb-4">
                {["pendente", "aceita", "recusada"].map((status) => (
                    <li className="nav-item" key={status}>
                        <button
                            className={`nav-link ${abaAtiva === status ? "active" : ""}`}
                            onClick={() => {
                                setAbaAtiva(status);
                                setPaginaAtual(1); // Resetar a página ao trocar de aba
                            }}
                        >
                            {status.toUpperCase()}
                        </button>
                    </li>
                ))}
            </ul>

            {/* Lista de Doações */}
            <ul className="list-group mb-3">
                {itensAtuais.length > 0 ? (
                    itensAtuais.map((doacao) => (
                        <li key={doacao.id} className="list-group-item">
                            {doacao.nome}
                        </li>
                    ))
                ) : (
                    <li className="list-group-item text-muted">Nenhuma doação encontrada</li>
                )}
            </ul>

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
