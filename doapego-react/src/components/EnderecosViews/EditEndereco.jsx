import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/views.css';
import '../../styles/layout.css';

const EditEndereco = () => {
  const { id } = useParams();
  const [ong, setOng] = useState('');
  const [cep, setCep] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [complemento, setComplemento] = useState('');
  const [ativo, setAtivo] = useState(true);
  const [principal, setPrincipal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEndereco = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/enderecos-ong/${id}`);
        const endereco = response.data;
        setOng(endereco.ong?.id || ''); // Define o ID da ONG no estado como objeto
        setCep(endereco.cep);
        setEstado(endereco.estado);
        setCidade(endereco.cidade);
        setBairro(endereco.bairro);
        setNumero(endereco.numero);
        setLogradouro(endereco.logradouro);
        setComplemento(endereco.complemento || '');
        setPrincipal(endereco.principal);
        setAtivo(endereco.ativo);
      } catch (err) {
        console.error('Erro ao buscar endereço:', err);
      }
    };
    fetchEndereco();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/enderecos-ong/${id}`, {
        ong: { id: ong }, // Envia como objeto
        cep,
        estado,
        cidade,
        bairro,
        numero,
        logradouro,
        complemento,
        principal,
        ativo // Inclui o campo ativo
      });
      alert('Endereço atualizado com sucesso!');
      navigate('/enderecos');
    } catch (err) {
      console.error('Erro ao atualizar endereço:', err);
      alert('Erro ao atualizar endereço. Tente novamente!');
    }
  };

  return (
    <div className="borda-view container-fluid my-5 p-4">
      <p className='h2'>Editar Endereço</p>
      <hr />

      <form onSubmit={handleSubmit}>
        <div className="form-group col-10 col-md-11 mb-2">
          <label>ID da ONG:</label>
          <input type="text" className="form-control" value={ong} disabled /> {/* Campo desabilitado */}
        </div>

        <div className="form-group col-10 col-md-11 mb-2">
          <label>CEP:</label>
          <input type="text" className="form-control" value={cep} onChange={(e) => setCep(e.target.value)} required />
        </div>

        <div className="form-group col-10 col-md-11 mb-2">
          <label>Estado:</label>
          <input type="text" className="form-control" value={estado} onChange={(e) => setEstado(e.target.value)} required />
        </div>

        <div className="form-group col-10 col-md-11 mb-2">
          <label>Cidade:</label>
          <input type="text" className="form-control" value={cidade} onChange={(e) => setCidade(e.target.value)} required />
        </div>

        <div className="form-group col-10 col-md-11 mb-2">
          <label>Bairro:</label>
          <input type="text" className="form-control" value={bairro} onChange={(e) => setBairro(e.target.value)} required />
        </div>

        <div className="form-group col-10 col-md-11 mb-2">
          <label>Logradouro:</label>
          <input type="text" className="form-control" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} required />
        </div>

        <div className="form-group col-10 col-md-11 mb-2">
          <label>Número:</label>
          <input type="text" className="form-control" value={numero} onChange={(e) => setNumero(e.target.value)} required />
        </div>

        <div className="form-group col-10 col-md-11 mb-2">
          <label>Complemento:</label>
          <input type="text" className="form-control" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
        </div>

        <div className="form-group col-10 col-md-11 mb-2">
          <label>Principal:</label>
          <select className="form-control" value={principal} onChange={(e) => setPrincipal(e.target.value === 'true')} required>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </div>

        <div className="form-group col-10 col-md-11 mb-2">
          <label>Ativo:</label>
          <select className="form-control" value={ativo} onChange={(e) => setAtivo(e.target.value === 'true')} required>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </div>

        <div className='form-group'>
          <button type="submit" className="btn btn-add mt-3">Atualizar</button>
          <button type="button" className="btn btn-voltar mt-3" onClick={() => navigate('/enderecos')}>Voltar</button>
        </div>
      </form>
    </div>
  );
};

export default EditEndereco;
