import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { crudList } from '../constants/crudList';
import errorTriangleIcon from "../img/errortriangle-icon.svg";

export default function AddCrud() {
  const { entidade } = useParams(); // Pegamos a entidade da URL
  const config = crudList[entidade] || null; // Se não existir, deixamos como null

  // Inicializa o estado do formulário dinamicamente com base nas colunas da configuração
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
  const [validationError, setValidationError] = useState(""); // Estado para erros de validação

  if (!config)
    return (
      <main className='container my-5 nao-unico-elemento px-5'>
        <div className="alert alert-danger d-flex">
          <img src={errorTriangleIcon} className="me-2" alt="erro" />

          Configuração não encontrada para "{entidade}"
        </div>
      </main>
    );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setValidationError(""); // Limpa erro de validação antes de enviar

    // Validação: verifica se algum campo (exceto id) ficou vazio ou contém somente espaços
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
      alert(`${config.titulo} adicionado com sucesso!`);

      // Reinicia o formulário após a adição
      const resetData = {};
      config.colunas.forEach(col => {
        if (col.key !== 'id') {
          resetData[col.key] = "";
        }
      });
      setFormData(resetData);
    } catch (err) {
      console.error("Erro ao adicionar:", err);
      if (err.response) {
        setError("Erro ao carregar os dados. Tente novamente mais tarde.");
      } else if (err.request) {
        setError("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
      } else {
        setError("Ocorreu um erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

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

        <section className='p-5 form-container'>
          <form onSubmit={handleSubmit}>
            {config.colunas.map(col => {
              // Se for o campo "id", não exibe
              if (col.key === "id") return null;

              return (
                <div key={col.key} className="mb-3">
                  <div className='form-group'>
                    <label className="form-label">{col.label}:</label>
                    {col.selectOptions ? (
                      <select
                        name={col.key}
                        value={formData[col.key]}
                        onChange={handleChange}
                        className="form-control form-select"
                      >
                        <option className="text-muted" value="">Selecione uma opção</option>
                        {col.selectOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
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
