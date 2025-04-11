import { useState } from "react";
import axios from "axios";
import errorTriangleIcon from "../img/errortriangle-icon.svg";

export default function CadastroStaff() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    whatsapp: "",
    fundacao: "",
    descricao: "",
    fotoPerfil: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState("");

  // Atualiza os campos do formulário conforme o usuário digita
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para enviar a solicitação de criação da ONG
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setValidationError("");

    // Verifica se os campos obrigatórios estão preenchidos
    const camposObrigatorios = ["nome", "email", "descricao"];
    const camposVazios = camposObrigatorios.filter((campo) => !formData[campo]?.trim());

    if (camposVazios.length > 0) {
      setValidationError(`Preencha os campos obrigatórios: ${camposVazios.join(", ")}`);
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:8080/ongs", {
        ...formData,
        statusOng: "PENDENTE", // O status sempre será PENDENTE por padrão
      });

      alert("Solicitação enviada com sucesso! Aguarde aprovação.");

      // Reseta o formulário
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        whatsapp: "",
        fundacao: "",
        descricao: "",
        fotoPerfil: "",
      });
    } catch (err) {
      console.error("Erro ao enviar:", err);
      if (err.response) {
        setError("Erro ao processar a solicitação. Tente novamente.");
      } else if (err.request) {
        setError("Falha na conexão com o servidor. Verifique sua internet.");
      } else {
        setError("Ocorreu um erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="container my-5">
        <h2 className="titulo-pagina mb-5">SOLICITAR CADASTRO</h2>
        <div className="form-container">

          {/* Exibir mensagens de erro */}
          {(error || validationError) && (
            <div className="alert alert-danger d-flex align-items-center">
              <img src={errorTriangleIcon} className="me-2" alt="Erro" />
              <p className="m-0">{error || validationError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label className="form-label">Nome da ONG <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="nome" value={formData.nome} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">E-mail <span className="text-danger">*</span></label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Telefone</label>
              <input type="text" className="form-control" name="telefone" value={formData.telefone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">WhatsApp</label>
              <input type="text" className="form-control" name="whatsapp" value={formData.whatsapp} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">Data de Fundação</label>
              <input type="date" className="form-control" name="fundacao" value={formData.fundacao} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">Descrição da ONG <span className="text-danger">*</span></label>
              <textarea className="form-control" name="descricao" rows="3" value={formData.descricao} onChange={handleChange} required></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">URL da Foto de Perfil</label>
              <input type="url" className="form-control" name="fotoPerfil" value={formData.fotoPerfil} onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn-custom-filled" disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                  Enviando...
                </>
              ) : (
                "Enviar solicitação"
              )}
            </button>
          </form>
        </div>
      </div>

    </main >
  );
}
