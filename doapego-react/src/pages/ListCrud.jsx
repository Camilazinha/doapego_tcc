import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { crudList } from '../constants/crudList';
import errorTriangleIcon from "../img/errortriangle-icon.svg"

export default function ListCrud() {
    const { entidade } = useParams(); // Pegamos a entidade da URL
    console.log(entidade);
    const config = crudList[entidade] || null; // Se não existir, deixamos como `null`

    // Inicializa os hooks SEMPRE antes de qualquer return
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [itemId, setItemId] = useState(null);

    useEffect(() => {
        if (!config) return; // Evita executar se a entidade não existir

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/${config.apiEndpoint}?sortDirection=asc`);
                setDados(response.data.items);

            } catch (err) {
                console.error("Erro ao buscar doações:", err)

                if (err.response) {
                    setError("Erro ao carregar os dados. Tente novamente mais tarde.")
                } else if (err.request) {
                    setError("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.")
                } else {
                    setError("Ocorreu um erro inesperado.")
                }
            } finally {
                setLoading(false);
            }

        };

        fetchData();
    }, [config]);

    const handleDelete = async () => {
        if (!config) return; // Evita tentar excluir sem uma entidade válida

        try {
            await axios.delete(`http://localhost:8080/${config.apiEndpoint}/${itemId}`);
            setDados(dados.filter(item => item.id !== itemId));
            setShowModal(false);
            alert(`${config.titulo} excluído com sucesso!`);
        } catch (err) {
            console.error('Erro ao excluir:', err);
            alert('Erro ao excluir. Tente novamente!');
        }
    };

    if (!config) return (
        <main className='container my-5 nao-unico-elemento px-5'>
            <h2 className='titulo-pagina mb-5'>{config.titulo}</h2>
            <div className="alert alert-danger">Configuração não encontrada para "{entidade}"</div>
        </main>
    )

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
    )

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

                <section className='borda p-5'>
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
                                <tr key={item.id}>
                                    {config.colunas.map(col => (
                                        <td key={col.key} className="text-center">
                                            {col.temImagem ? (
                                                item[col.key] ? <img src={item[col.key]} alt="" width="70" height="70" style={{ objectFit: 'cover', borderRadius: '8px' }} /> : 'Sem foto'
                                            ) : (
                                                item[col.key]
                                            )}
                                        </td>
                                    ))}
                                    <td className="text-center">
                                        {config.acoes.map(acao => (
                                            acao.type === 'delete' ? (
                                                <button key={acao.type} className="btn btn-sm btn-danger"
                                                    onClick={() => { setItemId(item.id); setShowModal(true); }}>
                                                    {acao.label}
                                                </button>
                                            ) : (
                                                <Link key={acao.type} to={`${acao.path}${item.id}`}>
                                                    <button className={acao.classname}>{acao.label}</button>
                                                </Link>
                                            )
                                        ))}
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
        </main>
    );
}
