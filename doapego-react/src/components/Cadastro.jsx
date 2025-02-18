// src/components/Cadastro.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [ongs, setOngs] = useState([]); // ONGs para o FUNCIONARIO_ONG
  const [ongId, setOngId] = useState("");

  // Dados adicionais da ONG (apenas para ONG)
  const [nomeOng, setNomeOng] = useState('');
  const [emailOng, setEmailOng] = useState('');
  const [senhaOng, setSenhaOng] = useState('');
  const [telefone, setTelefone] = useState('');
  const [fundacao, setFundacao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cep, setCep] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (tipoUsuario === 'FUNCIONARIO_ONG') {
      axios.get('http://localhost:8080/ongs')
        .then(response => {
          console.log('Resposta da API para ONGs:', response.data);
          // Tente acessar `items` se existir
          const data = response.data.items || response.data;
          if (Array.isArray(data)) {
            const ongIds = data.map(ong => ({ id: ong.id, nome: ong.nome }));
            setOngs(ongIds);
          } else {
            console.error('Erro: Dados de ONGs não são um array', data);
          }
        })
        .catch(error => console.error('Erro ao carregar ONGs:', error));
    }
  }, [tipoUsuario]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let newOngId = ongId; // Inicializa com o ID selecionado, se for FUNCIONARIO_ONG

      // Se o tipo de usuário é ONG, cria a ONG e atualiza `newOngId`
      if (tipoUsuario === 'ONG') {
        const ongResponse = await axios.post('http://localhost:8080/ongs', {
          nome: nomeOng,
          email: emailOng,
          senha: senhaOng,
          telefone,
          fundacao,
          descricao,
          whatsapp,
          ativo: true
        });

        newOngId = ongResponse.data.id; // Armazena o novo ID da ONG
        localStorage.setItem('ongId', newOngId); // Opcional: armazena no localStorage para futura referência

        // Criação de endereço principal, se aplicável
        await axios.post('http://localhost:8080/enderecos-ong', {
          cep,
          estado,
          cidade,
          bairro,
          logradouro,
          numero,
          complemento,
          latitude: null,
          longitude: null,
          principal: true,
          ativo: true,
          ong: { id: newOngId }
        });
      }

      // Configura os dados do admin, incluindo o `ongId`
      const adminData = {
        nome,
        email,
        senha,
        tipo: tipoUsuario,
        ativo: true,
        ong: tipoUsuario === 'ONG' || tipoUsuario === 'FUNCIONARIO_ONG' ? { id: newOngId } : null
      };

      await axios.post('http://localhost:8080/administradores', adminData);

      // Salva tipo de usuário e credenciais no localStorage para futuras requisições
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userPassword', senha);
      localStorage.setItem('userType', tipoUsuario);

      alert('Cadastro realizado com sucesso!');
      navigate('/login'); // Redireciona para /inicio após o cadastro

    } catch (err) {
      console.error('Erro ao realizar o cadastro:', err);
      alert('Erro ao realizar o cadastro. Tente novamente.');
    }
  };


  return (
    <div className="container px-4 py-5 px-md-5 mt-5 text-lg-start borda">
      <form onSubmit={handleSubmit} id="form" className="px-3">
        <h1>Dados de Contato</h1>
        <div className="row gx-lg-5 align-items-center">
          <div className="col-11 col-lg-4 my-lg-4 mb-4">
            <input
              type="text"
              className="form-control inputs required"
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="col-11 col-lg-4 my-lg-4 mb-4">
            <input
              type="email"
              className="form-control"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="col-11 col-lg-4 mb-4 my-lg-4">
            <input
              type="password"
              className="form-control"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {tipoUsuario === 'ONG' && (
            <>
              <h1>Dados da Organização</h1>
              <div className="col-11 col-lg-4 mb-4 my-lg-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome da ONG"
                  value={nomeOng}
                  onChange={(e) => setNomeOng(e.target.value)}
                  required
                />
              </div>
              <div className="col-11 col-lg-4 mb-4 my-lg-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="E-mail para ONG"
                  value={emailOng}
                  onChange={(e) => setEmailOng(e.target.value)}
                  required
                />
              </div>
              <div className="col-11 col-lg-4 mb-4 my-lg-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Senha para ONG"
                  value={senhaOng}
                  onChange={(e) => setSenhaOng(e.target.value)}
                  required
                />
              </div>
              <div className="col-11 col-lg-4 mb-4 my-lg-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                />
              </div>

              <div className="col-11 col-lg-4 mb-4 my-lg-4">
                <input type="date" className="form-control" placeholder="Data de Fundação" value={fundacao} onChange={(e) => setFundacao(e.target.value)} />
              </div>

              <div className="col-11 col-lg-4 mb-4 my-lg-4">
                <input type="text" className="form-control" placeholder="Whatsapp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
              </div>

              <div className="col-11 col-lg-4 mb-4 my-lg-4">
                <textarea rows="3" className="form-control" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
              </div>

              <h1>Endereço da Organização</h1>
              <div className="col-11 col-lg-4 mb-4 my-lg-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  required
                />
              </div>
              <div className="col-11 col-lg-4 mb-4 my-lg-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  required
                />
              </div>
              <div className="col-11 col-lg-4 mb-4 my-lg-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  required
                />
              </div>
              <div className="col-11 col-lg-4 mb-4 my-lg-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  required
                />
              </div>
              <div className="col-11 col-lg-4 mb-4 my-lg-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Logradouro"
                  value={logradouro}
                  onChange={(e) => setLogradouro(e.target.value)}
                  required
                />
              </div>
              <div className="col-11 col-lg-4 mb-4 my-lg-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Número"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  required
                />
              </div>
              <div className="col-11 col-lg-4 mb-4 my-lg-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Complemento"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </div>
            </>
          )}

          {tipoUsuario === 'FUNCIONARIO_ONG' && (
            <>

              <div className="col-11 col-lg-4 my-lg-4">
                <select
                  className="form-control mb-4 mb-lg-0"
                  value={ongId}
                  onChange={(e) => setOngId(e.target.value)}
                  required
                >
                  <option value="" disabled selected>Escolha uma ONG</option>
                  {ongs.map((ong) => (
                    <option key={ong.id} value={ong.id}>{ong.nome}</option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>

        <div className="col-11 col-lg-3 mb-4 my-lg-4">
          <select
            className="form-control"
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
            required
          >
            <option value="" disabled selected>Selecione o tipo de usuário</option>
            <option value="ONG">ONG</option>
            <option value="FUNCIONARIO_ONG">Funcionário</option>
            <option value="MASTER">Master</option>
          </select>
        </div>

        <div className="col col-12">
          <div className="form-check" id="checkText">
            <input className="form-check-input" type="checkbox" id="invalidCheck2" required />
            <label className="form-check-label" htmlFor="invalidCheck2">
              Eu li e concordo com os termos de uso <strong>(obrigatório)</strong>
            </label>
          </div>

          <div className="form-check" id="checkText">
            <input className="form-check-input" type="checkbox" id="invalidCheck1" required />
            <label className="form-check-label" htmlFor="invalidCheck1">
              Eu li e concordo com a política de privacidade <strong>(obrigatório)</strong>
            </label>
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