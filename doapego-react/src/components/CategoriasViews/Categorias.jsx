import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('http://localhost:8080/categorias-doacao');
                console.log('Dados recebidos:', response.data);
                setCategorias(response.data.items);
                setLoading(false);
            } catch (err) {
                console.error('Erro ao buscar categorias:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchCategorias();
    }, []);

    // Renderiza a interface
    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar os dados: {error.message}</p>;

    return (
        <div className="container mt-4">
            <p className="text-center h3 mb-4">Lista de Categorias de Brinquedos</p>
            <div className>
                <table className="table table-bordered table-striped table-hover">
                    <thead className>
                        <tr>
                            <th className="text-center" scope="col">#</th>
                            <th className="text-center" scope="col">Foto</th>
                            <th className="text-center" scope="col">Nome</th>
                            <th className="text-center" scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.length > 0 ? (
                            categorias.map((categoria, index) => (
                                <tr key={categoria.id}>
                                    <th className="align-middle text-center" scope="row">{index + 1}</th>
                                    <td className="text-center align-middle">
                                        {categoria.foto ? (
                                            <img
                                                src={categoria.foto}
                                                alt={`Foto de ${categoria.nome}`}
                                                width="70"
                                                height="70"
                                                style={{ objectFit: 'cover', borderRadius: '8px' }} // Mantém a imagem centrada e arredonda bordas
                                            />
                                        ) : (
                                            'Sem foto'
                                        )}
                                    </td>
                                    <td className="align-middle text-center">{categoria.nome}</td>
                                    <td className="align-middle text-center">
                                        <div className="d-flex justify-content-center">
                                            <button className="btn btn-info btn-sm mx-1">
                                                Ver
                                            </button>
                                            <button className="btn btn-warning btn-sm mx-1">
                                                Editar
                                            </button>
                                            <button className="btn btn-danger btn-sm mx-1">
                                                Excluir
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">Nenhuma categoria encontrada</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Categorias;
