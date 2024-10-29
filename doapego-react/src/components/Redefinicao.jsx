import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';
import '../styles/layout.css';
import '../styles/forms.css';

function Redefinicao() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/login');
  };

  return (
    <>
      <div className="container px-1 py-5 px-md-4 text-lg-start my-5 borda" style={{ width: 400, height: 'auto' }}>
        <h2 className='text-center' style={{ fontSize: '2em', fontWeight: 600, color: '#FFCF55' }}>Criar nova senha</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="lock-closed" />
            </span>
            <input style={{ width: '105%' }} type="password" placeholder="Digite sua nova senha" required />
          </div>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="lock-closed" />
            </span>
            <input style={{ width: '105%' }} type="password" placeholder="Confirme sua nova senha" required />
          </div>

          <p style={{ fontSize: '.8em', color: '#4e4e4e', textAlign: 'center' }}>
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

export default Redefinicao; 
