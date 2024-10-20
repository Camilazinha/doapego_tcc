import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/layout.css';
import '../../styles/views.css';
import axios from 'axios';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [usuarioId, setUsuarioId] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:8080/usuarios'); // Ajuste a URL conforme necessário
                setUsuarios(response.data.items); // Ajuste conforme a estrutura de dados retornada
                setLoading(false);
            } catch (err) {
                console.error('Erro ao buscar usuários:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/usuarios/${usuarioId}`);
            setUsuarios(usuarios.filter(u => u.id !== usuarioId));
            setShowModal(false);
            alert('Usuário excluído com sucesso!');
        } catch (err) {
            console.error('Erro ao excluir usuário:', err);
            alert('Erro ao excluir usuário. Tente novamente!');
        }
    };

    if (loading) return (
        <div className="table-responsive">
            <div className="borda-view container-fluid my-5 p-4">
                <p className='h2'>Carregando...</p>
                <hr />
            </div>
        </div>
    );
    
    if (error) return (
        <div className="table-responsive">
            <div className="borda-view container-fluid my-5 p-4">
                <p className='h2'>Erro ao carregar os dados:</p>
                <p className='h4' style={{ color: '#4c4c4c' }}>{error.message}</p>
                <hr />
            </div>
        </div>
    );

    return (
        <div className="table-responsive">
            <div className="borda-view container-fluid my-5 p-4">
                <p className='h2'>Gerenciar Usuários</p>
                <Link to={`/usuarios/criar`} style={{ display: 'inline-block' }}>
                    <button className="btn btn-add">+ Novo Usuário</button>
                </Link>

                <hr />

                <table className="table table-bordered table-hover">
                    <thead>
                        <tr className='text-center'>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telefone</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.length > 0 ? (usuarios.map((usuario, index) => (
                            <tr key={usuario.id}>
                                <th className="align-middle text-center" scope="row">{index + 1}</th>
                                <td className="align-middle text-center">{usuario.nome}</td>
                                <td className="align-middle text-center">{usuario.email}</td>
                                <td className="align-middle text-center">{usuario.telefone}</td>
                                <td className="align-middle text-center">
                                    <div className="d-flex justify-content-center">
                                        <Link to={`/usuarios/detalhes/${usuario.id}`}>
                                            <button className="btn btn-info btn-sm mx-1">Ver</button>
                                        </Link>
                                        <Link to={`/usuarios/editar/${usuario.id}`}>
                                            <button className="btn btn-warning btn-sm mx-1">Editar</button>
                                        </Link>
                                        <button className="btn btn-danger btn-sm mx-1" onClick={() => { setUsuarioId(usuario.id); setShowModal(true); }}>Excluir</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">Nenhum usuário encontrado</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmar exclusão</h5>
                            </div>
                            <div className="modal-body">
                                <p>Você tem certeza que deseja excluir o usuário <strong>{usuarios.find(u => u.id === usuarioId)?.nome}</strong>?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="button" className="btn btn-danger" onClick={handleDelete}>Excluir</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Usuarios;
