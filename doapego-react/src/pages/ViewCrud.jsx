// src/pages/ViewCrud.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatarTelefone, formatarCEP } from '../helpers/masks';
import { crudData } from '../constants/crudData';

import noImageIcon from "../img/noimage-icon.svg";
import errorTriangleIcon from '../img/errortriangle-icon.svg';
import successIcon from '../img/success-icon.svg';

export default function ViewCrud() {
  const { entidade, id } = useParams();
  const config = crudData[entidade] || null;

  const userType = localStorage.getItem('tipo') || '';
  const userOngId = Number(localStorage.getItem('ongId')) || null;
  const userId = Number(localStorage.getItem('id')) || null;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemData, setItemData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : null), obj);
  };

  useEffect(() => {

    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/${config.apiEndpoint}/${id}`);
        const data = response.data;

        let hasPermission = false;
        switch (entidade) {
          case 'administradores':
            if (userType === 'MASTER') {
              hasPermission = data.tipo === 'MASTER' || data.tipo === 'STAFF';
            } else if (userType === 'STAFF') {
              hasPermission = (data.tipo === 'STAFF' || data.tipo === 'FUNCIONARIO') && userType === 'STAFF' && userOngId === data.ong?.id;
            } else {
              hasPermission = userId === data.id;
            }
            break;
          case 'categorias-doacao':
            hasPermission = true;
            break;
          case 'enderecos-ong':
            if (userType === 'MASTER') {
              hasPermission = true;
            } else {
              hasPermission = userOngId === data.ong?.id;
            }
            break;
          case 'ongs':
            if (userType === 'MASTER') {
              hasPermission = true;
            } else if ((userType === 'STAFF' || userType === 'FUNCIONARIO') && userOngId === data.id) {
              hasPermission = true;
            } else {
              hasPermission = false;
            }
            break;
          case 'usuarios':
            hasPermission = userType === 'MASTER';
            break;
          default:
            hasPermission = false;
        }

        if (!hasPermission) {
          setError('Sem permissão');
          setLoading(false);
          return;
        }

        setItemData(data);
      } catch (err) {
        console.error("Erro ao buscar os detalhes:", err);

        if (err.message === 'Sem permissão') {
          setError("Você não tem permissão para visualizar este item.");
        }

        else if (err.response) {
          setError("Erro ao carregar os dados do servidor. Tente novamente mais tarde.");

        } else if (err.request) {
          setError("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");

        } else {
          setError("Ocorreu um erro inesperado.");

        }
      } finally {
        setLoading(false);
      }
    };

    if (config) {
      fetchItem();
    } else {
      setLoading(false);
    }
  }, [config, id, entidade, userType, userOngId, userId]);

  const handleAccept = async () => {
    try {
      await axios.patch(`http://localhost:8080/ongs/${id}`, {
        statusOng: "ATIVO"
      });

      setSuccess('ONG aprovada com sucesso!');
      window.location.reload();

    } catch (err) {
      console.error('Erro ao aprovar ONG:', err);
      setError('Erro ao aprovar ONG. Tente novamente!');
    }
  };

  const handleReject = async () => {
    try {
      const enderecosResponse = await axios.get(`http://localhost:8080/enderecos-ong?ongId=${id}`);
      const enderecos = enderecosResponse.data.items;

      await Promise.all(
        enderecos.map(endereco =>
          axios.delete(`http://localhost:8080/enderecos-ong/${endereco.id}`)
        )
      );

      await axios.delete(`http://localhost:8080/ongs/${id}`);

      setSuccess('ONG e endereços relacionados excluídos com sucesso!');
      window.location.href = '/gerenciar-solicitacoes';

    } catch (err) {
      console.error('Erro no processo de exclusão:', err);
      setError(`Erro ao excluir: ${err.response?.data?.message || err.message}`);
    } finally {
      setShowDeleteModal(false);
    }
  };

  if (loading) return (
    <main className='container my-5 nao-unico-elemento px-5'>
      <h2 className='titulo-pagina mb-5'>DETALHES DE {config.titulo}</h2>
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
      <div className="alert alert-danger d-flex">
        <img src={errorTriangleIcon} className="me-2" alt="erro" />
        Não foi possível encontrar "{entidade}"
      </div>
    </main>
  );

  return (
    <main>

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

      <div className='container my-5 nao-unico-elemento px-5'>
        {(userId === itemData.id && entidade === "administradores") ? (
          <h2 className='titulo-pagina mb-5'>MEU PERFIL</h2>
        ) : userOngId === itemData.id ?
          (
            <h2 className='titulo-pagina mb-5'>MINHA ONG</h2>
          ) : (
            <h2 className='titulo-pagina mb-5'>DETALHES DE {config.titulo}</h2>
          )
        }
        <section className='container form-container-crud bg-white'>
          {config.colunas
            .filter((col) => col.temImagem)
            .map(col => {
              const imagem = itemData[col.key];
              const temImagem =
                imagem !== null &&
                imagem !== undefined &&
                String(imagem).trim() !== "";

              const imagemUrl = temImagem ? imagem : noImageIcon;

              return (
                <div key={col.key} className="d-flex flex-column align-items-center mb-4">
                  <img src={imagemUrl} alt={col.label} className="rounded-circle shadow-sm" style={{ width: "200px", height: "200px", objectFit: "cover", padding: !temImagem ? "2rem" : "0", backgroundColor: !temImagem ? "#fdfdfd" : "transparent" }} />
                  <hr style={{ marginTop: "3rem", width: "8rem" }} />
                </div>
              );

            })}
          <div className='table-responsive'>
            <table className='table table-bordered align-middle mb-0'>
              <tbody>
                {[
                  ...config.colunas,
                  ...(config.colunasExtras || [])
                ]
                  .filter((col) => !col.temImagem)
                  .map(col => {
                    const valor = getNestedValue(itemData, col.key);
                    const temValor = valor !== null && valor !== undefined && String(valor).trim() !== "";

                    const formatarValor = (col, valor) => {
                      if (typeof valor === 'boolean') {
                        return col.tipoBooleano === 'ativo-inativo'
                          ? (valor ? 'Ativo' : 'Inativo')
                          : (valor ? 'Sim' : 'Não');
                      }

                      switch (col.key) {
                        case 'telefone':
                        case 'whatsapp':
                          return formatarTelefone(valor);
                        case 'cep':
                          return formatarCEP(valor);
                        default:
                          return valor;
                      }
                    };
                    return (
                      <tr key={col.key}>
                        <th scope="row" className="text-nowrap text-secondary fw-semibold" style={{ width: "30%" }}>
                          {col.label}
                        </th>
                        <td>
                          {temValor ? (
                            formatarValor(col, valor)
                          ) : (
                            <p className='text-muted'>Sem informação</p>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>

            </table>
            <section className="mt-4 d-flex gap-2 justify-content-center flex-wrap">
              {entidade === 'ongs' && itemData.statusOng === 'PENDENTE' && userType === 'MASTER' && (
                <>
                  <button className="btn btn-success" onClick={handleAccept}>Aceitar ONG</button>
                  <button className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>Rejeitar ONG</button>
                </>
              )}

              {entidade === 'ongs' && (userType === 'STAFF' || userType === 'FUNCIONARIO') && (
                <Link to={`/configuracoes/ongs/editar/${userOngId}`}>
                  <button className="btn btn-custom-unfilled mx-1">
                    Editar ONG
                  </button>
                </Link>
              )}

              {entidade === 'administradores' && (userId === itemData.id) && (
                <Link to={`/configuracoes/administradores/editar/${userId}`}>
                  <button className="btn btn-custom-unfilled mx-1">
                    Editar perfil
                  </button>
                </Link>
              )}
            </section>

            {showDeleteModal && (
              <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title fw-semibold">Atenção!</h5>
                      <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                    </div>
                    <div className="modal-body">
                      Tem certeza que deseja rejeitar e excluir permanentemente esta ONG?
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                      <button type="button" className="btn btn-danger" onClick={handleReject}>Confirmar Exclusão</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
