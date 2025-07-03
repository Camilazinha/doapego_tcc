// src/pages/Doacoes.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import errorTriangleIcon from "../img/errortriangle-icon.svg";
import noImageIcon from "../img/noimage-icon.svg";
import gotoIcon from "../img/gotogray-icon.svg";

export default function Doacoes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const userType = localStorage.getItem('tipo') || '';
  const userOngId = Number(localStorage.getItem('ongId')) || null;
  const userId = Number(localStorage.getItem('id')) || null;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);

  const [showRefuseModal, setShowRefuseModal] = useState(false);
  const [itemData, setItemData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // useEffect(() => {
  //   let timer;
  //   if (error || successMessage) {
  //     timer = setTimeout(() => {
  //       setError(null);
  //       setSuccessMessage('');
  //     }, 4000);
  //   }
  //   return () => clearTimeout(timer);
  // }, [error, successMessage]);


  const atualizarStatus = async (novoStatus) => {
    try {
      await axios.patch(`http://localhost:8080/doacoes/${id}`, {
        status: novoStatus
      });

      setItemData(prev => ({ ...prev, status: novoStatus }));
      navigate('/gerenciar-doacoes');

    } catch (err) {
      console.error("Erro ao atualizar status:", err);
      setError('Erro ao atualizar. Tente novamente.');
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev =>
      prev === itemData.arquivosDoacao.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev =>
      prev === 0 ? itemData.arquivosDoacao.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/doacoes/${id}`);
        const data = response.data;

        const isAdmin = userType === 'MASTER' || userType === 'STAFF';
        const isOwner = userId === data.usuarioId;
        const isOngRelated = userOngId === data.ongId;

        if (!isAdmin && !isOwner && !isOngRelated) {
          throw new Error('Sem permissão');
        }
        // entender essa lógica de permissão *

        setItemData(data);
        // mensagem de erro
      } catch (err) {
        console.error("Erro ao buscar os detalhes:", err);

        if (err.message === 'Sem permissão') {
          setError("Você não tem permissão para visualizar este item.");
          alert("Você não tem permissão para visualizar este item.");
        }
        else if (err.response) {
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
  }, [id, userType, userOngId, userId]);

  if (loading) return (
    <main className='container my-5 nao-unico-elemento px-5'>
      <h2 className='titulo-pagina mb-5'>DETALHES DE DOAÇÃO</h2>
      <section className='p-5 d-flex justify-content-center align-items-center flex-column'>
        <div className='spinner-border text-secondary m-3' role='status' style={{ width: '3rem', height: '3rem' }}></div>
        <p className='loading-text'>Carregando...</p>
      </section>
    </main>
  );

  if (error) return (
    <main className='container my-5 nao-unico-elemento px-5'>
      <h2 className='titulo-pagina mb-5'>DETALHES DE DOAÇÃO</h2>
      <div className="alert alert-danger d-flex">
        <img src={errorTriangleIcon} className="me-2" alt="erro" />
        <p className="erro">{error}</p>
      </div>
    </main>
  );

  return (
    <main>
      <div className='container my-5 nao-unico-elemento px-5'>
        <h2 className='titulo-pagina mb-5'>DETALHES DE DOAÇÃO</h2>

        <section className='container form-container-crud bg-white'>
          {/* Galeria de imagens */}
          <div className="row mb-4 position-relative">
            {itemData.arquivosDoacao?.length > 0 ? (
              <div className="d-flex justify-content-center align-items-center">
                {/* Botão anterior */}
                {itemData.arquivosDoacao.length > 1 && (
                  <button
                    onClick={handlePrevImage}
                    className="btn btn-link position-absolute start-0 top-50 translate-middle-y"
                    style={{ zIndex: 1, left: '20px' }} >
                    <i className="bi bi-chevron-left fs-1 text-secondary"></i>
                  </button>
                )}

                {/* Imagem atual */}
                <div className="position-relative" style={{ maxWidth: '400px' }}>
                  <img
                    src={itemData.arquivosDoacao[currentImageIndex].link}
                    alt={`Doação ${currentImageIndex + 1}`}
                    className="img-fluid rounded shadow-sm cursor-pointer"
                    style={{
                      height: '232px',
                      width: '100%',
                      objectFit: 'cover',
                      cursor: 'pointer'
                    }}
                    onClick={() => setShowImageModal(true)}
                  />

                  {/* Bullets (indicadores) */}
                  {itemData.arquivosDoacao.length > 1 && (
                    <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-2">
                      {itemData.arquivosDoacao.map((arquivo, index) => (
                        <button
                          key={arquivo.id}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`btn p-0 rounded-circle bullet-gallery ${index === currentImageIndex ? 'cbg-tertiary' : 'bg-secondary'}`}
                          style={{
                            width: '10px',
                            height: '10px',
                            border: 'none'
                          }}
                          aria-label={`Ir para imagem ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Botão próximo */}
                {itemData.arquivosDoacao.length > 1 && (
                  <button
                    onClick={handleNextImage}
                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                    style={{ zIndex: 1, right: '20px' }}
                  >
                    <i className="bi bi-chevron-right fs-1 text-secondary"></i>
                  </button>
                )}
              </div>
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
                  <td>{itemData.usuarioNome} <span className='text-muted'>({itemData.usuarioEmail})</span></td>
                </tr>

                {userType === 'MASTER' && (
                  <tr>
                    <th className='text-nowrap text-secondary fw-semibold'>ONG</th>
                    <td>
                      <Link to={`/configuracoes/ongs/detalhes/${itemData.ongId}`} className='text-black text-decoration-none d-flex text-align-center'>
                        {itemData.ongNome}
                        <img src={gotoIcon} alt="Ir para ONG" className='ms-2' style={{ verticalAlign: 'middle' }} />
                      </Link>
                    </td>
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
                  <button className="btn btn-success" onClick={() => atualizarStatus('PENDENTE')}>
                    Aceitar
                  </button>
                  <button className="btn btn-danger" onClick={() => setShowRefuseModal(true)}>
                    Recusar
                  </button>
                </>
              )}

              {/* Botões para FUNCIONARIO/STAFF */}
              {(userType === 'FUNCIONARIO' || userType === 'STAFF') && (
                <>
                  <button className="btn btn-success" onClick={() => atualizarStatus('COLETADA')}>
                    Aceitar
                  </button>
                  <button className="btn btn-danger" onClick={() => setShowRefuseModal(true)}>
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
                <button type="button" className="btn-close" onClick={() => setShowRefuseModal(false)}></button>
              </div>

              <div className="modal-body">
                <p>Tem certeza que deseja recusar esta doação?</p>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowRefuseModal(false)}>
                  Cancelar
                </button>

                <button
                  className="btn btn-danger" onClick={() => { atualizarStatus('RECUSADA'); setShowRefuseModal(false); }}>
                  Confirmar
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Modal para Ampliação da Imagem */}
      {showImageModal && (
        <div className="modal fade show"
          style={{
            display: 'block',
            backgroundColor: 'rgba(0,0,0,0.97)',
            backdropFilter: 'blur(3px)'
          }}
          onClick={() => setShowImageModal(false)}>
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content bg-transparent border-0">
              <div className="modal-body p-0 position-relative">

                {/* Botão de fechar*/}
                <button
                  type="button"
                  className="btn position-absolute rounded-circle border-0 top-0 end-0 m-3 d-flex align-items-center justify-content-center"
                  onClick={() => setShowImageModal(false)}
                  style={{
                    zIndex: 2,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    width: '40px',
                    height: '40px',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)'}>
                  <i className="bi bi-x-lg fs-5 text-dark"></i>
                </button>

                {/* Imagem Ampliada */}
                <div className="position-relative">
                  <img
                    src={itemData.arquivosDoacao[currentImageIndex].link}
                    alt={`Ampliação - Doação ${currentImageIndex + 1}`}
                    className="img-fluid"
                    style={{
                      maxHeight: '90vh',
                      width: '100%',
                      objectFit: 'contain',
                      borderRadius: '8px',
                    }}
                  />

                  {/* Bullets de navegação */}
                  {itemData.arquivosDoacao.length > 1 && (
                    <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex gap-2"
                      style={{ zIndex: 2 }}>
                      {itemData.arquivosDoacao.map((arquivo, index) => (
                        <button
                          key={arquivo.id}
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                          className={`btn p-0 rounded-circle border-0 ${index === currentImageIndex ? 'bg-white' : 'cbg-gray-dark'}`}
                          aria-label={`Ir para imagem ${index + 1}`}
                          style={{
                            width: '10px',
                            height: '10px',
                            transition: 'all 0.2s',
                            opacity: index === currentImageIndex ? 1 : 0.7
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Controles de navegação*/}
                  {itemData.arquivosDoacao.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); handlePrevImage(); }} className="btn position-absolute start-0 top-50 border-0 rounded-circle translate-middle-y d-flex align-items-center justify-content-center"
                        style={{
                          left: '20px',
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          width: '48px',
                          height: '48px',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'}>
                        <i className="bi bi-chevron-left fs-2 text-white"></i>
                      </button>

                      <button onClick={(e) => { e.stopPropagation(); handleNextImage(); }} className="btn position-absolute end-0 top-50 border-0 rounded-circle translate-middle-y d-flex align-items-center justify-content-center"
                        style={{
                          right: '20px',
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          width: '48px',
                          height: '48px',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'}>
                        <i className="bi bi-chevron-right fs-2 text-white"></i>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main >
  );
}