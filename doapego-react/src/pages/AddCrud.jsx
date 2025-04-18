//src/pages/AddCrud.jsx

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { crudData } from '../constants/crudData';
import errorTriangleIcon from "../img/errortriangle-icon.svg";
import successIcon from "../img/success-icon.svg";

export default function AddCrud() {

  const { entidade } = useParams();
  const config = crudData[entidade] || null;
  const userTipo = "MASTER";

  const [formData, setFormData] = useState(() => {

    if (config) {
      const initialData = {};

      config.colunas.forEach(col => {
        if (col.key !== 'id') { // Não precisamos do campo de id na criação
          initialData[col.key] = "";
        }
      });

      return initialData;
    }
    return {};
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    // Força o valor de tipo com base no userTipo
    if (entidade === "administradores") {
      if (userTipo === "MASTER") {
        formData.tipo = "STAFF";
      } else if (userTipo === "STAFF") {
        formData.tipo = "FUNCIONARIO";
      }
    }

    setLoading(true);
    setError(null);
    setValidationError("");

    const camposVazios = config.colunas.filter(
      col => col.key !== 'id' && (!formData[col.key] || !formData[col.key].trim())
    );
    if (camposVazios.length > 0) {
      setValidationError(`Por favor, preencha o(s) campo(s): ${camposVazios.map(col => col.label).join(', ').toLowerCase()}`);
      setLoading(false);
      return;
    }

    try {
      await axios.post(`http://localhost:8080/${config.apiEndpoint}`, formData);
      setSuccessMessage(`${config.titulo} adicionado com sucesso!`);
      alert(`${config.titulo} adicionado com sucesso!`);

      // Reinicia o formulário após a adição
      const resetData = {};
      config.colunas.forEach(col => {
        if (col.key !== 'id') {
          resetData[col.key] = "";
        }
      });

      setFormData(resetData);
    }

    catch (err) {
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

  if (!config)
    return (
      <main className='container my-5 nao-unico-elemento px-5'>
        <div className="alert alert-danger d-flex">
          <img src={errorTriangleIcon} className="me-2" alt="erro" />
          Configuração não encontrada para "{entidade}"
        </div>
      </main>
    );

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
            <img src={successIcon} className="me-2" alt="" />
            <p className="">{successMessage}</p>
          </div>
        )}

        <section className='p-5 form-container'>
          <form onSubmit={handleSubmit}>

            {config.colunas.map(col => {
              if (col.key === "id") return null;

              const isTipoField = col.key === "tipo";
              const isAdminPage = entidade === 'administradores';

              const tipoFixo =
                isAdminPage && isTipoField && userTipo === "MASTER"
                  ? "STAFF"
                  : isAdminPage && isTipoField && userTipo === "STAFF"
                    ? "FUNCIONARIO"
                    : null;

              return (
                <div key={col.key} className="mb-3">
                  <div className='form-group'>
                    <label className="form-label">{col.label}:</label>
                    {tipoFixo ? (
                      <select
                        name={col.key}
                        value={tipoFixo}
                        className="form-control form-select"
                        aria-readonly="true"
                        disabled
                      >
                        <option value={tipoFixo}>{tipoFixo}</option>
                      </select>

                    ) : col.selectOptions ? (
                      <select
                        name={col.key}
                        value={formData[col.key]}
                        onChange={handleChange}
                        className='form-control form-select'>
                        <option className='text-muted' value="">Selecione uma opção</option>
                        {col.selectOptions.map((option, idx) => (
                          <option key={idx} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        name={col.key}
                        value={formData[col.key]}
                        onChange={handleChange}
                        className="form-control"
                      />
                    )}
                  </div>
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
