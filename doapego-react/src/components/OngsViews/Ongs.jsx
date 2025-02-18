import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const ONGs = () => {
    const [ongs, setOngs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [ongId, setOngId] = useState(null);

    useEffect(() => {
        const fetchOngs = async () => {
            try {
                const response = await axios.get('http://localhost:8080/ongs?sortDirection=asc');
                setOngs(response.data.items);
                setLoading(false);
            } catch (err) {
                console.error('Erro ao buscar ONGs:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchOngs();
    }, []);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/ongs/${ongId}`);
            setOngs(ongs.filter(o => o.id !== ongId));
            setShowModal(false);
            alert('ONG excluída com sucesso!');
        } catch (err) {
            console.error('Erro ao excluir ONG:', err);
            alert('Erro ao excluir ONG. Tente novamente!');
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
                <p className='h2'>ONGs Registradas</p>
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
                        {ongs.length > 0 ? (ongs.map((ong) => (
                            <tr key={ong.id}>
                                <th className="align-middle text-center" scope="row">{ong.id}</th>
                                <td className="align-middle text-center">{ong.nome}</td>
                                <td className="align-middle text-center">{ong.email}</td>
                                <td className="align-middle text-center">{ong.telefone || 'Sem telefone'}</td>
                                <td className="align-middle text-center">
                                    <div className="d-flex justify-content-center">
                                        <Link to={`/ongs/detalhes/${ong.id}`}>
                                            <button className="btn btn-details-views btn-sm mx-1">Ver</button>
                                        </Link>
                                        <Link to={`/ongs/editar/${ong.id}`}>
                                            <button className="btn btn-edit-views btn-sm mx-1">Editar</button>
                                        </Link>
                                        <button className="btn btn-danger btn-sm mx-1" onClick={() => { setOngId(ong.id); setShowModal(true); }}>Excluir</button>
                                    </div>
                                </td>
                            </tr>
                        ))) : (
                            <tr>
                                <td colSpan="5" className="text-center">Nenhuma ONG encontrada</td>
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
                                <p>Você tem certeza que deseja excluir a ONG <strong>{ongs.find(o => o.id === ongId)?.nome}</strong>?</p>
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

export default ONGs;
