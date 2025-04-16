import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { crudList } from '../constants/crudList';

import errorTriangleIcon from "../img/errortriangle-icon.svg";

export default function ViewCrud() {
  const { entidade, id } = useParams();
  const config = crudList[entidade] || null;

  const [itemData, setItemData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/${config.apiEndpoint}/${id}`);
        setItemData(response.data);

      } catch (err) {
        console.error("Erro ao buscar os detalhes:", err);

        if (err.response) {
          setError("Erro ao carregar os dados do servidor. Tente novamente mais tarde.");
          alert("Erro ao carregar os dados do servidor. Tente novamente mais tarde.");

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

  if (loading) return (
    <main className='container my-5 nao-unico-elemento px-5'>
      <h2 className='titulo-pagina mb-5'>Detalhes de {config.titulo}</h2>
      <section className='p-5 d-flex justify-content-center align-items-center flex-column'>
        <div className='spinner-border text-secondary m-3' role='status' style={{ width: '3rem', height: '3rem' }}></div>
        <p className='loading-text'>Carregando...</p>
      </section>
    </main>
  );

  if (error) return (
    <main className='container my-5 nao-unico-elemento px-5'>
      <h2 className='titulo-pagina mb-5'>DETALHES DE {config.titulo}</h2>
      <div className="alert alert-danger d-flex">
        <img src={errorTriangleIcon} className="me-2" alt="erro" />
        <p className="erro">{error}</p>
      </div>
    </main>
  );

  if (!config) return (
    <main className='container my-5 nao-unico-elemento px-5'>
      <div className="alert alert-danger">
        Configuração não encontrada para "{entidade}"
      </div>
    </main>
  );


  return (
    <main>
      <div className='container my-5 nao-unico-elemento px-5'>
        <h2 className='titulo-pagina mb-5'>Detalhes de {config.titulo}</h2>
        <section className='borda p-5'>
          {config.colunas.map(col => (
            <div key={col.key} className="mb-3">
              <label className="form-label"><strong>{col.label}:</strong></label>
              <div>
                {col.temImagem ? (
                  itemData[col.key] ? (
                    <img
                      src={itemData[col.key]}
                      alt={col.label}
                      style={{ width: "150px", objectFit: 'cover', borderRadius: '8px' }}
                    />
                  ) : (
                    <span>Sem foto</span>
                  )
                ) : (
                  <span>{itemData[col.key]}</span>
                )}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
