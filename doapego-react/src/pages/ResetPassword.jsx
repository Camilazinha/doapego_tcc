import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import errorTriangleIcon from '../img/errortriangle-icon.svg';
import axios from 'axios';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validações
    if (!email) {
      setError('E-mail não encontrado na URL');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres');
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

      setSuccess('Senha redefinida com sucesso!');
      localStorage.removeItem('resetEmail'); // Limpa APÓS sucesso
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      // Tratamento detalhado de erros
      if (err.response) {
        if (err.response.status === 400) {
          setError('Token inválido ou expirado');
        } else if (err.response.status === 404) {
          setError('Usuário não encontrado');
        } else {
          setError('Erro no servidor');
        }
      } else {
        setError('Erro de conexão com o servidor');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="container my-5">
        <div className="form-container">
          <h2 className='titulo-pagina-container'>REDEFINIR SENHA</h2>

          <form onSubmit={handleSubmit}>
            {success && (
              <div className="alert alert-success">
                {success} Redirecionando para login...
              </div>
            )}

            {error && <div className="d-flex p-2 alert alert-danger"><img src={errorTriangleIcon} alt='' width='20' className='me-2' />{error}</div>}

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
                required
              />
            </div>

            <div className="form-group">
              <p className='texto-obs mb-4'>
                Sua senha deve conter no mínimo 8 caracteres (alfanumérico ou especial).
              </p>

              <button
                type="submit"
                className="btn btn-custom-filled"
                disabled={loading}
              >
                {loading ? 'Processando...' : 'Confirmar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}