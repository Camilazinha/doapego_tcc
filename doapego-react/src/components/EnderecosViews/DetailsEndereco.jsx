// src/components/DetailsEndereco.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../../styles/views.css';

const DetailsEndereco = () => {
    const { id } = useParams();
    const [endereco, setEndereco] = useState(null);
    const navigate = useNavigate();

    // Recupera o tipo de usuário
    const userType = localStorage.getItem('userType');

    useEffect(() => {
        const fetchEndereco = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/enderecos-ong/${id}`);
                setEndereco(response.data);
            } catch (err) {
                console.error('Erro ao buscar detalhes do endereço:', err);
            }
        };
        fetchEndereco();
    }, [id]);

    return (
        <div className="borda-view container-fluid mt-5 p-4">
            <p className='h2'>Detalhes do endereço</p>
            <hr />

            {endereco ? (
                <div className="d-flex flex-column">
                    <div className="my-2 fake-input col">
                        <strong>CEP: </strong> {endereco.cep}
                    </div>
                    <div className="my-2 fake-input col">
                        <strong>Estado: </strong> {endereco.estado}
                    </div>
                    <div className="my-2 fake-input col">
                        <strong>Cidade: </strong> {endereco.cidade}
                    </div>
                    <div className="my-2 fake-input col">
                        <strong>Bairro: </strong> {endereco.bairro}
                    </div>
                    <div className="my-2 fake-input col">
                        <strong>Logradouro: </strong> {endereco.logradouro}
                    </div>
                    <div className="my-2 fake-input col">
                        <strong>Número: </strong> {endereco.numero}
                    </div>
                    <div className="my-2 fake-input col">
                        <strong>Complemento: </strong> {endereco.complemento || 'N/A'}
                    </div>
                    <div className="my-2 fake-input col">
                        <strong>Latitude: </strong> {endereco.latitude || 'N/A'}
                    </div>
                    <div className="my-2 fake-input col">
                        <strong>Longitude: </strong> {endereco.longitude || 'N/A'}
                    </div>
                    <div className="my-2 fake-input col">
                        <strong>Principal: </strong> {endereco.principal ? 'Sim' : 'Não'}
                    </div>
                    <div className="my-2 fake-input col">
                        <strong>Ativo: </strong> {endereco.ativo ? 'Sim' : 'Não'}
                    </div>
                </div>
            ) : (
                <p>Carregando detalhes...</p>
            )}

            {endereco && (
                <div className="mt-3 d-flex justify-content-start">
                    {userType === 'ADMIN_ONG' && ( // Exibe o botão "Editar" apenas para o admin ONG
                        <Link to={`/enderecos/editar/${endereco.id}`}>
                            <button className="btn btn-add">Editar</button>
                        </Link>
                    )}
                    <button className="btn btn-voltar" onClick={() => navigate('/enderecos')}>Voltar</button>
                </div>
            )}
        </div>
    );
};

export default DetailsEndereco;
