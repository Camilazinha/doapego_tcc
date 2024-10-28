// src/components/Cadastro.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/views.css';
import '../styles/layout.css';
import '../styles/forms.css';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [fundacao, setFundacao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [ativo, setAtivo] = useState(true);

  // Estados para o endereço da ONG
  const [cep, setCep] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Primeiro, cria a ONG
      const ongResponse = await axios.post('http://localhost:8080/ongs', {
        nome: nomeOng,
        email: emailOng,
        senha,
        telefone,
        fundacao,
        descricao,
        whatsapp,
        ativo: true,       // Endereço ativo
      });

      const ongId = ongResponse.data.id;  // Obtem o ID da ONG criada
      if (!ongId) {
        alert("Erro ao criar ONG, ID não encontrado.");
        return;
      }

      // 2. Em seguida, cria o Admin vinculado a esta ONG
      await axios.post('http://localhost:8080/administradores', {
        nome: nomeAdmin,           // Nome do Admin
        email: emailAdmin,          // Email do Admin
        senha,          // Senha do Admin
        tipo: "ONG",    // Define o tipo como "ONG"
        ativo: true,    // Admin ativo
        ong: { id: ongId } // Vincula o Admin à ONG recém-criada
      });

      // 3. Por fim, cria o endereço da ONG usando o ID da ONG criada
      await axios.post('http://localhost:8080/enderecos-ong', {
        cep,
        estado,
        cidade,
        bairro,
        logradouro,
        numero,
        complemento,
        latitude: null,     // Caso esses dados sejam opcionais
        longitude: null,
        principal: true,     // Define como o endereço principal
        ativo: true,         // Endereço ativo
        ong: { id: ongId },  // Vincula o endereço à ONG criada
      });

      alert('Cadastro realizado com sucesso!');
      navigate('/login'); // Redireciona para a tela de login após o cadastro

    } catch (err) {
      console.error('Erro ao realizar o cadastro:', err);
      alert('Erro ao realizar o cadastro. Tente novamente.');
    }
    // No final do handleSubmit no componente Cadastro

    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', senha);

  };

  return (
    <div className="container px-4 py-5 px-md-5 text-lg-start my-5 borda">
      <form onSubmit={handleSubmit} id="form">

        <h1>Dados de contato</h1>
        <div className="row gx-lg-5 align-items-center mb-3">
          <div className="col-11 col-lg-3 mb-4 my-lg-4">
            <input type="text" className="inputs required form-control" placeholder="Seu nome completo" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>

          <div className="col-11 col-lg-3 mb-4 my-lg-4">
            <input type="email" className="form-control" placeholder="Seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="col-11 col-lg-3 mb-4 my-lg-4">
            <input type="password" className="form-control" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </div>

          <div className="col-11 col-lg-3 mb-4 my-lg-4">
            <input type="text" className="form-control" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
          </div>

          <h1>Dados da organização não governamental</h1>


          <div className="col-11 col-lg-3 mb-4 my-lg-4">
            <input type="date" className="form-control" placeholder="Data de Fundação" value={fundacao} onChange={(e) => setFundacao(e.target.value)} />
          </div>

          <div className="col-11 col-lg-3 mb-4 my-lg-4">
            <input type="text" className="form-control" placeholder="Whatsapp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
          </div>

          <div className="col-11 col-lg-3 mb-4 my-lg-4">
            <textarea rows="3" className="form-control" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          </div>


          <h1>Localização da ONG</h1>
          <div className="col-11 col-lg-3 mb-4 my-lg-4">
            <input type="text" className="form-control" placeholder="CEP" value={cep} onChange={(e) => setCep(e.target.value)} required />
          </div>
          <div className="col-11 col-lg-3 mb-4 my-lg-4">
            <input type="text" className="form-control" placeholder="Estado" value={estado} onChange={(e) => setEstado(e.target.value)} required />
          </div>
          <div className="col-11 col-lg-3 mb-4 my-lg-4">
            <input type="text" className="form-control" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} required />
          </div>
          <div className="col-11 col-lg-3 mb-4 my-lg-4">
            <input type="text" className="form-control" placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} required />
          </div>
          <div className="col-11 col-lg-3 mb-4 my-lg-4">
            <input type="text" className="form-control" placeholder="Logradouro" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} required />
          </div>
          <div className="col-11 col-lg-3 mb-4 my-lg-4">
            <input type="text" className="form-control" placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)} required />
          </div>
          <div className="col-11 col-lg-3 mb-4 my-lg-4">
            <input type="text" className="form-control" placeholder="Complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
          </div>
        </div>

        <div className="form-group">
          <button type="submit" className="mt-3 me-2 py-2 btn ml-auto btn-navbar-custom">Solicitar cadastro</button>
          <button type="button" className="mt-3 py-2 btn ml-auto alt-button" onClick={() => navigate('/login')}>Já tenho cadastro</button>
        </div>
      </form>
    </div>
  );
};

export default Cadastro;
