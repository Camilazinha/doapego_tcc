// src/pages/Login.jsx
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import errorTriangleIcon from '../img/errortriangle-icon.svg';

export default function Login() {
  const [emailAdmin, setEmailAdmin] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrarMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!emailAdmin) {
      setError('Por favor, informe seu e‑mail.');
      return;
    }
    if (!senha) {
      setError('Por favor, informe sua senha.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/auth/admin/login',
        { email: emailAdmin, senha }
      );

      if (lembrarMe) {
        localStorage.setItem('token', response.data);
      }

      const dadosPayload = JSON.parse(atob(response.data.split('.')[1]));
      Number(ocalStorage.setItem('id', dadosPayload.id));
      localStorage.setItem('tipo', dadosPayload.tipo);
      Number(localStorage.setItem('ongId', dadosPayload.ongId));

      navigate('/inicio');

    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 400: //mensagem erro
            setError('Requisição inválida. Verifique os dados e tente novamente.');
            break;
          case 401:
            setError('E‑mail ou senha incorretos.');
            break;
          case 403:
            setError('Você não tem permissão para acessar este recurso.');
            break;
          case 500:
            setError('Erro interno no servidor. Tente novamente mais tarde.');
            break;
          default:
            setError(err.response.data?.message || `Erro ${err.response.status}.`);
        }
      } else if (err.request) {
        setError('Não foi possível conectar ao servidor.');
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="container my-5">
        <div className="form-container">
          <h2 className='titulo-pagina-container'>LOGIN</h2>

          <form onSubmit={handleLogin}>

            {error && <div className="d-flex p-2 alert alert-danger"><img src={errorTriangleIcon} alt='' width='20' className='me-2' />{error}</div>}

            <div className="form-group">
              <label htmlFor='email-admin' className='form-label'>E-mail</label>
              <input
                id='email-admin'
                type="email"
                className='form-control'
                placeholder="Insira seu e-mail"
                value={emailAdmin}
                onChange={(e) => setEmailAdmin(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor='senha-admin' className='form-label'>Senha</label>
              <input
                id='senha-admin'
                type="password"
                className='form-control'
                placeholder="Insira sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className='form-group form-check ps-1'>
              <div className="d-flex justify-content-end">
                <Link to="/esqueci-minha-senha" className='form-link'>Esqueci minha senha</Link>
              </div>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-custom-filled" disabled={loading} >
                {loading ? 'Carregando...' : 'Entrar'}
              </button>
            </div>

            <section className="form-group">
              <p>Ainda não cadastrado? <Link to="/solicitar-cadastro" className='form-link'>Solicitar cadastro</Link></p>
            </section>

          </form>
        </div>
      </div>
    </main>
  );
}