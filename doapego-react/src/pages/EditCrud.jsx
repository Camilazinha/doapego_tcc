//src/pages/EditCrud.jsx

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { crudData } from '../constants/crudData';

import errorTriangleIcon from "../img/errortriangle-icon.svg";
import successIcon from "../img/success-icon.svg";

export default function EditCrud() {

  const { entidade, id } = useParams();
  const config = crudData[entidade] || null;

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);


  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/${config.apiEndpoint}/${id}`);
        const itemData = response.data;

        const { id: _, ...dadosCompletos } = itemData;
        setFormData(dadosCompletos);
      }
      catch (err) {
        console.error("Erro ao buscar os dados:", err);
        if (err.response) {
          setError("Erro ao carregar os dados. Tente novamente mais tarde.");
          alert("Erro ao carregar os dados. Tente novamente mais tarde.");
        } else if (err.request) {
          setError("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
          alert("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
        } else {
          setError("Ocorreu um erro inesperado.");
          alert("Ocorreu um erro inesperado.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [config, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // 👇 Trata campos aninhados como "ong.id"
    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey], // Mantém outros campos do objeto
          [childKey]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      const newValue = type === 'checkbox' ? checked : value;
      setFormData(prev => ({ ...prev, [name]: newValue }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMessage(null);

    console.log("Dados sendo enviados:", formData); // <--- ADICIONE ISSO

    // Ajusta estrutura dos dados para enviar no formato certo
    const formDataAjustado = { ...formData };

    // Transforma campos "algumaCoisaId" em objetos { algumaCoisa: { id } }
    Object.entries(formData).forEach(([chave, valor]) => {
      if (chave.endsWith('Id') && chave !== 'id') {
        const chaveBase = chave.replace(/Id$/, '');
        formDataAjustado[chaveBase] = { id: valor };
        delete formDataAjustado[chave];
      }
    });

    try {
      await axios.put(`http://localhost:8080/${config.apiEndpoint}/${id}`, formDataAjustado, {
        headers: {
          'Content-Type': 'application/json' // Força o envio como JSON
        }
      }

      );
      setSuccessMessage(`Dados atualizados com sucesso!`);
    } catch (err) {
      console.error("Erro ao atualizar:", err);

      if (err.response) {
        setError("Erro ao atualizar os dados. Tente novamente mais tarde.");
        alert("Erro ao atualizar os dados. Tente novamente mais tarde.");

      } else if (err.request) {
        setError("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
        alert("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");

      } else {
        setError("Ocorreu um erro inesperado.");
        alert("Ocorreu um erro inesperado.");
      }

    } finally {
      setSaving(false);
    }
  };

  if (!config) return (
    <main className='container my-5 nao-unico-elemento px-5'>
      <div className="alert alert-danger">
        Configuração não encontrada para "{entidade}"
      </div>
    </main>
  );

  if (loading) return (
    <main className='container my-5 nao-unico-elemento px-5'>
      <h2 className='titulo-pagina mb-5'>{config.titulo}</h2>
      <section className='p-5 d-flex justify-content-center align-items-center flex-column'>
        <div className='spinner-border text-secondary m-3' role='status' style={{ width: '3rem', height: '3rem' }}></div>
        <p className='loading-text'>Carregando...</p>
      </section>
    </main>
  );

  return (
    <main>
      <div className='container my-5 nao-unico-elemento px-5'>
        <h2 className='titulo-pagina mb-5'>EDITAR {config.titulo}</h2>

        {error && (
          <div className="alert alert-danger d-flex">
            <img src={errorTriangleIcon} className="me-2" alt="erro" />
            <p className="erro">{error}</p>
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
            {[...config.colunas, ...(config.colunasExtras || [])].map(col => {
              // Oculta campos que terminam com 'Id' ou são chaves estrangeiras .id
              const isOculto = col.key.endsWith('Id') || (col.tipo === 'foreignKey' && col.key === 'ong');
              if (col.key === "id" || isOculto) return null;

              if (col.tipo === 'foreignKey') {
                return (
                  <input
                    key={col.key}
                    type="hidden"
                    name={`${col.key}.id`}
                    value={formData[col.key]?.id || ''}
                    disabled
                  />
                );
              }

              const tipoBooleano = col.tipoBooleano || 'sim-nao';
              const [opcaoTrue, opcaoFalse] = tipoBooleano === 'ativo-inativo'
                ? ['Ativo', 'Inativo']
                : ['Sim', 'Não'];

              const isStatusAtivoInativoString =
                col.key === 'statusOng' &&
                typeof formData[col.key] === 'string' &&
                ['ATIVO', 'INATIVO'].includes(formData[col.key]);

              const isBoolean = typeof formData[col.key] === 'boolean' || [1, 0].includes(formData[col.key]);

              return (
                <div key={col.key} className="mb-3">
                  <label className="form-label">{col.label}:</label>
                  {isStatusAtivoInativoString ? (
                    <div className="d-flex gap-3">
                      <div className="form-check">
                        <input
                          type="radio"
                          name={col.key}
                          id={`${col.key}-ativo`}
                          value="ATIVO"
                          checked={formData[col.key] === 'ATIVO'}
                          onChange={(e) =>
                            setFormData({ ...formData, [col.key]: e.target.value })
                          }
                          className="form-check-input"
                        />
                        <label className="form-check-label" htmlFor={`${col.key}-ativo`}>
                          Ativo
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          type="radio"
                          name={col.key}
                          id={`${col.key}-inativo`}
                          value="INATIVO"
                          checked={formData[col.key] === 'INATIVO'}
                          onChange={(e) =>
                            setFormData({ ...formData, [col.key]: e.target.value })
                          }
                          className="form-check-input"
                        />
                        <label className="form-check-label" htmlFor={`${col.key}-inativo`}>
                          Inativo
                        </label>
                      </div>
                    </div>
                  ) : isBoolean ? (
                    <div className="d-flex gap-3">
                      <div className="form-check">
                        <input
                          type="radio"
                          name={col.key}
                          id={`${col.key}-true`}
                          value="true"
                          checked={!!formData[col.key]}
                          onChange={(e) => setFormData({
                            ...formData,
                            [col.key]: e.target.value === 'true'
                          })}
                          className="form-check-input"
                        />
                        <label className="form-check-label" htmlFor={`${col.key}-true`}>
                          {opcaoTrue}
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          type="radio"
                          name={col.key}
                          id={`${col.key}-false`}
                          value="false"
                          checked={!formData[col.key]}
                          onChange={(e) => setFormData({
                            ...formData,
                            [col.key]: e.target.value === 'true'
                          })}
                          className="form-check-input"
                        />
                        <label className="form-check-label" htmlFor={`${col.key}-false`}>
                          {opcaoFalse}
                        </label>
                      </div>
                    </div>
                  ) : (
                    <input
                      type="text"
                      name={col.key}
                      value={formData[col.key] || ''}
                      onChange={handleChange}
                      className="form-control"
                    />
                  )}
                </div>
              );
            })}

            <button type="submit" className="btn btn-custom-filled" disabled={saving}>
              {saving ? "Salvando..." : "Salvar Alterações"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
