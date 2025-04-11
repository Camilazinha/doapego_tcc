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

  const [endereco, setEndereco] = useState({
    cep: "",
    estado: "",
    cidade: "",
    bairro: "",
    numero: "",
    logradouro: "",
    complemento: "",
    principal: true,
    ativo: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState("");

  // Atualiza os campos da ONG
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Atualiza os campos do endereço
  const handleEnderecoChange = (e) => {
    setEndereco({ ...endereco, [e.target.name]: e.target.value });
  };

  // Envia a solicitação para criar a ONG e o endereço
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setValidationError("");

    // Verifica se os campos obrigatórios estão preenchidos
    const camposObrigatorios = ["nome", "email", "descricao", "cep", "estado", "cidade", "bairro", "numero", "logradouro"];
    const camposVazios = camposObrigatorios.filter((campo) => !formData[campo]?.trim() && !endereco[campo]?.trim());

    if (camposVazios.length > 0) {
      setValidationError(`Preencha os campos obrigatórios: ${camposVazios.join(", ")}`);
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Cadastra a ONG
      const responseOng = await axios.post("http://localhost:8080/ongs", {
        ...formData,
        statusOng: "PENDENTE",
      });

      const ongId = responseOng.data.id; // Obtém o ID da ONG recém-criada

      // 2️⃣ Cadastra o endereço da ONG
      await axios.post("http://localhost:8080/enderecos-ong", {
        ...endereco,
        ong: { id: ongId }, // Vincula o endereço à ONG criada
      });

      alert("Solicitação enviada com sucesso! Aguarde aprovação.");

      // Reseta os formulários
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        whatsapp: "",
        fundacao: "",
        descricao: "",
        fotoPerfil: "",
      });

      setEndereco({
        cep: "",
        estado: "",
        cidade: "",
        bairro: "",
        numero: "",
        logradouro: "",
        complemento: "",
        principal: true,
        ativo: true,
      });
    } catch (err) {
      console.error("Erro ao enviar o cadastro:", err);
      setError("Erro ao processar a solicitação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="container my-5">
        <h2 className="titulo-pagina mb-4">SOLICITAR CADASTRO</h2>
        <p className="subtitulo mb-4">Preencha os campos com as informações da sua ONG. Após análise, entraremos em contato por e-mail com os dados de acesso ao sistema, caso seu cadastro seja aprovado.</p>

        {/* Exibir mensagens de erro */}
        {(error || validationError) && (
          <div className="alert alert-danger d-flex align-items-center">
            <img src={errorTriangleIcon} className="me-2" alt="Erro" />
            <p className="m-0">{error || validationError}</p>
          </div>
        )}

        <div className="mt-4 form-container-cadastro">
          <form onSubmit={handleSubmit}>

            {/* Dados da ONG */}
            <h4 className="mb-3 mt-1 subtitulo-container">Dados da ONG</h4>

            <div className="form-group">
              <label className="form-label">Nome <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="nome" value={formData.nome} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">E-mail<span className="text-danger">*</span></label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Telefone</label>
              <input type="text" className="form-control" name="telefone" value={formData.telefone} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">Descrição <span className="text-danger">*</span></label>
              <textarea className="form-control" name="descricao" rows="3" value={formData.descricao} onChange={handleChange} required></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">Foto (URL)</label>
              <input type="url" className="form-control" name="fotoPerfil" value={formData.fotoPerfil} onChange={handleChange} />
            </div>

            {/* Endereço da ONG */}
            <h4 className="mb-3 mt-4 subtitulo-container">Endereço da ONG</h4>

            <div className="form-group">
              <label className="form-label">CEP <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="cep" value={endereco.cep} onChange={handleEnderecoChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Estado <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="estado" value={endereco.estado} onChange={handleEnderecoChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Cidade <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="cidade" value={endereco.cidade} onChange={handleEnderecoChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Bairro <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="bairro" value={endereco.bairro} onChange={handleEnderecoChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Logradouro <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="logradouro" value={endereco.logradouro} onChange={handleEnderecoChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Número <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="numero" value={endereco.numero} onChange={handleEnderecoChange} required />
            </div>

            <button type="submit" className="btn btn-custom-filled" disabled={loading}>
              {loading ? "Enviando..." : "Enviar solicitação"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
