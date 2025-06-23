// src/pages/AddCrud.jsx

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { formatarTelefone, formatarCEP, removerMascara } from '../helpers/masks';
import { buscarCEP } from '../helpers/cepService';
import { crudData } from '../constants/crudData';

import errorTriangleIcon from "../img/errortriangle-icon.svg";
import successIcon from "../img/success-icon.svg";

export default function AddCrud() {

  const { entidade } = useParams();
  const config = crudData[entidade] || null;

  const tipo = localStorage.getItem('tipo') || '';
  const userOngId = Number(localStorage.getItem('ongId'));

  const [opcaoOngs, setOpcaoOngs] = useState([]);

  useEffect(() => {
    if (tipo === 'MASTER') {
      axios.get('http://localhost:8080/ongs?statusOng=ATIVO')
        .then(res => {
          setOpcaoOngs(res.data.items);
        })
        .catch(err => {
          console.error('Erro ao buscar ONGs:', err);
          setOpcaoOngs([]);
        });
    }
  }, [tipo]);

  useEffect(() => {
    const bloquearAcesso = () => {

      if (entidade === 'usuarios' || entidade === 'ongs') {
        setErro("Criação não permitida para esta entidade");
        return true;
      }

      if (entidade === 'categorias-doacao' && tipo !== 'MASTER') {
        setErro("Somente MASTER pode criar categorias");
        return true;
      }

      if (entidade === 'enderecos-ong' && !['STAFF', 'FUNCIONARIO'].includes(tipo)) {
        setErro("Acesso restrito a membros da ONG");
        return true;
      }

      if (entidade === 'administradores' && !['MASTER', 'STAFF'].includes(tipo)) {
        setErro("Sem permissão para criar administradores");
        return true;
      }

      return false;
    };

    if (bloquearAcesso()) {
      setCarregando(false);
    }
  }, [entidade, tipo]);

  const listaOngs = Array.isArray(opcaoOngs) ? opcaoOngs : [];

  const todasColunas = config
    ? [...config.colunas, ...(config.colunasExtras || []), ...(config.colunasFormulario || [])]
    : [];

  const [formData, setFormData] = useState(() => {
    const initial = {};
    todasColunas.forEach(coluna => {
      if (coluna.key === 'id') return;

      if (coluna.tipoBooleano === 'ativo-inativo') {
        initial[coluna.key] = true;
      }
      else if (coluna.tipoBooleano === 'sim-nao') {
        initial[coluna.key] = false;
      }
      else {
        initial[coluna.key] = '';
      }

      if (coluna.key === 'ong.id') {
        if (['STAFF', 'FUNCIONARIO'].includes(tipo)) {
          initial[coluna.key] = Number(userOngId);
        } else {
          initial[coluna.key] = '';
        }
        return;
      }
    });
    return initial;
  });

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [erroValidacao, setErroValidacao] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [buscandoCEP, setBuscandoCEP] = useState(false);

  const handleCEPChange = async (e) => {
    const { value } = e.target;
    const cepLimpo = removerMascara(value);

    const cepFormatado = formatarCEP(value);
    setFormData(prev => ({ ...prev, cep: cepFormatado }));

    if (cepLimpo.length === 8) {
      setBuscandoCEP(true);
      try {
        const endereco = await buscarCEP(cepLimpo);

        if (endereco) {
          setFormData(prev => ({
            ...prev,
            logradouro: endereco.logradouro,
            bairro: endereco.bairro,
            cidade: endereco.cidade,
            estado: endereco.estado
          }));
        }
      } catch (erro) {
        alert('CEP não encontrado!');
      } finally {
        setBuscandoCEP(false);
      }
    }
  };

  const handleChange = e => {
    const { name, value, type } = e.target;
    let valorFormatado = value;

    if (name === "telefone" || name === "whatsapp") {
      valorFormatado = formatarTelefone(value);
    }
    else if (name === 'cep') {
      valorFormatado = formatarCEP(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'radio'
        ? (value === 'true' ? true : value === 'false' ? false : value)
        : valorFormatado
    }));
  };

  const handleSubmit = async e => {

    e.preventDefault();
    const dadosLimpos = {
      ...formData,
      telefone: removerMascara(formData.telefone),
      whatsapp: removerMascara(formData.whatsapp),
      cep: removerMascara(formData.cep)
    };

    if (entidade === 'administradores') {
      if (tipo === 'MASTER') dadosLimpos.tipo = 'STAFF';
      else if (tipo === 'STAFF') dadosLimpos.tipo = 'FUNCIONARIO';
    }

    const vazios = todasColunas.filter(coluna => {
      if (coluna.key === 'id') return false;
      if (coluna.key === 'fotoPerfil') return false;
      if (coluna.tipoBooleano === 'ativo-inativo') return false;
      if (coluna.tipoBooleano === 'sim-nao') return false;
      if (coluna.key === 'ong.id' && ['STAFF', 'FUNCIONARIO'].includes(tipo)) return false;
      return coluna.required && !formData[coluna.key];
    });

    if (vazios.length > 0) {
      setErroValidacao(
        `Por favor, preencha: ${vazios.map(c => c.label).join(', ').toLowerCase()}`
      );
      return;
    }
    setErroValidacao('');
    setCarregando(true);
    setErro(null);

    try {
      const payload = { ...dadosLimpos };
      delete payload.id;
      payload.rawPassword = payload.senha;
      delete payload.senha;

      if (payload['ong.id'] !== undefined) {
        payload.ong = { id: Number(payload['ong.id']) };
        delete payload['ong.id'];
      }

      await axios.post(`http://localhost:8080/${config.apiEndpoint}`,
        payload
      );
      setMensagemSucesso(`Adicionado com sucesso!`);

      const reset = {};
      todasColunas.forEach(coluna => {
        if (coluna.key === 'id') return;
        reset[coluna.key] = (coluna.tipoBooleano === 'ativo-inativo')
          ? true
          : '';
      });
      setFormData(reset);

    } catch (err) {
      console.error("Erro ao adicionar:", err);
      if (err.response) {
        setErro("Erro ao carregar os dados. Tente novamente mais tarde.");
        alert("Erro ao carregar os dados. Tente novamente mais tarde.");
      }
      else if (err.request) {
        setErro("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
        alert("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
      }
      else {
        setErro("Ocorreu um erro inesperado.");
        alert("Ocorreu um erro inesperado.");
      }
    }
    finally {
      setCarregando(false);
    }
  };

  if (!config) {
    return (
      <main className='container my-5 nao-unico-elemento px-5'>
        <div className="alert alert-danger d-flex">
          <img src={errorTriangleIcon} className="me-2" alt="erro" />
          Não foi possível encontrar "{entidade}"
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className='container my-5 nao-unico-elemento px-5'>
        <h2 className='titulo-pagina mb-5'>CRIAR {config.titulo}</h2>

        {(erro || erroValidacao) && (
          <div className="alert alert-danger d-flex">
            <img src={errorTriangleIcon} className="me-2" alt="erro" />
            <p className="erro">{erro || erroValidacao}</p>
          </div>
        )}

        {mensagemSucesso && (
          <div className="alert alert-success d-flex">
            <img src={successIcon} className="me-2" alt="sucesso" />
            <p className="sucesso">{mensagemSucesso}</p>
          </div>
        )}

        <section className='container form-container-crud bg-white'>
          <form onSubmit={handleSubmit}>

            {todasColunas.map(coluna => {
              if (coluna.key === 'id') return null;

              const isCampoTipo = coluna.key === 'tipo';
              const isPaginaAdmin = entidade === 'administradores';
              const tipoFixo = isPaginaAdmin && isCampoTipo
                ? (tipo === 'MASTER' ? 'STAFF' : tipo === 'STAFF' ? 'FUNCIONARIO' : null)
                : null;

              // CHAVE ESTRANGEIRA
              if (coluna.key === 'ong.id') {
                if (['STAFF', 'FUNCIONARIO'].includes(tipo)) {
                  return (
                    <input
                      key={coluna.key}
                      type="hidden"
                      name={coluna.key}
                      value={formData[coluna.key] || ''}
                    />
                  );
                }

                // MASTER: SELECT ONG
                return (
                  <div key={coluna.key} className="mb-4 form-group">
                    <label className="form-label">{coluna.label}:</label>
                    <select
                      name={coluna.key}
                      className="form-select"
                      value={formData[coluna.key] || ''}
                      onChange={handleChange}
                    >
                      <option className="text-muted" value="">Selecione</option>
                      {listaOngs.map(o => (
                        <option key={o.id} value={o.id}>
                          {o.id}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }

              // DISABLED
              if (tipoFixo) {
                return (
                  <div key={coluna.key} className="mb-4 form-group">
                    <label className="form-label">{coluna.label}:</label>
                    <select
                      name={coluna.key}
                      value={tipoFixo}
                      className="form-select"
                      disabled
                    >
                      <option value={tipoFixo}>{tipoFixo}</option>
                    </select>
                  </div>
                );
              }

              // ENUM OU BOOLEANO
              if (coluna.tipoBooleano === 'ativo-inativo' || coluna.tipoBooleano === 'sim-nao') {
                return (
                  <div key={coluna.key} className="mb-4 form-group">
                    <label className="form-label">{coluna.label}:</label>
                    <div className="d-flex gap-3 mb-1">

                      {/* SIM/ATIVO */}
                      <div className="form-check">
                        <input
                          type="radio"
                          name={coluna.key}
                          id={`${coluna.key}-sim`}
                          value="true"
                          checked={formData[coluna.key] === true}
                          onChange={() => setFormData(prev => ({ ...prev, [coluna.key]: true }))}
                          className="form-check-input"
                        />
                        <label className="form-check-label" htmlFor={`${coluna.key}-sim`}>
                          {coluna.tipoBooleano === 'sim-nao' ? 'Sim' : 'Ativo'}
                        </label>
                      </div>

                      {/* NAO/INATIVO */}
                      <div className="form-check">
                        <input
                          type="radio"
                          name={coluna.key}
                          id={`${coluna.key}-nao`}
                          value="false"
                          checked={formData[coluna.key] === false}
                          onChange={() => setFormData(prev => ({ ...prev, [coluna.key]: false }))}
                          className="form-check-input"
                        />
                        <label className="form-check-label" htmlFor={`${coluna.key}-nao`}>
                          {coluna.tipoBooleano === 'sim-nao' ? 'Não' : 'Inativo'}
                        </label>
                      </div>

                    </div>
                  </div>
                );
              }

              // SELECT
              if (coluna.opcoesSelect) {
                return (

                  <div key={coluna.key} className="form-group mb-4">
                    <label className="form-label">{coluna.label}:</label>
                    <select
                      name={coluna.key}
                      value={formData[coluna.key]}
                      onChange={handleChange}
                      className='form-control form-select'>
                      <option className='text-muted' value="">Selecione uma opção</option>
                      {coluna.opcoesSelect.map((opt, idx) => (
                        <option key={idx} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                );
              }

              // FORMATAR NUMERO
              ['telefone', 'whatsapp'].includes(coluna.key) && (
                <div className="form-group mb-4" key={coluna.key}>
                  <label className="form-label">{coluna.label}:</label>
                  <input
                    type="text"
                    name={coluna.key}
                    className="form-control"
                    value={formData[coluna.key] || ''}
                    onChange={handleChange}
                    inputMode="numeric"
                    placeholder={coluna.key === 'cep' ? '00000-000' : '(00) 00000-0000'}
                  />
                </div>
              )

              // FORMATAR CEP
              coluna.key === 'cep' && (
                <div className="form-group mb-4" key={coluna.key}>
                  <label className="form-label">{coluna.label}:</label>
                  <div className="input-group">
                    <input
                      type="text"
                      name={coluna.key}
                      className="form-control"
                      value={formData[coluna.key] || ''}
                      onChange={handleCEPChange}
                      inputMode="numeric"
                      disabled={buscandoCEP}
                      placeholder="00000-000"
                    />
                    {buscandoCEP && (
                      <span className="input-group-text">
                        <div className="spinner-border spinner-border-sm text-secondary" role="status">
                          <span className="visually-hidden">Carregando...</span>
                        </div>
                      </span>
                    )}
                    {/* VER ESSE TRECHO FUNCIONAR NA PRÁTICA */}
                  </div>
                </div>
              )

              // SENHA
              if (coluna.tipo === 'password') {
                return (
                  <div className='form-group mb-4' key={coluna.key}>
                    <label className="form-label">{coluna.label}:</label>
                    <input
                      type="password"
                      name={coluna.key}
                      className="form-control"
                      value={formData[coluna.key] || ''}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                  </div>
                );
              }

              // PADRAO (TEXTO)
              return (
                <div key={coluna.key} className="form-group mb-4">
                  <label className="form-label">{coluna.label}:</label>
                  <input
                    type="text"
                    name={coluna.key}
                    className="form-control"
                    value={formData[coluna.key]}
                    onChange={handleChange}
                    required={coluna.required}
                  />
                </div>
              );
            })}

            <button type="submit" className="btn btn-custom-filled" disabled={carregando}>
              {carregando ? "Adicionando..." : "Adicionar"}
            </button>

          </form>
        </section>
      </div>
    </main>
  );
}
