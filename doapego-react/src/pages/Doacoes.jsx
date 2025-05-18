import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import errorTriangleIcon from "../img/errortriangle-icon.svg";
import noImageIcon from "../img/noimage-icon.svg";

export default function Doacoes() {
  const { id } = useParams();
  const navigate = useNavigate(); // Passo 2: Inicializar o hook

  const userType = localStorage.getItem('tipo') || '';
  const userOngId = Number(localStorage.getItem('ongId')) || null;
  const userId = Number(localStorage.getItem('id')) || null;

  const [showRefuseModal, setShowRefuseModal] = useState(false);
  const [itemData, setItemData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const atualizarStatus = async (novoStatus) => {
    try {
      await axios.patch(`http://localhost:8080/doacoes/${id}`, {
        status: novoStatus
      });

      setItemData(prev => ({ ...prev, status: novoStatus }));

      // Passo 3: Redirecionar após sucesso
      navigate('/gerenciar-doacoes'); // Altere a rota conforme necessário

    } catch (err) {
      console.error("Erro ao atualizar status:", err);
      setError('Erro ao atualizar. Tente novamente.');
    }
  };

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
                    Nome do item
                  </th>
                  <td>{itemData.nome || 'Sem informação'}</td>
                </tr>

                <tr>
                  <th className='text-nowrap text-secondary fw-semibold'>Categoria</th>
                  <td>{itemData.categoriaDoacao || 'Não especificada'}</td>
                </tr>

                <tr>
                  <th className='text-nowrap text-secondary fw-semibold'>Doador</th>
                  <td>{itemData.usuarioNome}</td>
                </tr>

                {userType === 'MASTER' && (
                  <tr>
                    <th className='text-nowrap text-secondary fw-semibold'>ONG</th>
                    <td><Link to={`/configuracoes/ongs/detalhes/${itemData.ongId}`} className='ccolor-tertiary'>{itemData.ongNome}</Link></td>
                  </tr>
                )}

                <tr>
                  <th className='text-nowrap text-secondary fw-semibold'>Status</th>
                  <td>
                    {itemData.status === 'ANALISE'
                      ? 'Em análise'
                      : `${itemData.status[0]?.toUpperCase() ?? ''}${itemData.status.slice(1).toLowerCase()}`
                    }
                  </td>
                </tr>

              </tbody>
            </table>
            <section className="mt-4 d-flex gap-2 justify-content-center flex-wrap">

              {/* Botões para MASTER */}
              {userType === 'MASTER' && (
                <>
                  <button
                    className="btn btn-success"
                    onClick={() => atualizarStatus('PENDENTE')} // MASTER aceita → PENDENTE
                  >
                    Aceitar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => setShowRefuseModal(true)} // Só abre o modal
                  >
                    Recusar
                  </button>
                </>
              )}

              {/* Botões para FUNCIONARIO/STAFF */}
              {(userType === 'FUNCIONARIO' || userType === 'STAFF') && (
                <>
                  <button
                    className="btn btn-success"
                    onClick={() => atualizarStatus('COLETADA')} // Aceitar → COLETADA
                  >
                    Aceitar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => setShowRefuseModal(true)} // Só abre o modal
                  >
                    Recusar
                  </button>
                </>
              )}
            </section>

          </div>
        </section>
      </div >
      {/* Modal de Confirmação para Recusar */}
      {showRefuseModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-semibold">Atenção!</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowRefuseModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Tem certeza que deseja recusar esta doação?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowRefuseModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    atualizarStatus('RECUSADA');
                    setShowRefuseModal(false);
                  }}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main >
  );
}