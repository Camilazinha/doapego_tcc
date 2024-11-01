import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/views.css';

const EditCategoria = () => {
  const { id } = useParams();
  const [nome, setNome] = useState('');
  const [foto, setFoto] = useState('');
  const navigate = useNavigate();

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
      navigate('/categorias');
    } catch (err) {
      console.error('Erro ao atualizar categoria:', err);
      alert('Erro ao criar categoria. Tente novamente!')
    }
  };

  return (
    <div className="borda-view container-fluid mt-5 p-4">
      <p className='h2'>Editar categoria</p>
      <hr />

      <form onSubmit={handleSubmit}>

        <div className="form-group col-10 col-md-11 mb-2">
          <label>Nome:</label>
          <input 
            type="text" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)}required />
        </div>

        <div className="form-group col-10 col-md-11 mb-2">
          <label>Foto (URL):</label>
          <input type="text" className="form-control" value={foto} onChange={(e) => setFoto(e.target.value)} />
        </div>

        <div className='form-group'>
        <button type="submit" className="btn btn-add mt-3">Atualizar</button>
        <button className="btn btn-voltar mt-3" onClick={() => navigate('/categorias')}>Voltar</button>
        </div>
      </form>
    </div>
  );
};

export default EditCategoria;
