//src/pages/ListCrud.jsx

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { crudData } from '../constants/crudData';

import errorTriangleIcon from "../img/errortriangle-icon.svg";
import noImageIcon from "../img/noimage-icon.svg";

export default function ListCrud() {

    const { entidade } = useParams();
    const config = crudData[entidade] || null;

    const userTipo = "MASTER";
    const userOngId = 48;

    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [itemId, setItemId] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);


    useEffect(() => {
        if (!config) return;

        const fetchData = async () => {
            try {
                if (entidade === "administradores") {
                    if (userTipo === "MASTER") {
                        const [staffResponse, masterResponse] = await Promise.all([
                            axios.get(`http://localhost:8080/${config.apiEndpoint}?tipo=STAFF&sortDirection=asc`),
                            axios.get(`http://localhost:8080/${config.apiEndpoint}?tipo=MASTER&sortDirection=asc`)
                        ]);
                        setDados([...staffResponse.data.items, ...masterResponse.data.items]);

                    } else if (userTipo === "STAFF") {
                        const [staffResponse, funcionarioResponse] = await Promise.all([
                            axios.get(`http://localhost:8080/${config.apiEndpoint}?tipo=STAFF&sortDirection=asc`),
                            axios.get(`http://localhost:8080/${config.apiEndpoint}?tipo=FUNCIONARIO&sortDirection=asc`)
                        ]);
                        setDados([...staffResponse.data.items, ...funcionarioResponse.data.items]);
                    }
                } else if (entidade === "ongs") {
                    const response = await axios.get(`http://localhost:8080/${config.apiEndpoint}?statusOng=ATIVO`);
                    setDados(response.data.items);
                } else {
                    const response = await axios.get(
                        `http://localhost:8080/${config.apiEndpoint}?sortDirection=asc`
                    );
                    setDados(response.data.items);
                }
            } catch (err) {
                console.error("Erro ao buscar dados:", err);
                if (err.response) {
                    setError("Erro ao carregar os dados. Tente novamente mais tarde.");
                } else if (err.request) {
                    setError("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
                } else {
                    setError("Ocorreu um erro inesperado.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [config, entidade, userTipo, userOngId]);

    const toggleStatus = async (itemId, currentStatus) => {
        try {
            const newStatus = !currentStatus;

            const isOng = entidade === "ongs";
            const statusField = isOng ? "statusOng" : "ativo";
            const statusValue = isOng ? (newStatus ? "ATIVO" : "INATIVO") : newStatus;

            await axios.patch(`http://localhost:8080/${config.apiEndpoint}/${itemId}`, {
                [statusField]: statusValue
            });

            setDados(dados.map(item => {
                if (item.id === itemId) {
                    return {
                        ...item,
                        ...(isOng
                            ? { statusOng: statusValue }
                            : { ativo: newStatus }
                        )
                    };
                }
                return item;
            }));

            alert(`${config.titulo} ${newStatus ? 'ativado' : 'desativado'} com sucesso!`);
        } catch (err) {
            console.error('Erro ao alterar status:', err);
            alert('Erro ao alterar status. Tente novamente!');
        }
    };

    const handleDelete = async () => {
        if (!config || !itemToDelete) return;

        try {
            await axios.delete(`http://localhost:8080/${config.apiEndpoint}/${itemToDelete}`);
            setDados(dados.filter(item => item.id !== itemToDelete));
            alert(`${config.titulo} excluído com sucesso!`);
        } catch (err) {
            console.error('Erro ao excluir:', err);
            alert('Erro ao excluir. Tente novamente!');
        } finally {
            setShowModal(false);
            setItemToDelete(null);
        }
    };
    if (!config) return (
        <main className='container my-5 nao-unico-elemento px-5'>
            <h2 className='titulo-pagina mb-5'>{config.titulo}</h2>
            <div className="alert alert-danger">Configuração não encontrada para "{entidade}"</div>
        </main>
    );

    if (error) return (
        <main className='container my-5 nao-unico-elemento px-5'>
            <h2 className='titulo-pagina mb-5'>{config.titulo}</h2>
            <div className="alert alert-danger d-flex">
                <img src={errorTriangleIcon} className="me-2" alt="" />
                {error
                    ? <p className="erro">{error}</p>
                    : null
                }
            </div>
        </main>
    );

    if (loading) return (
        <main className='container my-5 nao-unico-elemento px-5'>
            <h2 className='titulo-pagina mb-5'>{config.titulo}</h2>
            <section className='p-5 d-flex justify-content-center align-items-center flex-column'>
                <div className='spinner-border text-secondary m-3' role='status' style={{ width: '3rem', height: '3rem' }}></div>
                <p className='loading-text'>Carregando...</p>
            </section>
        </main>
    );

    return (
        <main>
            <div className='container my-5 nao-unico-elemento px-5'>
                <h2 className='titulo-pagina mb-5'>{config.titulo}</h2>
                <section className='p-4'>
                    <table className="table table-bordered table-hover">
                        <thead className='table-light'>
                            <tr className='text-center'>
                                {config.colunas.map(col => (
                                    <th key={col.key}>{col.label}</th>
                                ))}
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dados.length > 0 ? dados.map(item => (
                                <tr key={item.id} className='text-center align-middle'>
                                    {config.colunas.map(col => (
                                        <td key={col.key} className="text-center">
                                            {col.temImagem ? (
                                                item[col.key] ? (
                                                    <img src={item[col.key]} alt="" className="com-imagem" style={{ objectFit: 'cover' }} />
                                                ) : (
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <img src={noImageIcon} alt="Sem imagem" width={80} />
                                                    </div>
                                                )
                                            ) : col.key === 'ativo' || col.key === 'statusOng' ? (
                                                <span className={`badge ${(item.ativo === true || item.statusOng === 'ATIVO')
                                                    ? 'bg-success'
                                                    : 'bg-danger'
                                                    }`}>
                                                    {item.ativo !== undefined
                                                        ? (item.ativo ? 'Ativo' : 'Suspenso')
                                                        : (item.statusOng === 'ATIVO' ? 'Ativo' : 'Inativo')}
                                                </span>
                                            ) : (
                                                item[col.key]
                                            )}
                                        </td>
                                    ))}
                                    <td className="text-center">
                                        {config.acoes.map(acao => {
                                            if (acao.type === 'delete') {
                                                return (
                                                    <button key={acao.type}
                                                        className="btn btn-sm btn-danger mx-1"
                                                        onClick={() => {
                                                            setItemToDelete(item.id);
                                                            setShowModal(true);
                                                        }}>
                                                        <img src={acao.icon} alt="" className="me-2" />
                                                        {acao.label}
                                                    </button>
                                                )
                                            }
                                            if (acao.type === 'disable') {
                                                const isActive = entidade === "ongs"
                                                    ? item.statusOng === "ATIVO"
                                                    : item.ativo;

                                                return (
                                                    <button key={acao.type}
                                                        className={`btn btn-sm mx-1 btn-danger`}
                                                        onClick={() => toggleStatus(item.id, isActive)}>
                                                        <img src={acao.icon} alt="" className="me-2" />
                                                        {isActive ? 'Desativar' : 'Ativar'}
                                                    </button>
                                                );
                                            }
                                            return (
                                                <Link key={acao.type} to={`${acao.path}${item.id}`}>
                                                    <button className={acao.classname}>
                                                        <img src={acao.icon} alt="" className="me-2" />
                                                        {acao.label}
                                                    </button>
                                                </Link>
                                            );
                                        })}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={config.colunas.length + 1} className="text-center">Nenhum dado encontrado</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            </div>
            {showModal && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title subtitulo-container text-danger">CUIDADO!</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                Tem certeza que deseja excluir este item permanentemente?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancelar
                                </button>
                                <button type="button" className="btn btn-danger d-flex" onClick={handleDelete}>
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}