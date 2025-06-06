//src/pages/ForgotPassword.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');

    try {
      // CORREÇÃO: Enviar apenas o email como string (text/plain)
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
    } catch (error) {
      // Tratamento aprimorado de erros
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
              <input
                id='email'
                type="email"
                className='form-control'
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-custom-filled"
                disabled={loading}
              >
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