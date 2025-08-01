//src/pages/ListCrud.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { crudData } from '../constants/crudData';

import errorTriangleIcon from "../img/errortriangle-icon.svg";
import noImageIcon from "../img/noimage-icon.svg";
import successIcon from "../img/success-icon.svg";

export default function ListCrud() {
    const { entidade } = useParams();
    const config = crudData[entidade] || null;

    const userType = localStorage.getItem('tipo') || '';
    const userOngId = Number(localStorage.getItem('ongId'));

    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        let timer;
        if (error || success) {
            timer = setTimeout(() => {
                setError(null);
                setSuccess('');
            }, 4000);
        }
        return () => clearTimeout(timer);
    }, [error, success]);

    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((o, p) => (o || {})[p], obj);
    };

    useEffect(() => {
        if (!config) return;

        const fetchData = async () => {
            try {
                if (!config) return;

                if (entidade === "administradores") {
                    if (userType === "MASTER") {
                        const [staffResponse, masterResponse] = await Promise.all([
                            axios.get(`http://localhost:8080/${config.apiEndpoint}?tipo=STAFF&sortDirection=asc`),
                            axios.get(`http://localhost:8080/${config.apiEndpoint}?tipo=MASTER&sortDirection=asc`)
                        ]);
                        setDados([...staffResponse.data.items, ...masterResponse.data.items]);
                    } else if (userType === "STAFF") {
                        const [staffResponse, funcionarioResponse] = await Promise.all([
                            axios.get(`http://localhost:8080/${config.apiEndpoint}?tipo=STAFF&ongId=${userOngId}&sortDirection=asc`),
                            axios.get(`http://localhost:8080/${config.apiEndpoint}?tipo=FUNCIONARIO&ongId=${userOngId}&sortDirection=asc`)
                        ]);
                        setDados([...staffResponse.data.items, ...funcionarioResponse.data.items]);
                    }

                } else if (entidade === "ongs") {
                    if (userType === "MASTER") {
                        const response = await axios.get(`http://localhost:8080/${config.apiEndpoint}?sortProperty=statusOng&sortDirection=asc`);
                        setDados(response.data.items);
                    } else {
                        const response = await axios.get(`http://localhost:8080/${config.apiEndpoint}/${userOngId}`);
                        setDados([response.data]);
                    }

                } else if (entidade === "enderecos-ong") {
                    if (userType === "MASTER") {
                        const response = await axios.get(`http://localhost:8080/${config.apiEndpoint}?sortDirection=asc`);
                        setDados(response.data.items);
                    } else {
                        const response = await axios.get(`http://localhost:8080/${config.apiEndpoint}?ongId=${userOngId}&sortDirection=asc`);
                        setDados(response.data.items);
                    }

                } else if (entidade === "usuarios") {
                    if (userType === "MASTER") {
                        const response = await axios.get(`http://localhost:8080/${config.apiEndpoint}?sortDirection=asc`);
                        setDados(response.data.items);
                    } else {
                        setDados([]);
                    }

                } else {
                    const response = await axios.get(`http://localhost:8080/${config.apiEndpoint}?sortDirection=asc`);
                    setDados(response.data.items);
                }
            } catch (err) {
                console.error("Erro ao buscar dados:", err);
                if (err.response) {
                    setError("Falha ao carregar os dados. Tente novamente.");
                } else if (err.request) {
                    setError("Não foi possível conectar ao servidor. Tente novamente.");
                } else {
                    setError("Ocorreu um erro inesperado.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [config, entidade, userType, userOngId]);

    const toggleStatus = async (itemId, currentStatus) => {
        try {
            const isOng = entidade === "ongs";
            const newStatus = !currentStatus;

            let endpoint = `http://localhost:8080/${config.apiEndpoint}/${itemId}`;
            let payload = {};

            if (isOng) {
                const action = currentStatus ? "desativar" : "reativar";

                endpoint = `http://localhost:8080/ongs/${action}/${itemId}`;
            } else {
                payload = { ativo: newStatus };
            }

            await axios.patch(endpoint, isOng ? {} : payload);

            setDados(dados.map(item => {
                if (item.id === itemId) {
                    return isOng
                        ? {
                            ...item,
                            statusOng: currentStatus ? "INATIVO" : "ATIVO"
                        }
                        : { ...item, ativo: newStatus };
                }
                return item;
            }));

            setSuccess(`${newStatus ? 'Ativado' : 'Desativado'} com sucesso.`);
        } catch (err) {
            setError('Erro ao alterar status. Tente novamente.');
            console.error('Erro detalhado:', err.response?.data || err.message);
        }
    };

    const handleDelete = async () => {
        if (!config || !itemToDelete) return;

        try {
            await axios.delete(`http://localhost:8080/${config.apiEndpoint}/${itemToDelete}`);
            setDados(dados.filter(item => item.id !== itemToDelete));
            setSuccess(`Excluído com sucesso.`);
        } catch (err) {
            console.error('Erro ao excluir:', err);
            setError('Falha ao excluir. Tente novamente.');
        } finally {
            setShowModal(false);
            setItemToDelete(null);
        }
    };

    if (!config) return (
        <main className='container my-5 nao-unico-elemento px-5'>
            <div className="alert alert-danger d-flex">
                <img src={errorTriangleIcon} className="me-2" alt="erro" />
                Não foi possível encontrar "{entidade}"
            </div>
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
            {error && (
                <div className="alert alert-danger d-flex align-items-start popup-alert">
                    <img src={errorTriangleIcon} className="me-2" alt="erro" />
                    <div className='ms-1'>
                        <p className="fw-semibold alert-heading">Erro!</p>
                        <p className="mb-0">{error}</p>
                    </div>
                </div>
            )}

            {success && (
                <div className="alert alert-success d-flex align-items-start popup-alert">
                    <img src={successIcon} className="me-2" alt="sucesso" />
                    <div className='ms-1'>
                        <p className="fw-semibold alert-heading">Sucesso!</p>
                        <p className="mb-0">{success}</p>
                    </div>
                </div>
            )}

            <div className='container my-5 nao-unico-elemento px-5'>
                <h2 className='titulo-pagina mb-4'>{config.titulo}</h2>

                <section className='p-4'>
                    {(
                        (entidade === "administradores") ||
                        (entidade === "enderecos-ong" && userType !== "MASTER") ||
                        (entidade === "categorias-doacao" && userType === "MASTER")
                    ) && (
                            <Link to={`/configuracoes/${entidade}/adicionar`}>
                                <button className="btn btn-custom-filled">
                                    + Adicionar
                                </button>
                            </Link>
                        )}

                    <table className="mt-3 table table-bordered table-hover">
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
                                                getNestedValue(item, col.key) ? (
                                                    <img src={getNestedValue(item, col.key)} alt="" className="rounded-circle shadow-sm" style={{ width: "80px", height: "80px", objectFit: "cover" }} />
                                                ) : (
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <img src={noImageIcon} alt="Sem imagem" width={80} />
                                                    </div>
                                                )
                                            ) : col.key === 'ativo' || col.key === 'statusOng' ? (
                                                <span className={`badge ${(getNestedValue(item, 'ativo') === true || getNestedValue(item, 'statusOng') === 'ATIVO')
                                                    ? 'bg-success'
                                                    : 'bg-danger'
                                                    }`}>
                                                    {getNestedValue(item, 'ativo') !== undefined
                                                        ? (getNestedValue(item, 'ativo') ? 'Ativo' : 'Suspenso')
                                                        : (getNestedValue(item, 'statusOng') === 'ATIVO' ? 'Ativo' : 'Inativo')}
                                                </span>
                                            ) : (
                                                getNestedValue(item, col.key)
                                            )}
                                        </td>
                                    ))}
                                    <td className="text-center">
                                        {config.acoes.map(acao => {
                                            const userType = localStorage.getItem('tipo') || '';
                                            let showAction = false;
                                            const isPendingOng = entidade === "ongs" && item.statusOng === "PENDENTE";

                                            if (isPendingOng) {
                                                showAction = acao.type === 'view';
                                            } else {
                                                switch (entidade) {
                                                    case 'administradores':
                                                        if (acao.type === 'disable') {
                                                            if (userType === 'MASTER') {
                                                                showAction = item.tipo === 'STAFF';
                                                            } else if (userType === 'STAFF') {
                                                                showAction = item.tipo === 'FUNCIONARIO';
                                                            }
                                                        } else {
                                                            showAction = true;
                                                        }
                                                        break;

                                                    case 'ongs':
                                                        showAction = acao.type === 'view' || (acao.type === 'disable' && userType === 'MASTER');
                                                        break;

                                                    case 'categorias-doacao':
                                                        showAction = acao.type === 'view' || (['edit', 'delete'].includes(acao.type) && userType === 'MASTER');
                                                        break;

                                                    case 'enderecos-ong':
                                                        showAction = acao.type === 'view' ||
                                                            (['edit', 'delete'].includes(acao.type) &&
                                                                ['STAFF', 'FUNCIONARIO'].includes(userType));
                                                        break;

                                                    case 'usuarios':
                                                        showAction = userType === 'MASTER';
                                                        break;

                                                    default:
                                                        showAction = true;
                                                }
                                            }
                                            if (!showAction) return null;

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
                                                );
                                            } else if (acao.type === 'disable') {
                                                const isActive = entidade === "ongs"
                                                    ? item.statusOng === "ATIVO"
                                                    : item.ativo === true || item.ativo === "true";

                                                return (
                                                    <button key={acao.type}
                                                        className={`btn btn-sm mx-1 btn-danger`}
                                                        onClick={() => toggleStatus(item.id, isActive)}>
                                                        <img src={acao.icon} alt="" className="me-2" />
                                                        {isActive ? acao.activeLabel : acao.inactiveLabel}
                                                    </button>
                                                );
                                            } else {
                                                return (
                                                    <Link key={acao.type} to={`${acao.path}${item.id}`}>
                                                        <button className={acao.classname}>
                                                            <img src={acao.icon} alt="" className="me-2" />
                                                            {acao.label}
                                                        </button>
                                                    </Link>
                                                );
                                            }
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
                                <h5 className="modal-title fw-semibold">Atenção!</h5>
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