// src/pages/ForgotPassword.jsx
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');

    try {
      await axios.post(
        'http://localhost:8080/redefinir-senha/solicitar',
        email,
        {
          headers: {
            'Content-Type': 'text/plain'
          }
        }
      );

      setMensagem('Link enviado com sucesso. Verifique seu e-mail.');
      localStorage.setItem('resetEmail', email);
    } catch (error) { // MENSAGEM DE ERRO
      if (error.response && error.response.status === 400) {
        setErro('E-mail não encontrado');
      } else {
        setErro('Erro ao enviar o link. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="container my-5">
        <div className='form-container'>
          <h2 className='titulo-pagina-container'>RECUPERAR SENHA</h2>

          <form onSubmit={handleSubmit}>
            <p className='texto-obs'>Insira o e-mail cadastrado para receber o link.</p>

            {mensagem && <div className="alert alert-success">{mensagem}</div>}
            {erro && <div className="alert alert-danger">{erro}</div>}

            <div className='form-group'>
              <label htmlFor='email' className='form-label'>E-mail</label>
              <input id='email' type="email" className='form-control' placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-custom-filled" disabled={loading} >
                {loading ? 'Enviando...' : 'Enviar link'}
              </button>
            </div>

            <Link to='/login' className='form-link d-grid justify-content-center'>
              Voltar para login
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
}