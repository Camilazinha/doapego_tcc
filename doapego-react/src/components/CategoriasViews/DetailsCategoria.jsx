import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailsCategoria = () => {
  const { id } = useParams();
  const [categoria, setCategoria] = useState(null);

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
    <div className="container mt-4">
      <h2>Detalhes da Categoria</h2>
      {categoria ? (
        <div>
          <p><strong>Nome:</strong> {categoria.nome}</p>
          <p><strong>Foto:</strong></p>
          {categoria.foto ? (
            <img 
              src={categoria.foto} 
              alt={`Foto de ${categoria.nome}`} 
              width="150" 
              height="150" 
              style={{ objectFit: 'cover', borderRadius: '8px' }} 
            />
          ) : (
            <p>Sem foto</p>
          )}
        </div>
      ) : (
        <p>Carregando detalhes...</p>
      )}
    </div>
  );
};

export default DetailsCategoria;
