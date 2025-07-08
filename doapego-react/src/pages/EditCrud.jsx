// src/pages/EditCrud.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { crudData } from '../constants/crudData';
import { formatarTelefone, formatarCEP, removerMascara } from '../helpers/masks';
import { buscarCEP } from '../helpers/cepService';

import errorTriangleIcon from "../img/errortriangle-icon.svg";
import successIcon from "../img/success-icon.svg";

export default function EditCrud() {
  const { entidade, id } = useParams();
  const config = crudData[entidade] || null;

  const userType = localStorage.getItem('tipo') || '';
  const userId = Number(localStorage.getItem('id')) || '';
  const userOngId = Number(localStorage.getItem('ongId'));

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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


  useEffect(() => {

    const validarPermissoes = () => {
      if (entidade === 'usuarios') {
        setError("Edição não permitida.");
        return false;
      }

      if (entidade === 'categorias-doacao' && userType !== 'MASTER') {
        setError("Edição não permitida.");
        return false;
      }

      if (entidade === 'administradores') {
        if (userId !== Number(id)) {
          setError("Você só pode editar seu próprio perfil.");
          return false;
        }
      }

      if (entidade === 'enderecos-ong' || entidade === 'ongs') {
        if (!['STAFF', 'FUNCIONARIO'].includes(userType)) {
          setError("Acesso restrito a membros da ONG.");
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

        if (itemData.cep) {
          itemData.cep = formatarCEP(itemData.cep);
        }

        if (itemData.telefone) {
          itemData.telefone = formatarTelefone(itemData.telefone);
        }

        if (itemData.whatsapp) {
          itemData.whatsapp = formatarTelefone(itemData.whatsapp);
        }

        if (['ongs', 'enderecos-ong'].includes(entidade)) {
          const ongIdItem = entidade === 'ongs'
            ? itemData.id
            : (itemData.ongId ?? itemData.ong?.id);

          if (ongIdItem !== userOngId) {
            setError("Você só pode editar recursos da sua própria ONG.");
            setLoading(false);
            return;
          }
        }

        if (entidade === 'administradores') {
          setFormData({
            ...itemData,
            ong: itemData.ong ? { id: itemData.ong.id } : null
          });
        }
        else {
          const { id: _, ...dadosCompletos } = itemData;
          setFormData(dadosCompletos);
        }
      }
      catch (err) {
        console.error("Erro ao buscar os dados:", err);
        if (err.response) {
          setError("Erro ao carregar os dados. Tente novamente.");
        } else if (err.request) {
          setError("Não foi possível conectar ao servidor. Tente novamente.");
        } else {
          setError("Ocorreu um erro inesperado.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [config, id, entidade, userType, userId, userOngId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let valorFormatado = value;

    if (name === 'telefone' || name === 'whatsapp') {
      valorFormatado = formatarTelefone(value);
    } else if (name === 'cep') {
      valorFormatado = formatarCEP(value);
      handleBuscaCEP(value);
    }

    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [childKey]: type === 'checkbox' ? checked : valorFormatado
        }
      }));
    } else {
      const newValue = type === 'checkbox' ? checked : valorFormatado;
      setFormData(prev => ({ ...prev, [name]: newValue }));
    }
  };

  const handleBuscaCEP = async (cep) => {
    const cepLimpo = removerMascara(cep);

    if (cepLimpo.length === 8) {
      try {
        const endereco = await buscarCEP(cepLimpo);

        if (endereco.erro) {
          setError('CEP não encontrado.');
          setFormData(prev => ({
            ...prev,
            logradouro: '',
            bairro: '',
            cidade: '',
            estado: '',
            cep: formatarCEP(cepLimpo)
          }));
          return;
        }

        setFormData(prev => ({
          ...prev,
          ...endereco,
          cep: endereco.cep
        }));
      } catch (error) {
        setError('Erro ao buscar CEP.');
        setFormData(prev => ({
          ...prev,
          logradouro: '',
          bairro: '',
          cidade: '',
          estado: '',
          cep: formatarCEP(cepLimpo)
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDAR CEP
    const hasCEPField = [...config.colunas, ...(config.colunasExtras || [])].some(col => col.key === 'cep');
    if (hasCEPField) {
      const cepNumerico = removerMascara(formData.cep);
      if (cepNumerico && cepNumerico.length !== 8) {
        setError("CEP inválido! Deve conter 8 dígitos");
        return;
      }
    }

    // VALIDAR TELEFONE
    const hasTelefoneField = [...config.colunas, ...(config.colunasExtras || [])].some(col => col.key === 'telefone');
    if (hasTelefoneField && formData.telefone) {
      const telefoneLimpo = removerMascara(formData.telefone);
      if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
        setError("Telefone deve ter 10 ou 11 dígitos (com DDD).");
        return;
      }
    }

    // VALIDAR WHATSAPP
    const hasWhatsappField = [...config.colunas, ...(config.colunasExtras || [])].some(col => col.key === 'whatsapp');
    if (hasWhatsappField && formData.whatsapp) {
      const whatsappLimpo = removerMascara(formData.whatsapp);
      if (whatsappLimpo.length < 10 || whatsappLimpo.length > 11) {
        setError("WhatsApp deve ter 10 ou 11 dígitos (com DDD).");
        return;
      }
    }

    // VALIDAR DATA
    if (formData.fundacao) {
      const dataAtual = new Date();
      const dataFundacao = new Date(formData.fundacao);
      if (dataFundacao > dataAtual) {
        setError("Data de fundação não pode ser futura.");
        return;
      }
    }

    if (entidade === 'enderecos-ong' && (!formData.logradouro || !formData.bairro || !formData.cidade || !formData.estado)) {
      setError("Preencha todos os campos do endereço corretamente.");
      return;
    }

    const dadosLimpos = {
      ...formData,
      fundacao: formData.fundacao
        ? new Date(formData.fundacao + 'T00:00:00-03:00').toISOString().split('T')[0]
        : null,
      telefone: removerMascara(formData.telefone),
      whatsapp: removerMascara(formData.whatsapp),
      cep: removerMascara(formData.cep)
    };

    if (error) {
      setError("Você não tem permissão para salvar essas alterações.");
      return;
    }

    const payload = dadosLimpos;
    setSaving(true);

    try {
      await axios.put(`http://localhost:8080/${config.apiEndpoint}/${id}`, payload);
      setSuccess("Salvo com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar:", err);

      if (err.response) {
        setError("Falha ao atualizar os dados. Tente novamente.");
      } else if (err.request) {
        setError("Não foi possível conectar ao servidor. Tente novamente.");
      } else {
        setError("Ocorreu um erro inesperado.");
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

        {error &&
          <div className="alert alert-danger d-flex align-items-start popup-alert w-25">
            <img src={errorTriangleIcon} className="me-2" alt="erro" />

            <div className='ms-1'>
              <p className="fw-semibold alert-heading">Erro!</p>
              <p className="mb-0">{error}</p>
            </div>
          </div>}

        {success &&
          <div className="alert alert-success d-flex align-items-start popup-alert w-25">
            <img src={successIcon} className="me-2" alt="sucesso" />

            <div className='ms-1'>
              <p className="fw-semibold alert-heading">Sucesso!</p>
              <p className="mb-0">{success}</p>
            </div>
          </div>}

        <section className='container form-container-crud bg-white'>
          <form onSubmit={handleSubmit}>

            {entidade === 'administradores' && (
              <input type="hidden" name="ong.id" value={formData.ong?.id || ''} />
            )}

            {entidade === 'enderecos-ong' && (
              <input type="hidden" name="ong.id" value={formData.ong?.id || ''} />
            )}

            {[...config.colunas, ...(config.colunasExtras || []), ...(config.colunasFormulario || [])].map(col => {

              const isOculto =
                col.key.endsWith('Id') ||
                (col.tipo === 'foreignKey' && col.key === 'ong') ||
                ((entidade === 'enderecos-ong' || entidade === 'administradores') && col.key === 'ong.id');

              // ID
              if (col.key === "id" || isOculto) return null;

              // DATA
              if (col.tipo === 'date') {
                return (
                  <div key={col.key} className="mb-4 form-group">
                    <label className="form-label">{col.label}:</label>
                    <input type='date'
                      name={col.key}
                      value={formData[col.key] || ''}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                )
              }

              // TEXTAREA
              if (col.tipo === 'textarea') {
                return (
                  <div key={col.key} className="mb-4 form-group">
                    <label className="form-label">{col.label}:</label>
                    <textarea
                      name={col.key}
                      value={formData[col.key] || ''}
                      onChange={handleChange}
                      className="form-control"
                      rows="4"
                      required={col.required}
                    />
                  </div>
                )
              }

              // SENHA
              if (col.tipo === 'password') {
                return (
                  <div key={col.key} className="mb-4 form-group">
                    <label className="form-label">{col.label}:</label>
                    <input
                      type="password"
                      name={col.key}
                      value={formData[col.key] || ''}
                      onChange={handleChange}
                      minLength={6}
                      maxLength={20}
                      className="form-control"
                      placeholder="Deixe em branco para manter a atual"
                    />
                  </div>
                );
              }

              // STAFF OU MASTER
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

              //CHAVE ESTRANGEIRA
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
                          onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value })}
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
                          onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value })}
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
                          onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value === 'true' })}
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
                          onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value === 'true' })}
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
