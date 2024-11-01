// src/components/Admin.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/layout.css';
import '../../styles/views.css';
import axios from 'axios';

const Admin = () => {
    const [administradores, setAdministradores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [adminId, setAdminId] = useState(null);

    useEffect(() => {
        const fetchAdministradores = async () => {
            try {
                const response = await axios.get('http://localhost:8080/administradores?sortDirection=asc');
                setAdministradores(response.data.items);
                setLoading(false);
            } catch (err) {
                console.error('Erro ao buscar administradores:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchAdministradores();
    }, []);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/administradores/${adminId}`);
            setAdministradores(administradores.filter(a => a.id !== adminId));
            setShowModal(false);
            alert('Administrador excluído com sucesso!');
        } catch (err) {
            console.error('Erro ao excluir administrador:', err);
            alert('Erro ao excluir administrador. Tente novamente!');
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
                <p className='h2'>Administradores</p>
                <hr />

                <table className="table table-bordered table-hover">
                    <thead>
                        <tr className='text-center'>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {administradores.length > 0 ? (administradores.map((admin) => (
                            <tr key={admin.id}>
                                <th className="align-middle text-center" scope="row">{admin.id}</th>
                                <td className="align-middle text-center">{admin.nome}</td>
                                <td className="align-middle text-center">{admin.email}</td>
                                <td className="align-middle text-center">{admin.tipo}</td>
                                <td className="align-middle text-center">
                                    <div className="d-flex justify-content-center">
                                        <Link to={`/administradores/detalhes/${admin.id}`}>
                                            <button className="btn btn-details-views btn-sm mx-1">Ver</button>
                                        </Link>
                                        <button className="btn btn-danger btn-sm mx-1" onClick={() => { setAdminId(admin.id); setShowModal(true); }}>Excluir</button>
                                    </div>
                                </td>
                            </tr>
                        ))) : (
                            <tr>
                                <td colSpan="6" className="text-center">Nenhum administrador encontrado</td>
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
                                <p>Você tem certeza que deseja excluir o administrador <strong>{administradores.find(a => a.id === adminId)?.nome}</strong>?</p>
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

export default Admin;
