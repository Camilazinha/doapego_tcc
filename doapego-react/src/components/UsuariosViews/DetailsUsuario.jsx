import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/views.css';

const DetailsUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/usuarios/${id}`);
        setUsuario(response.data);
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
        <div className="d-flex align-items-center">
          <div className="me-4"> {/* Margem à direita para separar a imagem do texto */}
            {usuario.foto ? (
              <img 
                src={usuario.foto} 
                alt={`Foto de ${usuario.nome}`} 
                width="295" 
                height="295" 
                className='img-details'
                style={{ objectFit: 'cover', borderRadius: '8px' }} 
              />
            ) : (
              <span className='fake-img-details'>Sem foto</span>
            )}
          </div>

          {/* Tabela de detalhes do usuário */}
          <table className="table">
            <tbody>
              <tr>
                <th>Nome</th>
                <td>{usuario.nome}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{usuario.email}</td>
              </tr>
              <tr>
                <th>Telefone</th>
                <td>{usuario.telefone || 'Não informado'}</td>
              </tr>
              <tr>
                <th>Endereço</th>
                <td>{`${usuario.logradouro}, ${usuario.numero} - ${usuario.bairro}, ${usuario.cidade}, ${usuario.estado}`}</td>
              </tr>
              <tr>
                <th>CEP</th>
                <td>{usuario.cep}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{usuario.ativo ? 'Ativo' : 'Suspenso'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Carregando detalhes...</p>
      )}

      {usuario && ( // Verifica se o usuário existe antes de renderizar os botões
        <div className="mt-3 d-flex justify-content-start">
          <button className="btn btn-voltar" onClick={() => navigate('/usuarios')}>Voltar</button>
        </div>
      )}
    </div>
  );
};

export default DetailsUsuario;
