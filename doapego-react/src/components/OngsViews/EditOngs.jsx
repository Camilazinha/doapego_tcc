import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/views.css';

const EditOng = () => {
  const { id } = useParams();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [fundacao, setFundacao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [ativo, setAtivo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOng = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ongs/${id}`);
        const ongData = response.data;

        setNome(ongData.nome || '');
        setEmail(ongData.email || '');
        setTelefone(ongData.telefone || '');
        setFundacao(ongData.fundacao || '');
        setDescricao(ongData.descricao || '');
        setWhatsapp(ongData.whatsapp || '');
        setAtivo(ongData.ativo || false);
      } catch (err) {
        console.error('Erro ao buscar ONG:', err);
      }
    };
    fetchOng();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/ongs/${id}`, { 
        nome, 
        email, 
        telefone, 
        fundacao, 
        descricao, 
        whatsapp, 
        ativo 
      });

      alert('ONG atualizada com sucesso!');
      navigate('/ongs');
    } catch (err) {
      console.error('Erro ao atualizar ONG:', err);
      alert('Erro ao atualizar ONG. Tente novamente!');
    }
  };

  return (
    <div className="borda-view container-fluid my-5 p-4">
      <p className='h2'>Editar ONG</p>
      <hr />

      <form onSubmit={handleSubmit}>
        <div className="form-group col-10 col-md-11 mb-2">
          <label>Nome:</label>
          <input 
            type="text" 
            className="form-control" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group col-10 col-md-11 mb-2">
          <label>E-mail:</label>
          <input 
            type="email" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group col-10 col-md-11 mb-2">
          <label>Telefone:</label>
          <input 
            type="text" 
            className="form-control" 
            value={telefone} 
            onChange={(e) => setTelefone(e.target.value)} 
          />
        </div>

        <div className="form-group col-10 col-md-11 mb-2">
          <label>Data de Fundação:</label>
          <input 
            type="date" 
            className="form-control" 
            value={fundacao} 
            onChange={(e) => setFundacao(e.target.value)} 
          />
        </div>

        <div className="form-group col-10 col-md-11 mb-2">
          <label>Descrição:</label>
          <textarea 
            className="form-control" 
            value={descricao} 
            onChange={(e) => setDescricao(e.target.value)} 
          />
        </div>

        <div className="form-group col-10 col-md-11 mb-2">
          <label>WhatsApp:</label>
          <input 
            type="text" 
            className="form-control" 
            value={whatsapp} 
            onChange={(e) => setWhatsapp(e.target.value)} 
          />
        </div>

        <div className="form-group col-10 col-md-11 mb-2">
          <label>Ativo:</label>
          <select 
            className="form-control" 
            value={ativo} 
            onChange={(e) => setAtivo(e.target.value === 'true')}>
            <option value={true}>Sim</option>
            <option value={false}>Não</option>
          </select>
        </div>

        <div className='form-group'>
          <button type="submit" className="btn btn-add mt-3">Atualizar</button>
          <button type="button" className="btn btn-voltar mt-3" onClick={() => navigate('/ongs')}>Voltar</button>
        </div>
      </form>
    </div>
  );
};

export default EditOng;
