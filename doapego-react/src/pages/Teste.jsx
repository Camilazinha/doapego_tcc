import { useState } from 'react';
import { Link } from 'react-router-dom';
import errorTriangleIcon from "../img/errortriangle-icon.svg";
import noImageIcon from "../img/noimage-icon.svg";
import successIcon from "../img/success-icon.svg";

const mockItemData = {
  id: 1,
  nome: "Tênis esportivo usado",
  categoriaDoacao: "Calçados",
  usuarioId: 5,
  usuarioNome: "João da Silva",
  ongId: 2,
  ongNome: "ONG Esperança Viva",
  status: "ANALISE",
  arquivosDoacao: [
    {
      id: 101,
      link: "https://bruno.art.br/wp-content/uploads/2022/06/image-6.png"
    },
    {
      id: 102,
      link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAhTz5eGb4-9pmt1ycLIXvQc3kGgs7UjuV1Q&s"
    }
  ]
};

export default function Teste() {
  const userType = 'MASTER';
  // const userOngId = 2;
  // const userId = 5;

  const [itemData, setItemData] = useState(mockItemData);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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

  const handleAccept = () => {
    setError(null);
    setSuccess("Item aceito com sucesso.");
  };

  const handleReject = () => {
    setError("Falha na validação: error.response.");
    setSuccess(null);
  };

  return (
    <main>
      {error &&
        <div className="alert alert-danger d-flex align-items-start popup-alert">
          <img src={errorTriangleIcon} className="me-2" alt="erro" />

          <div className='ms-1'>
            <p className="fw-semibold alert-heading">Erro!</p>
            <p className="mb-0">{error}</p>
          </div>
        </div>}

      {success &&
        <div className="alert alert-success d-flex align-items-start popup-alert">
          <img src={successIcon} className="me-2" alt="sucesso" />

          <div className='ms-1'>
            <p className="fw-semibold alert-heading">Sucesso!</p>
            <p className="mb-0">{success}</p>
          </div>
        </div>}

      <div className='container my-5 px-5'>
        <h2 className='titulo-pagina mb-5'>DETALHES DE DOAÇÃO</h2>
        <section className='container form-container-crud bg-white'>

          {/* Galeria de Imagens */}
          <div className="row mb-4 position-relative">
            {itemData.arquivosDoacao?.length > 0 ? (
              <div className="d-flex justify-content-center align-items-center">
                {itemData.arquivosDoacao.length > 1 && (
                  <button onClick={handlePrevImage} className="btn btn-link position-absolute start-0 top-50 translate-middle-y" style={{ zIndex: 1, left: '20px' }}>
                    <i className="bi bi-chevron-left fs-1 text-secondary"></i>
                  </button>
                )}

                <div className="position-relative" style={{ maxWidth: '400px' }}>
                  <img
                    src={itemData.arquivosDoacao[currentImageIndex].link}
                    alt={`Doação ${currentImageIndex + 1}`}
                    className="img-fluid rounded shadow-sm cursor-pointer"
                    style={{ height: '232px', width: '100%', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => setShowImageModal(true)}
                  />
                </div>

                {itemData.arquivosDoacao.length > 1 && (
                  <button onClick={handleNextImage} className="btn btn-link position-absolute end-0 top-50 translate-middle-y" style={{ zIndex: 1, right: '20px' }}>
                    <i className="bi bi-chevron-right fs-1 text-secondary"></i>
                  </button>
                )}
              </div>
            ) : (
              <div className="col-12 text-center">
                <img src={noImageIcon} alt="Sem imagem" style={{ width: '200px', padding: '2rem' }} />
              </div>
            )}
          </div>

          {/* Tabela de dados */}
          <div className='table-responsive'>
            <table className='table table-bordered align-middle mb-0'>
              <tbody>
                <tr>
                  <th className="text-secondary fw-semibold" style={{ width: "30%" }}>Nome do item</th>
                  <td>{itemData.nome}</td>
                </tr>
                <tr>
                  <th className='text-secondary fw-semibold'>Categoria</th>
                  <td>{itemData.categoriaDoacao}</td>
                </tr>
                <tr>
                  <th className='text-secondary fw-semibold'>Doador</th>
                  <td>{itemData.usuarioNome}</td>
                </tr>
                {userType === 'MASTER' && (
                  <tr>
                    <th className='text-secondary fw-semibold'>ONG</th>
                    <td><Link to={`/configuracoes/ongs/detalhes/${itemData.ongId}`} className='ccolor-secondary'>{itemData.ongNome}</Link></td>
                  </tr>
                )}
                <tr>
                  <th className='text-secondary fw-semibold'>Status</th>
                  <td>
                    {itemData.status === 'ANALISE'
                      ? 'Em análise'
                      : `${itemData.status[0]}${itemData.status.slice(1).toLowerCase()}`}
                  </td>
                </tr>
              </tbody>
            </table>

            <section className="mt-4 d-flex gap-2 justify-content-center flex-wrap">
              {(userType === 'MASTER' || userType === 'FUNCIONARIO' || userType === 'STAFF') && (
                <>
                  <button className="btn btn-success"
                    onClick={handleAccept}
                  >Aceitar</button>
                  <button className="btn btn-danger"
                    onClick={handleReject}
                  >Recusar</button>
                </>
              )}
            </section>
          </div>
        </section>
      </div>

      {/* Modal de Imagem Ampliada */}
      {showImageModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(3px)' }} onClick={() => setShowImageModal(false)}>
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content bg-transparent border-0">
              <div className="modal-body p-0 position-relative">
                <button type="button" className="btn position-absolute rounded-circle border-0 top-0 end-0 m-3" onClick={() => setShowImageModal(false)} style={{ backgroundColor: 'rgba(255,255,255,0.9)', width: '40px', height: '40px' }}>
                  <i className="bi bi-x-lg fs-5 text-dark"></i>
                </button>

                <div className="position-relative">
                  <img src={itemData.arquivosDoacao[currentImageIndex].link} alt="ampliada" className="img-fluid" style={{ maxHeight: '90vh', width: '100%', objectFit: 'contain' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}