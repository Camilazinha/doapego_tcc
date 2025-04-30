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
  const userOngId = localStorage.getItem('ongId');

  const config = crudData[entidade] || null;

  // pega tipo do usuário do localStorage
  const [userType] = useState(localStorage.getItem('tipo') || '');
  const [ongOptions, setOngOptions] = useState([]);

  useEffect(() => {
    if (!['STAFF', 'FUNCIONARIO'].includes(userType)) { // 👈 Corrigido
      axios.get('http://localhost:8080/ongs?statusOng=ATIVO')
        .then(res => {
          setOngOptions(res.data.items);
        })
        .catch(err => {
          console.error('Erro ao buscar ONGs:', err);
          setOngOptions([]);
        });
    }
  }, [userType]);

  useEffect(() => {
    // Verifica permissões antes de carregar qualquer dado
    const bloquearAcesso = () => {
      if (entidade === 'usuarios' || entidade === 'ongs') {
        setError("Criação não permitida para esta entidade");
        return true;
      }

      if (entidade === 'categorias-doacao' && userType !== 'MASTER') {
        setError("Somente MASTER pode criar categorias");
        return true;
      }

      if (entidade === 'enderecos-ong' && !['STAFF', 'FUNCIONARIO'].includes(userType)) {
        setError("Acesso restrito a membros da ONG");
        return true;
      }

      if (entidade === 'administradores' && !['MASTER', 'STAFF'].includes(userType)) {
        setError("Sem permissão para criar administradores");
        return true;
      }

      return false;
    };

    if (bloquearAcesso()) {
      setLoading(false); // Impede o carregamento
    }
  }, [entidade, userType]);

  // no topo do seu componente, logo depois de const allCols:
  const listaOngs = Array.isArray(ongOptions) ? ongOptions : [];

  // 1) junta todas as colunas
  const allCols = config
    ? [...config.colunas, ...(config.colunasExtras || []), ...(config.colunasFormulario || [])]
    : [];

  // 2) inicializa formData com TODAS as chaves (exceto id)
  const [formData, setFormData] = useState(() => {
    const initial = {};
    allCols.forEach(col => {
      if (col.key === 'id') return;

      // Alterado para tratar 'ong.id' diretamente
      if (col.key === 'ong.id') {
        if (['STAFF', 'FUNCIONARIO'].includes(userType)) { // 👈 Corrigido
          initial[col.key] = Number(userOngId); // Valor direto
        } else {
          initial[col.key] = '';
        }
        return;
      }

      if (col.tipoBooleano === 'ativo-inativo') {
        initial[col.key] = true;
      }
      else if (col.tipoBooleano === 'sim-nao') {
        initial[col.key] = false;
      }
      else {
        initial[col.key] = '';
      }

    });
    return initial;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [buscandoCEP, setBuscandoCEP] = useState(false);

  const handleCEPChange = async (e) => {
    const { value } = e.target;
    const cepLimpo = removerMascara(value);

    // Aplica máscara
    const cepFormatado = formatarCEP(value);
    setFormData(prev => ({ ...prev, cep: cepFormatado }));

    // Busca automática quando tiver 8 dígitos
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
      } catch (error) {
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
        // para radio de booleano (value "true"/"false") ou enum (value = string)
        ? (value === 'true' ? true : value === 'false' ? false : value)
        : valorFormatado

    }));
  };

  const handleSubmit = async e => {
    console.log('Dados a serem enviados:', formData);

    e.preventDefault();
    const dadosLimpos = {
      ...formData,
      telefone: removerMascara(formData.telefone),
      whatsapp: removerMascara(formData.whatsapp),
      cep: removerMascara(formData.cep)
    };
    // Força o valor de tipo baseado no userType
    if (entidade === 'administradores') {
      if (userType === 'MASTER') dadosLimpos.tipo = 'STAFF';
      else if (userType === 'STAFF') dadosLimpos.tipo = 'FUNCIONARIO';
    }

    // valida todos os campos (colunas + colunasExtras), exceto id
    // No handleSubmit (~linha 94):
    const vazios = allCols.filter(col => {
      if (col.key === 'id') return false;
      if (col.key === 'fotoPerfil') return false;
      if (col.tipoBooleano === 'ativo-inativo') return false;
      if (col.tipoBooleano === 'sim-nao') return false;
      if (col.key === 'ong.id' && ['STAFF', 'FUNCIONARIO'].includes(userType)) return false; // 👈 Corrigido

      // Corrigido: Retorna diretamente a verificação
      return col.required && !formData[col.key];
    });
    if (vazios.length > 0) {
      setValidationError(
        `Por favor, preencha: ${vazios.map(c => c.label).join(', ').toLowerCase()}`
      );
      return;
    }
    // limpa erro anterior
    setValidationError('');

    setLoading(true);
    setError(null);

    try {
      const payload = { ...dadosLimpos };
      delete payload.id;
      payload.rawPassword = payload.senha;
      delete payload.senha;
      // Move 'ong.id' para dentro de um objeto 'ong'
      if (payload['ong.id'] !== undefined) {
        payload.ong = { id: Number(payload['ong.id']) };
        delete payload['ong.id']; // Remove a chave antiga
      }


      console.log('Payload final:', payload);

      await axios.post(`http://localhost:8080/${config.apiEndpoint}`,
        payload
      );
      setSuccessMessage(`Adicionado com sucesso!`);
      // reset
      const reset = {};
      allCols.forEach(col => {
        if (col.key === 'id') return;
        reset[col.key] = (col.tipoBooleano === 'ativo-inativo')
          ? true
          : '';
      });
      setFormData(reset);

    } catch (err) {
      console.error("Erro ao adicionar:", err);
      if (err.response) {
        setError("Erro ao carregar os dados. Tente novamente mais tarde.");
        alert("Erro ao carregar os dados. Tente novamente mais tarde.");
      }
      else if (err.request) {
        setError("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
        alert("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
      } else {
        setError("Ocorreu um erro inesperado.");
        alert("Ocorreu um erro inesperado.");
      }
    }

    finally {
      setLoading(false);
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

        {(error || validationError) && (
          <div className="alert alert-danger d-flex">
            <img src={errorTriangleIcon} className="me-2" alt="erro" />
            <p className="erro">{error || validationError}</p>
          </div>
        )}

        {successMessage && (
          <div className="alert alert-success d-flex">
            <img src={successIcon} className="me-2" alt="sucesso" />
            <p className="sucesso">{successMessage}</p>
          </div>
        )}

        <section className='container form-container-crud bg-white'>
          <form onSubmit={handleSubmit}>

            {allCols.map(col => {
              if (col.key === 'id') return null;

              // lógica de tipo fixo (MASTER → STAFF / STAFF → FUNCIONARIO)
              const isTipoField = col.key === 'tipo';
              const isAdminPage = entidade === 'administradores';
              const tipoFixo = isAdminPage && isTipoField
                ? (userType === 'MASTER' ? 'STAFF' : userType === 'STAFF' ? 'FUNCIONARIO' : null)
                : null;

              // 1) foreignKey -> hidden
              if (col.key === 'ong.id') {
                // STAFF: input hidden
                if (['STAFF', 'FUNCIONARIO'].includes(userType)) { // 👈 Corrigido
                  return (
                    <input
                      key={col.key}
                      type="hidden"
                      name={col.key}
                      value={formData[col.key] || ''}
                    />
                  );
                }
                // MASTER: select para escolher ONG
                return (
                  <div key={col.key} className="mb-4 form-group">
                    <label className="form-label">{col.label}:</label>
                    <select
                      name={col.key}
                      className="form-control form-select"
                      value={formData[col.key] || ''}
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

              // 2) tipo fixo (select disabled)
              if (tipoFixo) {
                return (

                  <div key={col.key} className="mb-4 form-group">

                    <label className="form-label">{col.label}:</label>
                    <select
                      name={col.key}
                      value={tipoFixo}
                      className="form-control form-select"
                      disabled
                    >
                      <option value={tipoFixo}>{tipoFixo}</option>
                    </select>
                  </div>
                );
              }

              // 3) radio ativo-inativo (enum ou booleano)
              // 1. Modifique a condição que verifica o tipo booleano:
              if (col.tipoBooleano === 'ativo-inativo' || col.tipoBooleano === 'sim-nao') { // <-- Alterado aqui
                return (
                  <div key={col.key} className="mb-4 form-group">
                    <label className="form-label">{col.label}:</label>
                    <div className="d-flex gap-3 mb-1"> {/* Adicionei gap para espaçamento */}

                      {/* Opção Sim/Ativo */}
                      <div className="form-check">
                        <input
                          type="radio"
                          name={col.key}
                          id={`${col.key}-sim`}
                          value="true"
                          checked={formData[col.key] === true}
                          onChange={() => setFormData(prev => ({ ...prev, [col.key]: true }))}
                          className="form-check-input"
                        />
                        <label className="form-check-label" htmlFor={`${col.key}-sim`}>
                          {col.tipoBooleano === 'sim-nao' ? 'Sim' : 'Ativo'} {/* Label dinâmico */}
                        </label>
                      </div>

                      {/* Opção Não/Inativo */}
                      <div className="form-check">
                        <input
                          type="radio"
                          name={col.key}
                          id={`${col.key}-nao`}
                          value="false"
                          checked={formData[col.key] === false}
                          onChange={() => setFormData(prev => ({ ...prev, [col.key]: false }))}
                          className="form-check-input"
                        />
                        <label className="form-check-label" htmlFor={`${col.key}-nao`}>
                          {col.tipoBooleano === 'sim-nao' ? 'Não' : 'Inativo'} {/* Label dinâmico */}
                        </label>
                      </div>

                    </div>
                  </div>
                );
              }

              // 4) selectOptions (se existir)
              if (col.selectOptions) {
                return (

                  <div key={col.key} className="form-group mb-4">
                    <label className="form-label">{col.label}:</label>
                    <select
                      name={col.key}
                      value={formData[col.key]}
                      onChange={handleChange}
                      className='form-control form-select'>
                      <option className='text-muted' value="">Selecione uma opção</option>
                      {col.selectOptions.map((opt, idx) => (
                        <option key={idx} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                );
              }


              ['telefone', 'whatsapp'].includes(col.key) && (
                <div className="form-group mb-4" key={col.key}>
                  <label className="form-label">{col.label}:</label>
                  <input
                    type="text"
                    name={col.key}
                    className="form-control"
                    value={formData[col.key] || ''}
                    onChange={handleChange}
                    inputMode="numeric"
                    placeholder={col.key === 'cep' ? '00000-000' : '(00) 00000-0000'}
                  />
                </div>
              )



              col.key === 'cep' && (
                <div className="form-group mb-4" key={col.key}>
                  <label className="form-label">{col.label}:</label>
                  <div className="input-group">
                    <input
                      type="text"
                      name={col.key}
                      className="form-control"
                      value={formData[col.key] || ''}
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
                  </div>
                </div>
              )


              // 5) campo de senha (password)
              if (col.tipo === 'password') {
                return (
                  <div className='form-group mb-4' key={col.key}>
                    <label className="form-label">{col.label}:</label>
                    <input
                      type="password" // 👈 Tipo password para esconder caracteres
                      name={col.key}
                      className="form-control"
                      value={formData[col.key] || ''}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                  </div>
                );
              }
              return (

                <div key={col.key} className="form-group mb-4">
                  <label className="form-label">{col.label}:</label>
                  <input
                    type="text"
                    name={col.key}
                    className="form-control"
                    value={formData[col.key]}
                    onChange={handleChange}
                    required={col.required}
                  />

                </div>
              );
            })}

            <button
              type="submit"
              className="btn btn-custom-filled"
              disabled={loading}
            >
              {loading ? "Adicionando..." : "Adicionar"}
            </button>

          </form>
        </section>
      </div>
    </main>
  );
}
