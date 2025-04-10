import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { crudList } from '../constants/crudList';
import errorTriangleIcon from "../img/errortriangle-icon.svg";

export default function EditCrud() {
  const { entidade, id } = useParams(); // Pegamos a entidade e o id da URL
  const config = crudList[entidade] || null; // Se não existir, deixamos como null

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Buscando os dados do item ao carregar o componente
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/${config.apiEndpoint}/${id}`);
        // Inicializa o formulário com os dados do item. Se houver campos que não estejam na resposta,
        // eles ficarão como strings vazias.
        const itemData = response.data;
        const initialData = {};
        config.colunas.forEach(col => {
          if (col.key !== 'id') {
            initialData[col.key] = itemData[col.key] || "";
          }
        });
        setFormData(initialData);
      } catch (err) {
        console.error("Erro ao buscar os dados:", err);
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

    fetchItem();
  }, [config, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await axios.put(`http://localhost:8080/${config.apiEndpoint}/${id}`, formData);
      alert(`${config.titulo} atualizado com sucesso!`);
    } catch (err) {
      console.error("Erro ao atualizar:", err);
      if (err.response) {
        setError("Erro ao atualizar os dados. Tente novamente mais tarde.");
      } else if (err.request) {
        setError("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
      } else {
        setError("Ocorreu um erro inesperado.");
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
        <h2 className='titulo-pagina mb-5'>Editar {config.titulo}</h2>

        {error && (
          <div className="alert alert-danger d-flex">
            <img src={errorTriangleIcon} className="me-2" alt="erro" />
            <p className="erro">{error}</p>
          </div>
        )}

        <section className='borda p-5'>
          <form onSubmit={handleSubmit}>
            {config.colunas.map(col => {
              if (col.key === "id") return null;
              return (
                <div key={col.key} className="mb-3">
                  <label className="form-label">{col.label}:</label>
                  <input
                    type="text"
                    name={col.key}
                    value={formData[col.key]}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              );
            })}
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Salvando..." : "Salvar Alterações"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
