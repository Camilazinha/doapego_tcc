import React, { useEffect, useState } from 'react';
import '../../styles/layout.css';
import '../../styles/views.css';

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
        <div className="borda-view container-fluid mt-4 p-4">
            <p className='h2'>Categorias de Brinquedos</p>
            <hr />
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr className='text-center'>
                            <th scope="col">#</th>
                            <th scope="col">Foto</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Ações</th>
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
                                                style={{ objectFit: 'cover', borderRadius: '8px' }}
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
    );
};

export default Categorias;
