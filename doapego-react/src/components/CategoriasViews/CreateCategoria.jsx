import React, { useState } from 'react';
import axios from 'axios';

const CreateCategoria = () => {
  const [nome, setNome] = useState('');
  const [foto, setFoto] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/categorias-doacao', { nome, foto });
      alert('Categoria criada com sucesso!');
    } catch (err) {
      console.error('Erro ao criar categoria:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Criar Nova Categoria</h2>
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
        <button type="submit" className="btn btn-success mt-3">Criar</button>
      </form>
    </div>
  );
};

export default CreateCategoria;
