//src/pages/ResetPassword.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import errorTriangleIcon from '../img/errortriangle-icon.svg';

export default function ResetPassword() {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verifica se as senhas coincidem e se a senha tem no mínimo 8 caracteres
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (password.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    navigate('/login');
  };

  return (
    <main>
      <div className="container my-5">

        <div className="form-container">
          <h2 className='titulo-pagina-container'>REDEFINIR SENHA</h2>

          <form onSubmit={handleSubmit}>

            {error && <div className="d-flex p-2 alert alert-danger"><img src={errorTriangleIcon} alt='' width='20' className='me-2' />{error}</div>}

            <div className="form-group">
              <label htmlFor='new-password' className='form-label'>Nova senha</label>
              <input id='new-password' type="password" className='form-control' placeholder="Digite sua nova senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <div className="form-group">
              <label htmlFor='confirm-password' className='form-label'>Confirme a nova senha</label>
              <input id='confirm-password' type="password" className='form-control' placeholder="Confirme sua nova senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>

            <div className="form-group">
              <p className='texto-obs mb-4'>
                Sua senha deve conter no mínimo 8 caracteres (alfanumérico ou especial).
              </p>

              <button type="submit" className="btn btn-custom-filled">Confirmar</button>
            </div>

          </form>

        </div>
      </div>
    </main>

  );

}

