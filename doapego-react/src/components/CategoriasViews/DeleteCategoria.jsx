import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteCategoria = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState(null);

  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/categorias-doacao/${id}`);
        setCategoria(response.data);
      } catch (err) {
        console.error('Erro ao buscar categoria:', err);
      }
    };
    fetchCategoria();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/categorias-doacao/${id}`);
      alert('Categoria excluída com sucesso!');
      navigate('/categorias');
    } catch (err) {
      console.error('Erro ao excluir categoria:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Excluir Categoria</h2>
      {categoria ? (
        <>
          <p>Tem certeza que deseja excluir a categoria <strong>{categoria.nome}</strong>?</p>
          <button className="btn btn-danger" onClick={handleDelete}>Excluir</button>
          <button className="btn btn-secondary" onClick={() => navigate('/categorias')}>Cancelar</button>
        </>
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
};

export default DeleteCategoria;
