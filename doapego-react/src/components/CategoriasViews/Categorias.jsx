import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/layout.css';
import '../../styles/views.css';
import axios from 'axios';

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [categoriaId, setCategoriaId] = useState(null);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('http://localhost:8080/categorias-doacao?sortDirection=asc');
                setCategorias(response.data.items);
                setLoading(false);
            } catch (err) {
                console.error('Erro ao buscar categorias:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchCategorias();
    }, []);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/categorias-doacao/${categoriaId}`);
            setCategorias(categorias.filter(c => c.id !== categoriaId));
            setShowModal(false);
            alert('Categoria excluída com sucesso!');
        } catch (err) {
            console.error('Erro ao excluir categoria:', err);
            alert('Erro ao excluir categoria. Tente novamente!');
        }
    };

    if (loading) return (
        <div className="table-responsive">
        <div className="borda-view container-fluid my-5 p-4">
        <p className='h2'>Carregando...</p>
        <hr />
        </div>
        </div>
            )
    if (error) return (
        <div className="table-responsive">
        <div className="borda-view container-fluid my-5 p-4">
        <p className='h2'>Erro ao carregar os dados:</p>
        <p className='h4' style={{ color: '#4c4c4c' }}>{error.message}</p>
        <hr />
        </div>
        </div>
)

    return (
        <div className="table-responsive">
        <div className="borda-view container-fluid my-5 p-4">
            <p className='h2'>Categorias de Brinquedos</p>
            <Link to={`/categorias/criar`} style={{ display: 'inline-block' }}>
            <button className="btn btn-add">+ Nova Categoria</button>
            </Link>

            <hr />

            <table className="table table-bordered table-hover">
                <thead>
                    <tr className='text-center'>
                        <th scope="col">#</th>
                        <th scope="col">Foto</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.length > 0 ? (categorias.map((categoria, index) => (<tr key={categoria.id}>
                    <th className="align-middle text-center" scope="row">{index + 1}</th>
                    <td className="text-center align-middle">
                        {categoria.foto ? ( <img src={categoria.foto} alt={`Foto de ${categoria.nome}`} width="70" height="70" style={{ objectFit: 'cover', borderRadius: '8px' }} />) : ('Sem foto')}
                    </td>
                    <td className="align-middle text-center">{categoria.nome}</td>
                    <td className="align-middle text-center">
                    <div className="d-flex justify-content-center">
                    <Link to={`/categorias/detalhes/${categoria.id}`}>
                        <button className="btn btn-info btn-sm mx-1">Ver</button>
                    </Link>
                    <Link to={`/categorias/editar/${categoria.id}`}>
                        <button className="btn btn-warning btn-sm mx-1">Editar</button>
                    </Link>
                        <button className="btn btn-danger btn-sm mx-1" onClick={() => { setCategoriaId(categoria.id); setShowModal(true); }}>Excluir </button>
                    </div>
                    </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center">Nenhuma categoria encontrada</td>
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
                    <p>Você tem certeza que deseja excluir a categoria <strong>{categorias.find(c => c.id === categoriaId)?.nome}</strong>?</p></div>
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

export default Categorias;
