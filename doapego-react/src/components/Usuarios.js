import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Função assíncrona para buscar dados
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:8080/usuarios');
                console.log('Dados recebidos:', response.data);
                setUsuarios(response.data.items); // Atualiza o estado com os dados
                setLoading(false);
            } catch (err) {
                console.error('Erro ao buscar usuários:', err);
                setError(err); // Armazena o erro, se houver
                setLoading(false); // Atualiza o estado de carregamento
            }
        };

        fetchUsuarios(); // Chama a função para buscar dados
    }, []); // O array vazio faz com que o useEffect execute apenas uma vez após o componente ser montado

    // Renderiza a interface
    if (loading) return <p>Carregando...</p>; // Exibe uma mensagem de carregamento
    if (error) return <p>Erro ao carregar os dados: {error.message}</p>; // Exibe mensagem de erro

    return (
        <div className="container-fluid table-responsive">
            <h1>Lista de Usuários</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Ativo</th>
                        <th scope="col">Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(usuarios) && usuarios.length > 0 ? (
                        usuarios.map(usuario => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.ativo ? 'Sim' : 'Não'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Nenhum usuário encontrado</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Usuarios;