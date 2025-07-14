// src/pages/CadastroStaff.jsx
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { formatarTelefone, formatarCEP, removerMascara } from "../helpers/masks";
import { buscarCEP } from "../helpers/cepService";

import errorTriangleIcon from "../img/errortriangle-icon.svg";
import successIcon from "../img/success-icon.svg";

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
  const [cepValido, setCepValido] = useState(true);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    let timer;
    if (error || success) {
      timer = setTimeout(() => {
        setError(null);
        setSuccess('');
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [error, success]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    let valorFormatado = value;

    if (name === 'telefone' || name === 'whatsapp') {
      valorFormatado = formatarTelefone(value);
    }

    setFormData(prev => ({ ...prev, [name]: valorFormatado }));
  };

  const handleEnderecoChange = async (e) => {
    const { name, value } = e.target;
    let valorFormatado = value;

    if (name === 'cep') {
      valorFormatado = formatarCEP(value);
      handleBuscaCEP(valorFormatado);
    }

    setEndereco(prev => ({ ...prev, [name]: valorFormatado }));
  };

  const handleBuscaCEP = async (cep) => {
    const cepLimpo = removerMascara(cep);

    if (cepLimpo.length === 8) {
      try {
        const enderecoCompleto = await buscarCEP(cepLimpo);

        if (enderecoCompleto.erro) {
          setError('CEP não encontrado.');
          setCepValido(false);

          setEndereco(prev => ({
            ...prev,
            logradouro: '',
            bairro: '',
            cidade: '',
            estado: ''
          }));
        } else {
          setCepValido(true);
          setEndereco(prev => ({
            ...prev,
            ...enderecoCompleto,
            cep: formatarCEP(cepLimpo)
          }));
        }
      } catch (error) {
        setError('Erro ao buscar CEP.');
        setEndereco(prev => ({
          ...prev,
          logradouro: '',
          bairro: '',
          cidade: '',
          estado: ''
        }));
      }
    }
  };

  const validarCampos = () => {

    // Validação de campos obrigatórios
    const camposObrigatorios = [
      { key: 'nome', value: formData.nome },
      { key: 'email', value: formData.email },
      { key: 'numero', value: endereco.numero },
      { key: 'cep', value: endereco.cep }
    ];

    const camposVazios = camposObrigatorios.filter(campo => !campo.value.trim());
    if (camposVazios.length > 0) {
      setError("Preencha todos os campos obrigatórios.");

      return false;
    }

    // Validação de CEP
    const cepLimpo = removerMascara(endereco.cep);
    if (cepLimpo.length !== 8) {
      setError("CEP inválido (deve conter 8 dígitos).");
      return false;
    }

    // Validação de telefone
    if (formData.telefone) {
      const telefoneLimpo = removerMascara(formData.telefone);
      if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
        setError("Telefone inválido (deve conter 10 ou 11 dígitos com DDD).");

        return false;
      }
    }

    // Validação de WhatsApp
    if (formData.whatsapp) {
      const whatsappLimpo = removerMascara(formData.whatsapp);
      if (whatsappLimpo.length < 10 || whatsappLimpo.length > 11) {
        setError("WhatsApp inválido (deve conter 10 ou 11 dígitos com DDD).");
        return false;
      }
    }

    // Validação de data
    if (formData.fundacao) {
      const dataAtual = new Date();
      const dataFundacao = new Date(formData.fundacao);

      if (isNaN(dataFundacao.getTime())) {
        setError("Data de fundação inválida.");
        return false;
      }
      if (dataFundacao > dataAtual) {
        setError("Data de fundação não pode ser futura.");
        return false;
      }
      if (dataFundacao.getFullYear() < 1900) {
        setError("Data de fundação inválida. Deve ser a partir de 1900.");
        return false;
      }
    }

    if (!cepValido) {
      setError("CEP inválido. Por favor, corrija o CEP antes de continuar.");
      return false;
    }

    // Validação de campos de endereço
    if (!endereco.logradouro || !endereco.bairro || !endereco.cidade || !endereco.estado) {
      setError("Preencha todos os campos do endereço corretamente.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validarCampos()) return;

    setLoading(true);

    try {
      const dadosOng = {
        ...formData,
        telefone: removerMascara(formData.telefone),
        whatsapp: removerMascara(formData.whatsapp),
        statusOng: "PENDENTE"
      };

      const responseOng = await axios.post("http://localhost:8080/ongs", dadosOng);
      const ongId = responseOng.data.id;

      await axios.post("http://localhost:8080/enderecos-ong", {
        ...endereco,
        cep: removerMascara(endereco.cep),
        ong: { id: ongId }
      });

      setSuccess("Solicitação enviada com sucesso! Aguarde aprovação.");

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

      if (err.response) {
        if (err.response.status === 400) {
          setError("Falha na validação: " + err.response.data.message);
        } else if (err.response.status === 409) {
          setError("E-mail já cadastrado.");
        } else if (err.response.status >= 500) {
          setError("Erro no servidor. Tente novamente.");
        } else {
          setError("Falha ao processar a solicitação. Tente novamente.");
        }
      }
      else if (err.request) {
        setError("Não foi possível conectar ao servidor. Tente novamente.");
      }
      else {
        setError("Ocorreu um erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

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

      <div className="container my-5">
        <h2 className="titulo-pagina mb-4">SOLICITAR CADASTRO</h2>
        <p className="subtitulo mb-4">Preencha os campos com as informações da sua ONG. Após análise, entraremos em contato por e-mail com os dados de acesso ao sistema, caso seu cadastro seja aprovado.</p>

        <div className="mt-4 form-container-cadastro">
          <form onSubmit={handleSubmit}>

            <h4 className="mb-3 mt-1 subtitulo-container">Dados da ONG</h4>

            <div className="form-group">
              <label className="form-label">Nome<span className="text-danger">*</span></label>
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
              <label className="form-label">WhatsApp</label>
              <input type="text" className="form-control" name="whatsapp" value={formData.whatsapp} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">Descrição</label>
              <textarea className="form-control" name="descricao" rows="3" value={formData.descricao} onChange={handleChange}></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">Data de Fundação</label>
              <input type="date" className="form-control" name="fundacao" value={formData.fundacao} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">Foto (URL)</label>
              <input type="url" className="form-control" name="fotoPerfil" value={formData.fotoPerfil} onChange={handleChange} />
            </div>

            <h4 className="mb-3 mt-4 subtitulo-container">Endereço da ONG</h4>

            <div className="form-group">
              <label className="form-label">CEP<span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="cep" value={endereco.cep} onChange={handleEnderecoChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Estado<span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="estado" value={endereco.estado} onChange={handleEnderecoChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Cidade<span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="cidade" value={endereco.cidade} onChange={handleEnderecoChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Bairro<span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="bairro" value={endereco.bairro} onChange={handleEnderecoChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Logradouro<span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="logradouro" value={endereco.logradouro} onChange={handleEnderecoChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Número<span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="numero" value={endereco.numero} onChange={handleEnderecoChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Complemento</label>
              <input type="text" className="form-control" name="complemento" value={endereco.complemento} onChange={handleEnderecoChange} />
            </div>

            <button type="submit" className="btn btn-custom-filled" disabled={loading}>
              {loading ? "Enviando..." : "Enviar solicitação"}
            </button>

            <Link to='/login' className='form-link d-grid justify-content-center'>Voltar para login</Link>

          </form>
        </div>
      </div>
    </main>
  );
}
