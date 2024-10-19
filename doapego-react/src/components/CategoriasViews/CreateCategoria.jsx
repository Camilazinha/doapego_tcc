import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/views.css';
import '../../styles/layout.css';


const CreateCategoria = () => {
  const [nome, setNome] = useState('');
  const [foto, setFoto] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/categorias-doacao', { nome, foto });
      alert('Categoria criada com sucesso!');
      navigate('/categorias');
    } catch (err) {
      console.error('Erro ao criar categoria:', err);
      alert('Erro ao criar categoria. Tente novamente!')
    }
  };

  return (
    <div className="borda-view container-fluid my-5 p-4">
      <p className='h2'>Criar nova categoria</p>
      <hr />

      <form onSubmit={handleSubmit}>
        <div className="form-group col-6 mb-2">
          <label>Nome:</label>
          <input 
            type="text" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div className="form-group col-6 mb-2">
          <label>Foto (URL):</label>
          <input type="text" className="form-control" value={foto} onChange={(e) => setFoto(e.target.value)} 
          />
        </div>
        <div className="form-group">
        <button type="submit" className="btn btn-add mt-3">Criar</button>
        <button className="btn btn-voltar mt-3" onClick={() => navigate('/categorias')}>Voltar</button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategoria;
