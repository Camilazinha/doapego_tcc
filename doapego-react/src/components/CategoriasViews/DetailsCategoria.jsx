import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../../styles/views.css';

const DetailsCategoria = () => {
  const { id } = useParams();
  const [categoria, setCategoria] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/categorias-doacao/${id}`);
        setCategoria(response.data);
      } catch (err) {
        console.error('Erro ao buscar detalhes da categoria:', err);
      }
    };
    fetchCategoria();
  }, [id]);

  return (
    <div className="borda-view container-fluid mt-5 p-4">
      <p className='h2'>Detalhes da categoria</p>
      <hr />

      {categoria ? ( // Verifica se a categoria existe
        <div className="d-flex align-items-center">
          <div className="me-4"> {/* Margem à direita para separar a imagem do texto */}
            {categoria.foto ? (
              <img 
                src={categoria.foto} 
                alt={`Foto de ${categoria.nome}`} 
                width="300" 
                height="300" 
                className='img-details'
                style={{ objectFit: 'cover', borderRadius: '8px' }} 
              />
            ) : (
              <span className='fake-img-details'>Sem foto</span>
            )}
          </div>
          <table className="table align-self-start">
            <tbody>
              <tr>
                <th>Nome</th>
                <td>{categoria.nome}</td>
              </tr>
              </tbody>
              </table>
        </div>
      ) : (
        <p>Carregando detalhes...</p>
      )}

      {categoria && ( // Verifica se a categoria existe antes de renderizar os botões
        <div className="mt-3 d-flex justify-content-start">
          <Link to={`/categorias/editar/${categoria.id}`}>
            <button className="btn btn-add">Editar</button>
          </Link>
          <button className="btn btn-voltar" onClick={() => navigate('/categorias')}>Voltar</button>
        </div>
      )}
    </div>
  );
};

export default DetailsCategoria;
