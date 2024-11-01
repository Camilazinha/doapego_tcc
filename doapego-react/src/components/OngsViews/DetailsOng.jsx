import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../../styles/views.css';

const DetailsOng = () => {
  const { id } = useParams();
  const [ong, setOng] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOng = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ongs/${id}`);
        setOng(response.data);
      } catch (err) {
        console.error('Erro ao buscar detalhes da ONG:', err);
      }
    };
    fetchOng();
  }, [id]);

  return (
    <div className="borda-view container-fluid mt-5 p-4">
      <p className='h2'>Detalhes da ONG</p>
      <hr />

      {ong ? ( // Verifica se a ONG existe
        <div className="d-flex align-items-center">
          <div className="me-4"> {/* Margem à direita para separar a imagem do texto */}
            {ong.foto ? (
              <img 
                src={ong.foto} 
                alt={`Foto de ${ong.nome}`} 
                width="300" 
                height="300" 
                className='img-details'
                style={{ objectFit: 'cover', borderRadius: '8px' }} 
              />
            ) : (
              <p>Sem foto</p>
            )}
          </div>
          <div className="d-flex flex-column">
            <p><strong>Nome:</strong> {ong.nome}</p>
            <p><strong>Email:</strong> {ong.email}</p>
            <p><strong>Telefone:</strong> {ong.telefone}</p>
            <p><strong>Fundação:</strong> {ong.fundacao ? new Date(ong.fundacao).toLocaleDateString() : 'Não informado'}</p>
            <p><strong>Descrição:</strong> {ong.descricao || 'Sem descrição'}</p>
            <p><strong>WhatsApp:</strong> {ong.whatsapp || 'Não informado'}</p>
            <p><strong>Ativo:</strong> {ong.ativo ? 'Sim' : 'Não'}</p>
          </div>
        </div>
      ) : (
        <p>Carregando detalhes...</p>
      )}

      {ong && ( // Verifica se a ONG existe antes de renderizar os botões
        <div className="mt-3 d-flex justify-content-start">
          <Link to={`/ongs/editar/${ong.id}`}>
            <button className="btn btn-add">Editar</button>
          </Link>
          <button className="btn btn-voltar" onClick={() => navigate('/ongs')}>Voltar</button>
        </div>
      )}
    </div>
  );
};

export default DetailsOng;
