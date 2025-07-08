// src/pages/AddCrud.jsx
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formatarCEP, removerMascara } from '../helpers/masks';
import { buscarCEP } from '../helpers/cepService';
import { crudData } from '../constants/crudData';
import errorTriangleIcon from "../img/errortriangle-icon.svg";
import successIcon from "../img/success-icon.svg";

export default function AddCrud() {
  const { entidade } = useParams();
  const config = crudData[entidade] || null;

  const userType = localStorage.getItem('tipo') || '';
  const userOngId = Number(localStorage.getItem('ongId'));
  const [ongOptions, setOngOptions] = useState([]);

  useEffect(() => {

    if (userType === 'MASTER') {
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
    const bloquearAcesso = () => {

      if (entidade === 'usuarios' || entidade === 'ongs') {
        setError("Criação não permitida para esta entidade.");
        return true;
      }

      if (entidade === 'categorias-doacao' && userType !== 'MASTER') {
        setError("Acesso não autorizado.");
        return true;
      }

      if (entidade === 'enderecos-ong' && !['STAFF', 'FUNCIONARIO'].includes(userType)) {
        setError("Acesso não autorizado.");
        return true;
      }

      if (entidade === 'administradores' && !['MASTER', 'STAFF'].includes(userType)) {
        setError("Acesso não autorizado.");
        return true;
      }

      return false;
    };

    if (bloquearAcesso()) {
      setLoading(false);
    }
  }, [entidade, userType]);

  const listaOngs = Array.isArray(ongOptions) ? ongOptions : [];

  const allCols = config
    ? [...config.colunas, ...(config.colunasExtras || []), ...(config.colunasFormulario || [])]
    : [];

  const [formData, setFormData] = useState(() => {
    const initial = {};
    allCols.forEach(col => {
      if (col.key === 'id') return;

      if (col.tipoBooleano === 'ativo-inativo') {
        initial[col.key] = true;
      }
      else if (col.tipoBooleano === 'sim-nao') {
        initial[col.key] = false;
      }
      else {
        initial[col.key] = '';
      }

      if (col.key === 'ong.id') {
        if (['STAFF', 'FUNCIONARIO'].includes(userType)) {
          initial[col.key] = Number(userOngId);
        } else {
          initial[col.key] = '';
        }
        return;
      }
    });
    return initial;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [buscandoCEP, setBuscandoCEP] = useState(false);

  useEffect(() => {
    let timer;
    if (error || success) {
      timer = setTimeout(() => {
        setError(null);
        setSuccess('');
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [error, success]);

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
      } catch (error) {
        setError('CEP não encontrado.');
      } finally {
        setBuscandoCEP(false);
      }
    }
  };

  const handleChange = e => {
    const { name, value, type } = e.target;

    const valorFormatado = name === 'cep'
      ? formatarCEP(value)
      : value;

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
      cep: removerMascara(formData.cep)
    };

    if (entidade === 'administradores') {
      if (userType === 'MASTER') dadosLimpos.tipo = 'STAFF';
      else if (userType === 'STAFF') dadosLimpos.tipo = 'FUNCIONARIO';
    }

    const vazios = allCols.filter(col => {
      if (col.key === 'id') return false;
      if (col.key === 'fotoPerfil') return false;
      if (col.tipoBooleano === 'ativo-inativo') return false;
      if (col.tipoBooleano === 'sim-nao') return false;
      if (col.key === 'ong.id' && ['STAFF', 'FUNCIONARIO'].includes(userType)) return false;
      return col.required && !formData[col.key];
    });

    if (vazios.length > 0) {
      setError(
        `Por favor, preencha: ${vazios.map(c => c.label).join(', ').toLowerCase()}`
      );
      return;
    }
    setLoading(true);
    setError(null);

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
      setSuccess(`Registro adicionado com sucesso.`);

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
        setError("Falha ao carregar os dados. Tente novamente.");
      } else if (err.request) {
        setError("Não foi possível conectar ao servidor. Tente novamente.");
      } else {
        setError("Ocorreu um erro inesperado.");
      }
    }
    finally {
      setLoading(false);
    }
  };

  if (!config) return (
    <main className='container my-5 nao-unico-elemento px-5'>
      <div className="alert alert-danger d-flex">
        <img src={errorTriangleIcon} className="me-2" alt="erro" />
        Não foi possível encontrar "{entidade}"
      </div>
    </main>
  );

  return (
    <main>
      {error &&
        <div className="alert alert-danger d-flex align-items-start popup-alert w-25">
          <img src={errorTriangleIcon} className="me-2" alt="erro" />

          <div className='ms-1'>
            <p className="fw-semibold alert-heading">Erro!</p>
            <p className="mb-0">{error}</p>
          </div>
        </div>}

      {success &&
        <div className="alert alert-success d-flex align-items-center popup-alert w-25">
          <img src={successIcon} className="me-2" alt="sucesso" />

          <div className='ms-1'>
            <p className="fw-semibold alert-heading">Sucesso!</p>
            <p className="mb-0">{success}</p>
          </div>
        </div>}

      <div className='container my-5 nao-unico-elemento px-5'>
        <h2 className='titulo-pagina mb-5'>CRIAR {config.titulo}</h2>

        <section className='container form-container-crud bg-white'>
          <form onSubmit={handleSubmit}>

            {allCols.map(col => {
              if (col.key === 'id') return null;

              const isTipoField = col.key === 'tipo';
              const isAdminPage = entidade === 'administradores';
              const tipoFixo = isAdminPage && isTipoField
                ? (userType === 'MASTER' ? 'STAFF' : userType === 'STAFF' ? 'FUNCIONARIO' : null)
                : null;

              // CHAVE ESTRANGEIRA
              if (col.key === 'ong.id') {
                if (['STAFF', 'FUNCIONARIO'].includes(userType)) {
                  return (
                    <input
                      key={col.key}
                      type="hidden"
                      name={col.key}
                      value={formData[col.key] || ''}
                    />
                  );
                }

                // MASTER: SELECT ONG
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

              // DISABLED
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

              // ENUM OU BOOLEANO
              if (col.tipoBooleano === 'ativo-inativo' || col.tipoBooleano === 'sim-nao') {
                return (
                  <div key={col.key} className="mb-4 form-group">
                    <label className="form-label">{col.label}:</label>
                    <div className="d-flex gap-3 mb-1">

                      {/* SIM/ATIVO */}
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
                          {col.tipoBooleano === 'sim-nao' ? 'Sim' : 'Ativo'}
                        </label>
                      </div>

                      {/* NAO/INATIVO */}
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
                          {col.tipoBooleano === 'sim-nao' ? 'Não' : 'Inativo'}
                        </label>
                      </div>

                    </div>
                  </div>
                );
              }

              // SELECT
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

              // FORMATAR CEP
              if (col.key === 'cep') {
                return (
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
                );
              }

              // SENHA
              if (col.tipo === 'password') {
                return (
                  <div className='form-group mb-4' key={col.key}>
                    <label className="form-label">{col.label}:</label>
                    <input
                      type="password"
                      name={col.key}
                      className="form-control"
                      value={formData[col.key] || ''}
                      minLength={6}
                      maxLength={20}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                  </div>
                );
              }

              // NORMAL
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

            <button type="submit" className="btn btn-custom-filled" disabled={loading}>
              {loading ? "Adicionando..." : "Adicionar"}
            </button>

          </form>
        </section>
      </div>
    </main>
  );
}
