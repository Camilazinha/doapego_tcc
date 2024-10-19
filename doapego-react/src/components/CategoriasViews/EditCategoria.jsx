import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditCategoria = () => {
  const { id } = useParams();
  const [nome, setNome] = useState('');
  const [foto, setFoto] = useState('');

  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/categorias-doacao/${id}`);
        setNome(response.data.nome);
        setFoto(response.data.foto);
      } catch (err) {
        console.error('Erro ao buscar categoria:', err);
      }
    };
    fetchCategoria();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/categorias-doacao/${id}`, { nome, foto });
      alert('Categoria atualizada com sucesso!');
    } catch (err) {
      console.error('Erro ao atualizar categoria:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Editar Categoria</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input 
            type="text" 
            className="form-control" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Foto (URL):</label>
          <input 
            type="text" 
            className="form-control" 
            value={foto} 
            onChange={(e) => setFoto(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn btn-warning mt-3">Atualizar</button>
      </form>
    </div>
  );
};

export default EditCategoria;
