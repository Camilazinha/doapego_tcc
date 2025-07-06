// src/pages/ResetPassword.jsx
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import errorTriangleIcon from '../img/errortriangle-icon.svg';
import successIcon from '../img/success-icon.svg';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const emailParam = searchParams.get('email');
  const email = emailParam || localStorage.getItem('resetEmail');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('E-mail não encontrado na URL.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        'http://localhost:8080/redefinir-senha/confirmar',
        {
          email: email,
          token: token,
          novaSenha: password
        }
      );

      setSuccess('Senha redefinida com sucesso. Redirecionando para login...');
      localStorage.removeItem('resetEmail');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError('Token inválido ou expirado.');
        } else {
          setError('Falha no servidor. Tente novamente mais tarde.');
        }
      } else {
        setError('Falha na conexão com o servidor. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>

      {error &&
        <div className="alert alert-danger d-flex align-items-center popup-alert w-25">
          <img src={errorTriangleIcon} className="me-2" alt="erro" />

          <div className='ms-1'>
            <p className="fw-semibold alert-heading">Erro!</p>
            <p className="mb-0">{error}</p>
          </div>
        </div>}

      {success &&
        <div className="alert alert-success d-flex align-items-center popup-alert w-25">
          <img src={successIcon} className="me-2" alt="sucesso" />

          <div className='ms-1'>
            <p className="fw-semibold alert-heading">Sucesso!</p>
            <p className="mb-0">{success}</p>
          </div>
        </div>}

      <div className="container my-5">
        <div className="form-container">
          <h2 className='titulo-pagina-container'>REDEFINIR SENHA</h2>

          <form onSubmit={handleSubmit}>
            <input type='hidden' value={email} />

            <div className="form-group">

              <label className='form-label'>Código enviado</label>
              <input
                type="text"
                className='form-control'
                placeholder="Digite o código enviado por e-mail"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className='form-label'>Nova senha</label>
              <input
                type="password"
                className='form-control'
                placeholder="Digite sua nova senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={20}
                required
              />
            </div>

            <div className="form-group">
              <label className='form-label'>Confirme a nova senha</label>
              <input
                type="password"
                className='form-control'
                placeholder="Confirme sua nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                maxLength={20}
                required
              />
            </div>

            <div className="form-group">
              <p className='texto-obs mb-4'>
                Sua senha deve conter no mínimo 6 caracteres (alfanumérico ou especial).
              </p>

              <button type="submit" className="btn btn-custom-filled" disabled={loading} >
                {loading ? 'Processando...' : 'Confirmar'}
              </button>

            </div>
          </form>
        </div>
      </div>
    </main>
  );
}