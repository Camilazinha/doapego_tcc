import { useState } from "react";

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

const itemsPerPage = 5;

const Teste = () => {
    const [abaAtiva, setAbaAtiva] = useState("pendente");
    const [currentPage, setCurrentPage] = useState(1);

    const doacoesFiltradas = doacoes.filter((d) => d.status === abaAtiva);
    const totalPages = Math.ceil(doacoesFiltradas.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = doacoesFiltradas.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div>
            {/* Tabs */}
            <div className="flex space-x-2 mb-4">
                {["pendente", "aceita", "recusada"].map((status) => (
                    <button
                        key={status}
                        onClick={() => {
                            setAbaAtiva(status);
                            setCurrentPage(1); // Resetar para primeira página ao mudar de aba
                        }}
                        className={`px-4 py-2 border ${abaAtiva === status ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    >
                        {status.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Lista de doações */}
            <div>
                {currentItems.map((doacao) => (
                    <div key={doacao.id} className="border p-2 mb-2">
                        {doacao.nome}
                    </div>
                ))}
            </div>

            {/* Paginação */}
            <div className="mt-4">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Anterior
                </button>
                <span> Página {currentPage} de {totalPages} </span>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Próxima
                </button>
            </div>
        </div>
    );
};

export default Teste;
