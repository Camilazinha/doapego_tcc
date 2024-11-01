import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/views.css';
import '../../styles/layout.css';

const CreateEndereco = () => {
  const [cep, setCep] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [complemento, setComplemento] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [ativo, setAtivo] = useState(true);
  const [principal, setPrincipal] = useState(false);
  const [ongNome, setOngNome] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const ongId = queryParams.get('ongId');

  useEffect(() => {
    if (!ongId) {
      alert('ID da ONG não encontrado!');
      navigate('/enderecos');
      return;
    }

    // Verifica se o nome da ONG já está no localStorage
    const nomeLocalStorage = localStorage.getItem('ongNome');
    if (nomeLocalStorage) {
      setOngNome(nomeLocalStorage);
    } else {
      // Caso contrário, busca o nome pelo ID da ONG
      axios.get(`http://localhost:8080/ongs/${ongId}`)
        .then(response => {
          const nome = response.data.nome;
          setOngNome(nome);
          localStorage.setItem('ongNome', nome);  // Armazena no localStorage
        })
        .catch(error => {
          console.error('Erro ao buscar o nome da ONG:', error);
          alert('Erro ao buscar o nome da ONG.');
        });
    }
  }, [ongId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post(
            'http://localhost:8080/enderecos-ong',
            {
                ong: { id: Number(ongId) },
                cep,
                estado,
                cidade,
                bairro,
                numero,
                logradouro,
                complemento,
                latitude: latitude ? parseFloat(latitude) : null,
                longitude: longitude ? parseFloat(longitude) : null,
                principal: Boolean(principal),
                ativo: Boolean(ativo)
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        alert('Endereço criado com sucesso!');
        navigate('/enderecos');
    } catch (err) {
        console.error('Erro ao criar endereço:', err.response || err);
        alert(`Erro ao criar endereço: ${err.response?.data?.message || 'Tente novamente!'}`);
    }
};


  return (
    <div className="borda-view container-fluid mt-5 p-4">
      <p className='h2'>Criar Endereço</p>
      <hr />

      <form onSubmit={handleSubmit}>
        <div className="form-group col-10 col-md-11 mb-2">
          <label>Nome da ONG:</label>
          <input type="text" className="form-control" value={ongNome || ''} disabled />
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
          <label>Latitude:</label>
          <input type="text" className="form-control" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
        </div>

        <div className="form-group col-10 col-md-11 mb-2">
          <label>Longitude:</label>
          <input type="text" className="form-control" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
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
          <button type="submit" className="btn btn-add mt-3">Criar</button>
          <button type="button" className="btn btn-voltar mt-3" onClick={() => navigate('/enderecos')}>Voltar</button>
        </div>
      </form>
    </div>
  );
};

export default CreateEndereco;
