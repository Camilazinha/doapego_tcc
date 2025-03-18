import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { crudList } from '../constants/crudList';

export default function ListCrud() {
    const { entidade } = useParams(); // Pegamos a entidade da URL
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
                console.error('Erro ao buscar dados:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [config]); // Garantimos que o efeito só roda quando a entidade muda

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

    // Se a entidade não for encontrada, mostramos a mensagem de erro depois dos hooks
    if (!config) return <p>Configuração não encontrada para "{entidade}"</p>;

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar os dados: {error.message}</p>;

    return (
        <main className='container my-5 px-5'>
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
                                                <button className="btn btn-sm btn-primary">{acao.label}</button>
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
        </main>
    );
}
