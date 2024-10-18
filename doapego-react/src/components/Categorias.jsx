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
                setCategorias(response.data.items); // Atualiza o estado com os dados
                setLoading(false);
            } catch (err) {
                console.error('Erro ao buscar categorias:', err);
                setError(err); // Armazena o erro, se houver
                setLoading(false);
            }
        };

        fetchCategorias(); // Chama a função para buscar dados
    }, []);

    // Renderiza a interface
    if (loading) return <p>Carregando...</p>; 
    if (error) return <p>Erro ao carregar os dados: {error.message}</p>;

    return (
        <div className="container-fluid table-responsive">
            <h1>Lista de Categorias de Brinquedos</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Foto</th>
                        <th scope="col">Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.length > 0 ? (
                        categorias.map((categoria, index) => (
                            <tr key={categoria.id}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    {categoria.foto ? (
                                        <img src={categoria.foto} alt={`Foto de ${categoria.nome}`} width="50" />
                                    ) : (
                                        'Sem foto'
                                    )}
                                </td>
                                <td>{categoria.nome}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Nenhuma categoria encontrada</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Categorias;
