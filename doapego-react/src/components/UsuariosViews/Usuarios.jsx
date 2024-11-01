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
                const response = await axios.get('http://localhost:8080/usuarios');
                setUsuarios(response.data.items); 
                setLoading(false);
            } catch (err) {
                console.error('Erro ao buscar usuários:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

    const handleSuspend = async () => {
        try {
            // Faz um GET para pegar os dados do usuário pelo ID
            const response = await axios.get(`http://localhost:8080/usuarios/${usuarioId}`);
            const usuario = response.data;
    
            // Alterna o status 'ativo'
            const novoStatus = !usuario.ativo;
    
            // Cria o novo objeto com o status atualizado
            const usuarioAtualizado = {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                senha: usuario.senha,  // 
                telefone: usuario.telefone,
                ativo: novoStatus,
                cep: usuario.cep,
                estado: usuario.estado,
                cidade: usuario.cidade,
                bairro: usuario.bairro,
                numero: usuario.numero,
                logradouro: usuario.logradouro,
                complemento: usuario.complemento,
                latitude: usuario.latitude, 
                longitude: usuario.longitude
            };
    
            // Faz um PUT enviando o objeto completo com o novo status
            await axios.put(`http://localhost:8080/usuarios/${usuarioId}`, usuarioAtualizado);
    
            // Atualiza o estado do frontend para refletir a mudança
            setUsuarios(usuarios.map(u => u.id === usuarioId ? { ...u, ativo: novoStatus } : u));
            setShowModal(false);
            alert(`Usuário ${novoStatus ? 'reativado' : 'suspenso'} com sucesso!`);
        } catch (err) {
            console.error('Erro ao suspender usuário:', err);
            alert('Erro ao suspender usuário. Tente novamente!');
        }
    };
    
    
    if (loading) return (
        <div className="table-responsive">
            <div className="borda-view container-fluid mt-5 p-4">
                <p className='h2'>Carregando...</p>
                <hr />
            </div>
        </div>
    );
    
    if (error) return (
        <div className="table-responsive">
            <div className="borda-view container-fluid mt-5 p-4">
                <p className='h2'>Erro ao carregar os dados:</p>
                <p className='h4' style={{ color: '#4c4c4c' }}>{error.message}</p>
                <hr />
            </div>
        </div>
    );

    return (
        <div className="table-responsive">
            <div className="borda-view container-fluid mt-5 p-4">
                <p className='h2'>Gerenciar Usuários</p>
                <hr />

                <table className="table table-bordered table-hover">
                    <thead>
                        <tr className='text-center'>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Status</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.length > 0 ? (usuarios.map((usuario, index) => (
                            <tr key={usuario.id}>
                                <th className="align-middle text-center" scope="row">{index + 1}</th>
                                <td className="align-middle text-center">{usuario.nome}</td>
                                <td className="align-middle text-center">{usuario.email}</td>
                                <td className="align-middle text-center">
                                    {usuario.ativo ? 'Ativo' : 'Suspenso'}
                                </td>
                                <td className="align-middle text-center">
                                    <div className="d-flex justify-content-center">
                                        <Link to={`/usuarios/detalhes/${usuario.id}`}>
                                            <button className="btn btn-info btn-sm mx-1">Detalhes</button>
                                        </Link>
                                        <button className="btn btn-danger btn-sm mx-1" onClick={() => { setUsuarioId(usuario.id); setShowModal(true); }}>
                                            {usuario.ativo ? 'Suspender' : 'Reativar'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">Nenhum usuário encontrado</td>
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
                                <h5 className="modal-title">Confirmar ação</h5>
                            </div>
                            <div className="modal-body">
                                <p>Você tem certeza que deseja {usuarios.find(u => u.id === usuarioId)?.ativo ? 'suspender' : 'reativar'} o usuário <strong>{usuarios.find(u => u.id === usuarioId)?.nome}</strong>?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="button" className="btn btn-danger" onClick={handleSuspend}>
                                    {usuarios.find(u => u.id === usuarioId)?.ativo ? 'Suspender' : 'Reativar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Usuarios;
