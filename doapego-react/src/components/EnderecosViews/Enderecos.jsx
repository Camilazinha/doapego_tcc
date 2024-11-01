import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/layout.css';
import '../../styles/views.css';
import axios from 'axios';

const Enderecos = () => {
    const [enderecos, setEnderecos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [enderecoId, setEnderecoId] = useState(null);

    // Pega o tipo de usuário e o ID da ONG associada ao funcionário, se houver
    const userType = localStorage.getItem('userType');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        const fetchEnderecos = async () => {
            try {
                let endpoint = 'http://localhost:8080/enderecos-ong?sortDirection=asc';

                // Filtra endereços dependendo do tipo de usuário
                if (userType === 'MASTER') {
                    endpoint = `${endpoint}?principal=true`;
                } else if (userType === 'FUNCIONARIO_ONG' && ongId) {
                    endpoint = `${endpoint}?ongId=${ongId}`;
                }

                const response = await axios.get(endpoint);
                setEnderecos(response.data.items);
                setLoading(false);
            } catch (err) {
                console.error('Erro ao buscar endereços:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchEnderecos();
    }, [userType, ongId]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/enderecos-ong/${enderecoId}`);
            setEnderecos(enderecos.filter(e => e.id !== enderecoId));
            setShowModal(false);
            alert('Endereço excluído com sucesso!');
        } catch (err) {
            console.error('Erro ao excluir endereço:', err);
            alert('Erro ao excluir endereço. Tente novamente!');
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
                <p className='h2'>Endereços das ONGs</p>

                {/* Botão de adicionar endereço, visível apenas para Admin ONG */}
                {userType === 'ONG' && (
                    <Link to={`/enderecos/criar`} style={{ display: 'inline-block' }}>
                        <button className="btn btn-add">+ Novo Endereço</button>
                    </Link>
                )}

                <hr />

                <table className="table table-bordered table-hover">
                    <thead>
                        <tr className='text-center'>
                            <th scope="col">#</th>
                            {/* <th scope="col">CEP</th> */}
                            <th scope="col">Estado</th>
                            <th scope="col">Cidade</th>
                            <th scope="col">Bairro</th>
                            <th scope="col">Principal</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enderecos.length > 0 ? (
                            enderecos.map((endereco) => (
                                <tr key={endereco.id}>
                                    <th className="align-middle text-center" scope="row">{endereco.id}</th>
                                    {/* <td className="align-middle text-center">{endereco.cep}</td> */}
                                    <td className="align-middle text-center">{endereco.estado}</td>
                                    <td className="align-middle text-center">{endereco.cidade}</td>
                                    <td className="align-middle text-center">{endereco.bairro}</td>
                                    <td className="align-middle text-center">{endereco.principal ? 'Sim' : 'Não'}</td>
                                    <td className="align-middle text-center">

                                        <div className="d-flex justify-content-center">
                                            <Link to={`/enderecos/detalhes/${endereco.id}`}>
                                                <button className="btn btn-details-views btn-sm mx-1">Ver</button>
                                            </Link>
                                            {/* Mostrar editar e excluir apenas para Admin ONG */}
                                            {userType === 'ONG' && (
                                                <>
                                                    <Link to={`/enderecos/editar/${endereco.id}`}>
                                                        <button className="btn btn-edit-views btn-sm mx-1">Editar</button>
                                                    </Link>
                                                    <button
                                                        className="btn btn-danger btn-sm mx-1"
                                                        onClick={() => { setEnderecoId(endereco.id); setShowModal(true); }}
                                                    >
                                                        Excluir
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center">Nenhum endereço encontrado</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal de Confirmação de Exclusão */}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmar exclusão</h5>
                            </div>
                            <div className="modal-body">
                                <p>Você tem certeza que deseja excluir o endereço <strong>{enderecos.find(e => e.id === enderecoId)?.logradouro}</strong>?</p>
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

export default Enderecos;
