import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../../styles/views.css';

const DetailsUsuario = () => {
    const { id } = useParams();
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/usuarios/${id}`);
                setUsuario(response.data.items);
            } catch (err) {
                console.error('Erro ao buscar detalhes do usuário:', err);
            }
        };
        fetchUsuario();
    }, [id]);

    return (
        <div className="borda-view container-fluid my-5 p-4">
            <p className='h2'>Detalhes do usuário</p>
            <hr />

            {usuario ? ( // Verifica se o usuário existe
                <div>
                    <div className="d-flex align-items-center mb-3">
                        <div className="col">
                            <strong>Nome: </strong> {usuario.nome}
                        </div>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <div className="col">
                            <strong>Email: </strong> {usuario.email}
                        </div>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <div className="col">
                            <strong>Telefone: </strong> {usuario.telefone || 'Sem telefone'}
                        </div>
                    </div>
                    {/* Adicione outros campos que você deseja mostrar aqui */}
                </div>
            ) : (
                <p>Carregando detalhes...</p>
            )}

            {usuario && ( // Verifica se o usuário existe antes de renderizar os botões
                <div className="mt-3 d-flex justify-content-start">
                    <Link to={`/usuarios/editar/${usuario.id}`}>
                        <button className="btn btn-add">Editar</button>
                    </Link>
                    <button className="btn btn-voltar" onClick={() => navigate('/usuarios')}>Voltar</button>
                </div>
            )}
        </div>
    );
};

export default DetailsUsuario;
