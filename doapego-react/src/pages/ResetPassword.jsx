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
      <div className="container form-container my-5">
        <h2 className='titulo-pagina-container'>REDEFINIR SENHA</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor='new-password' className='form-label'>Nova senha</label>
            <input id='new-password' type="password" className='form-control' placeholder="Digite sua nova senha" required />
          </div>

          <div className="form-group">
            <label htmlFor='confirm-password' className='form-label'>Confirme a nova senha</label>
            <input id='confirm-password' type="password" className='form-control' placeholder="Confirme sua nova senha" required />
          </div>

          <div className="form-group">
            {/* <p className='texto-obs'>
              Sua senha deve conter no mínimo 8 caracteres (alfanumérico ou especial)
            </p> */}
            <button type="submit" className="btn btn-custom-filled"> Confirmar</button>
          </div>
        </form>
      </div>

    </>
  );
};
