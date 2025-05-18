import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import errorTriangleIcon from "../img/errortriangle-icon.svg";
import noImageIcon from "../img/noimage-icon.svg";

export default function Doacoes() {
  const { id } = useParams();

  const userType = localStorage.getItem('tipo') || '';
  const userOngId = Number(localStorage.getItem('ongId')) || null;
  const userId = Number(localStorage.getItem('id')) || null;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemData, setItemData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/doacoes/${id}`);
        const data = response.data;

        // Verificar permissões
        const isAdmin = userType === 'MASTER' || userType === 'STAFF';
        const isOwner = userId === data.usuarioId;
        const isOngRelated = userOngId === data.ongId;

        if (!isAdmin && !isOwner && !isOngRelated) {
          throw new Error('Sem permissão');
        }

        setItemData(data);
      } catch (err) {
        console.error("Erro ao buscar os detalhes:", err);
        // Tratamento de erros similar ao original
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, userType, userOngId, userId]);

  const formatStatus = (status) => {
    const statusStyles = {
      PENDENTE: 'bg-warning text-dark',
      APROVADO: 'bg-success',
      RECUSADO: 'bg-danger',
      FINALIZADO: 'bg-secondary'
    };
    return <span className={`badge ${statusStyles[status]}`}>{status}</span>;
  };

  if (loading) return (
    <main className='container my-5 nao-unico-elemento px-5'>
      <h2 className='titulo-pagina mb-5'>DETALHES DA DOAÇÃO</h2>
      <section className='p-5 d-flex justify-content-center align-items-center flex-column'>
        <div className='spinner-border text-secondary m-3' role='status' style={{ width: '3rem', height: '3rem' }}></div>
        <p className='loading-text'>Carregando...</p>
      </section>
    </main>
  );

  if (error) return (
    <main className='container my-5 nao-unico-elemento px-5'>
      <h2 className='titulo-pagina mb-5'>DETALHES DA DOAÇÃO</h2>
      <div className="alert alert-danger d-flex">
        <img src={errorTriangleIcon} className="me-2" alt="erro" />
        <p className="erro">{error}</p>
      </div>
    </main>
  );

  return (
    <main>
      <div className='container my-5 nao-unico-elemento px-5'>
        <h2 className='titulo-pagina mb-5'>DETALHES DA DOAÇÃO</h2>

        <section className='container form-container-crud bg-white'>
          {/* Galeria de imagens */}
          <div className="row mb-4">
            {itemData.arquivosDoacao?.length > 0 ? (
              itemData.arquivosDoacao.map((arquivo, index) => (
                <div key={index} className="d-flex justify-content-center">
                  <img
                    src={arquivo.link}
                    alt={`Doação ${index + 1}`}
                    className="img-fluid rounded shadow-sm"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <img
                  src={noImageIcon}
                  alt="Sem imagem"
                  style={{ width: '200px', padding: '2rem' }}
                />
              </div>
            )}
          </div>

          <div className='table-responsive'>
            <table className='table table-bordered align-middle mb-0'>
              <tbody>
                <tr>
                  <th scope="row" className="text-nowrap text-secondary fw-semibold" style={{ width: "30%" }}>
                    Nome do Item
                  </th>
                  <td>{itemData.nome || 'Sem informação'}</td>
                </tr>

                <tr>
                  <th>Status</th>
                  <td>{formatStatus(itemData.status)}</td>
                </tr>

                <tr>
                  <th>Categoria</th>
                  <td>{itemData.categoriaDoacao || 'Não especificada'}</td>
                </tr>

                <tr>
                  <th>ONG Beneficiada</th>
                  <td>
                    {itemData.ongNome ? (
                      <Link to={`/ongs/${itemData.ongId}`}>{itemData.ongNome}</Link>
                    ) : 'Não especificada'}
                  </td>
                </tr>

                <tr>
                  <th>Doador</th>
                  <td>{itemData.usuarioNome || 'Anônimo'}</td>
                </tr>
              </tbody>
            </table>

            {/* Ações */}
            <section className="mt-4 d-flex gap-2 justify-content-center flex-wrap">
              {(userType === 'MASTER' || userType === 'STAFF') && (
                <>
                  <button className="btn btn-success">
                    Marcar como Recebido
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Cancelar Doação
                  </button>
                </>
              )}
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}