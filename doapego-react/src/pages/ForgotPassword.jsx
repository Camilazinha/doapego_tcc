import React from 'react';
import { useNavigate, Link } from 'react-router-dom';


export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/redefinir-senha');
  };

  return (
    <main className="container form-container my-5">
      <h2 className='titulo-pagina-container'>RECUPERAR SENHA</h2>

      <form onSubmit={handleSubmit}>
        <p className='texto-obs'>Insira o e-mail cadastrado para receber o link.</p>

        <div className='form-group'>
          <label htmlFor='email-admin' className='form-label'>E-mail</label>
          <input id='email-admin' type="email" className='form-control' placeholder="Digite seu e-mail" required />
        </div>


        <div className="form-group">
          <button type="submit" className="btn btn-custom-filled">
            Enviar link
          </button>
        </div>
        <Link to='/login' className='form-link d-grid justify-content-center'>Voltar para login</Link >

      </form>
    </main >

  );
};
