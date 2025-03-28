import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';


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
              <span className='fake-img-details'>Sem foto</span>
            )}
          </div>

          <div className='d-flex flex-column'>
            {/* Tabela de detalhes do usuário */}
            <div className="d-flex fake-input col my-2">
              <strong>Nome: </strong>  {ong.nome}
            </div>

            <div className="d-flex fake-input col my-2">
              <strong>E-mail: </strong>  {ong.email}
            </div>

            <div className="d-flex fake-input col my-2">
              <strong>Telefone: </strong>  {ong.telefone}
            </div>

            <div className="d-flex fake-input col my-2">
              <strong>Fundação: </strong>  {ong.fundacao ? new Date(ong.fundacao).toLocaleDateString() : 'Não informado'}
            </div>

            <div className="d-flex fake-input col my-2">
              <strong>Descrição: </strong>  {ong.descricao || 'Sem descrição'}
            </div>

            <div className="d-flex fake-input col my-2">
              <strong>Whatsapp: </strong>  {ong.whatsapp}
            </div>

            <div className="d-flex fake-input col my-2">
              <strong>Ativo: </strong>  {ong.ativo ? 'Sim' : 'Não'}
            </div>

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
