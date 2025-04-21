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

  const [userType] = useState(localStorage.getItem('tipo') || '');
  const userId = localStorage.getItem('id') || '';
  const userOngId = localStorage.getItem('ongId');

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const validarPermissoes = () => {
      // 1. Bloqueia totalmente edição de usuários
      if (entidade === 'usuarios') {
        setError("Edição de usuários não é permitida");
        return false;
      }

      // 2. Categorias só podem ser editadas por MASTER
      if (entidade === 'categorias-doacao' && userType !== 'MASTER') {
        setError("Somente MASTER pode editar categorias");
        return false;
      }

      // 3. Administradores só podem editar a si próprios
      if (entidade === 'administradores' && userId !== id) {
        setError("Você só pode editar seu próprio perfil!");
        return false;
      }

      // 4. Endereço e ONG só por STAFF/FUNCIONARIO da mesma ONG
      if (entidade === 'enderecos-ong' || entidade === 'ongs') {
        if (!['STAFF', 'FUNCIONARIO'].includes(userType)) {
          setError("Acesso restrito a membros da ONG");
          return false;
        }
      }

      return true;
    };

    if (!validarPermissoes()) {
      setLoading(false);
      return;
    }

    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/${config.apiEndpoint}/${id}`);
        const itemData = response.data;
        console.log('Resposta do backend (itemData):', itemData);

        // Verifica ONG para entidades relacionadas
        if (entidade === 'ongs' || entidade === 'enderecos-ong') {
          let ongIdItem;
          if (entidade === 'ongs') {
            // para ONGs o ID do próprio objeto é o ongId
            ongIdItem = itemData.id;
          } else {
            // para endereços, use itemData.ongId (ou o nome que apareceu no console)
            ongIdItem = itemData.ongId;
          }

          if (ongIdItem?.toString() !== userOngId) {
            setError("Você só pode editar recursos da sua própria ONG!");
            setLoading(false);
            return;
          }
        }

        const { id: _, ...dadosCompletos } = itemData;

        if (entidade === 'administradores') {
          setFormData({
            ...dadosCompletos,
            ongId: itemData.ongId // no admin o backend quer só "ongId"
          });
        } else if (entidade === 'enderecos-ong') {
          setFormData({
            ...dadosCompletos,
            ong: {
              id: itemData.ong?.id || '' // no endereco-ong o backend quer "ong": { id: ... }
            }
          });
        } else {
          setFormData(dadosCompletos);
        }
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
  }, [config, id, entidade, userType, userId, userOngId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
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

    // 1. Validação dos campos obrigatórios
    const camposObrigatorios = [...config.colunas, ...(config.colunasExtras || []), ...(config.formOnlyCols || [])]
      .filter(col => col.required);

    const camposFaltantes = camposObrigatorios.filter(col => {
      // Caso especial para administradores (ongId direto)
      if (entidade === 'administradores' && col.key === 'ongId') {
        return !formData.ongId || isNaN(formData.ongId);
      }

      // Caso especial para enderecos-ong (ong.id)
      if (entidade === 'enderecos-ong' && col.key === 'ong.id') {
        return !formData.ong?.id || isNaN(formData.ong.id);
      }

      // Validação padrão para outros campos
      const valor = formData[col.key];
      if (typeof valor === 'boolean') return false; // Booleanos são sempre válidos
      return !valor || (typeof valor === 'string' && !valor.trim());
    });

    if (camposFaltantes.length > 0) {
      setError(`Preencha os campos obrigatórios: ${camposFaltantes.map(c => c.label).join(', ')}`);
      setSaving(false);
      return;
    }

    setSaving(true);
    setError(null);
    setSuccessMessage(null);

    // 2. Ajuste do payload
    const formDataAjustado = { ...formData };

    // Administradores: envia ongId direto
    if (entidade === 'administradores') {
      formDataAjustado.ongId = Number(formData.ongId);
      delete formDataAjustado.ong; // Remove qualquer objeto ong existente
    }

    // Enderecos-ong: envia ong: { id }
    if (entidade === 'enderecos-ong') {
      formDataAjustado.ong = { id: Number(formData.ong?.id) };
    }

    // 3. Remove transformação genérica de campos terminados em Id
    // (Mantido apenas se necessário para outras entidades)
    Object.entries(formData).forEach(([chave, valor]) => {
      if (chave.endsWith('Id') && chave !== 'id' && !['ongId'].includes(chave)) {
        const chaveBase = chave.replace(/Id$/, '');
        formDataAjustado[chaveBase] = { id: valor };
        delete formDataAjustado[chave];
      }
    });

    try {
      console.log("Payload final:", formDataAjustado);
      await axios.put(`http://localhost:8080/${config.apiEndpoint}/${id}`, formDataAjustado);
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
            {[...config.colunas, ...(config.colunasExtras || []), ...(config.colunasFormulario || [])].map(col => {
              // Oculta campos específicos
              const isOculto =
                col.key.endsWith('Id') ||
                (col.tipo === 'foreignKey' && col.key === 'ong') ||
                (entidade === 'enderecos-ong' && col.key === 'ong.id'); // 👈 Nova condição

              if (col.key === "id" || isOculto) return null;

              if (col.key === 'ongId' && entidade === 'administradores') {
                return (
                  <input
                    type="hidden"
                    name="ongId"
                    key={col.key}
                    value={formData.ongId || ''}
                  />
                );
              }
              if (col.key === 'ong.id' && entidade === 'enderecos-ong') {
                return (
                  <div key={col.key} className="mb-4 form-group">
                    <label className="form-label">{col.label}:</label>
                    <input
                      type="hidden"
                      name="ong.id"
                      value={formData.ong?.id || ''}
                    />
                  </div>
                );
              }

              if (col.tipo === 'password') {
                return (
                  <div key={col.key} className="mb-4 form-group">
                    <label className="form-label">{col.label}:</label>
                    <input
                      type="password"
                      name={col.key}
                      value={formData[col.key] || ''}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Deixe em branco para manter a atual"
                    />
                  </div>
                );
              }
              if (col.key === 'tipo' && entidade === 'administradores') {
                return (
                  <div key={col.key} className="mb-4 form-group">
                    <label className="form-label">{col.label}:</label>
                    <input
                      type="text"
                      value={formData[col.key]}
                      className="form-control"
                      disabled
                    />
                  </div>
                );
              }

              if (col.tipo === 'foreignKey') {
                return (
                  <input
                    key={col.key}
                    type="hidden"
                    name={`${col.key}`}
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
                <div key={col.key} className="mb-4 form-group">
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
                      required={col.required}

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
