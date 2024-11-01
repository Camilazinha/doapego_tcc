// src/components/DetailsAdmin.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/views.css';

const DetailsAdmin = () => {
  const { id } = useParams();
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState(null);  // Estado para capturar erro
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/administradores/${id}`);
        setAdmin(response.data);
      } catch (err) {
        console.error('Erro ao buscar detalhes do administrador:', err);
        setError('Erro ao carregar detalhes do administrador');
      }
    };
    fetchAdmin();
  }, [id]);

  if (error) return (
    <div className="borda-view container-fluid my-5 p-4">
      <p className='h2'>Erro ao carregar os dados:</p>
      <p className='h4' style={{ color: '#4c4c4c' }}>{error}</p>
      <hr />
    </div>
  );

  return (
    <div className="borda-view container-fluid my-5 p-4">
      <p className='h2'>Detalhes do Administrador</p>
      <hr />

      {admin ? (
        <div className="d-flex flex-column">
          <div className="my-2 fake-input col">
            <strong>Nome:</strong> {admin.nome}
          </div>
          <div className="my-2 fake-input col">
            <strong>Email:</strong> {admin.email}
          </div>
          <div className="my-2 fake-input col">
            <strong>Tipo:</strong> {admin.tipo}
          </div>
          <div className="my-2 fake-input col">
            <strong>Ativo:</strong> {admin.ativo ? 'Sim' : 'Não'}
          </div>
          {admin.ong_id && (
            <div className="my-2 fake-input col">
              <strong>ID da ONG:</strong> {admin.ong_id}
            </div>
          )}
        </div>
      ) : (
        <p>Carregando detalhes...</p>
      )}

      <div className="mt-3 d-flex justify-content-start">
        <button className="btn btn-voltar" onClick={() => navigate('/administradores')}>Voltar</button>
      </div>
    </div>
  );
};

export default DetailsAdmin;
