import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/login');
  };

  return (
    <>
      <div className="container px-1 py-5 px-md-4 text-lg-start my-5">
        <h2 className='text-center'>Criar nova senha</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="lock-closed" />
            </span>
            <input type="password" placeholder="Digite sua nova senha" required />
          </div>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="lock-closed" />
            </span>
            <input type="password" placeholder="Confirme sua nova senha" required />
          </div>

          <p>
            Sua senha deve conter no mínimo 8 caracteres (alfanumérico ou especial)
          </p>
          <div className="button-box d-flex justify-content-center">
            <button type="submit" className="mt-3 py-2 btn btn-navbar-custom w-75">
              Confirmar
            </button>
          </div>
        </form>
      </div>

    </>
  );
};
