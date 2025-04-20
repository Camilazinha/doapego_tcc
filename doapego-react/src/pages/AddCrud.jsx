// src/pages/AddCrud.jsx

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
    if (userType !== 'STAFF') {
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

      if (col.key === 'ongId') {
        if (userType === 'STAFF') {
          // STAFF: auto‑preenche e esconde
          initial[col.key] = { id: userOngId };
        } else {
          // MASTER: começa vazio, o usuário vai escolher
          initial[col.key] = '';
        }
        return;
      }

      if (col.tipoBooleano === 'ativo-inativo') {
        initial[col.key] = true;
      } else {
        initial[col.key] = '';
      }
    });
    return initial;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = e => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'radio'
        // para radio de booleano (value "true"/"false") ou enum (value = string)
        ? (value === 'true' ? true : value === 'false' ? false : value)
        : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Força o valor de tipo baseado no userType
    if (entidade === 'administradores') {
      if (userType === 'MASTER') formData.tipo = 'STAFF';
      else if (userType === 'STAFF') formData.tipo = 'FUNCIONARIO';
    }

    // valida todos os campos (colunas + colunasExtras), exceto id
    const vazios = allCols.filter(col => {
      if (col.key === 'id') return false;
      if (col.key === 'fotoPerfil') return false;
      if (col.tipoBooleano === 'ativo-inativo') return false;
      if (col.key === 'ongId' && userType === 'STAFF') return false;

      // Novo: verifica se o campo é obrigatório (default = true se não especificado)
      const isRequired = col.required !== undefined ? col.required : true;

      const val = formData[col.key];
      return isRequired && (!val || (typeof val === 'string' && !val.trim()));
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
      await axios.post(`http://localhost:8080/${config.apiEndpoint}`,
        formData);
      setSuccessMessage(`${config.titulo} adicionado com sucesso!`);
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
          Configuração não encontrada para "{entidade}"
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
              if (col.tipo === 'foreignKey' && col.key === 'ongId') {
                // STAFF: input hidden
                if (userType === 'STAFF') {
                  return (
                    <input
                      key={col.key}
                      type="hidden"
                      name="ongId.id"
                      value={formData.ongId.id}
                    />
                  );
                }
                // MASTER: select para escolher ONG
                return (
                  <div key={col.key} className="mb-4 form-group">
                    <label className="form-label">{col.label}:</label>
                    <select
                      name="ongId"
                      className="form-control form-select"
                      value={formData.ongId}
                      onChange={e => setFormData(prev => ({ ...prev, ongId: e.target.value }))}
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
              if (col.tipoBooleano === 'ativo-inativo') {
                return (

                  <div key={col.key} className="mb-4 form-group">
                    <label className="form-label">{col.label}:</label>
                    <div className="d-flex mb-1">
                      <div className="form-check">
                        <input
                          type="radio"
                          name={col.key}
                          id={`${col.key}-ativo`}
                          value="true"
                          checked={formData[col.key] === true}
                          onChange={() =>
                            setFormData(prev => ({ ...prev, [col.key]: true }))
                          }
                          className="form-check-input"
                        />
                        <label className="form-check-label" htmlFor={`${col.key}-ativo`}>
                          Ativo
                        </label>
                      </div>
                    </div>

                    <div className="d-flex mb-0">
                      <div className="form-check">
                        <input
                          type="radio"
                          name={col.key}
                          id={`${col.key}-inativo`}
                          value="false"
                          checked={formData[col.key] === false}
                          onChange={() =>
                            setFormData(prev => ({ ...prev, [col.key]: false }))
                          }
                          className="form-check-input"
                        />
                        <label className="form-check-label" htmlFor={`${col.key}-inativo`}>
                          Inativo
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
