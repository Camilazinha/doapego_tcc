import React from 'react';
import { useNavigate, Link } from 'react-router-dom';


function Esquecimento() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/login');
  };

  return (
    <div>
      <div className="container px-1 py-5 px-md-4 mt-5 text-lg-start borda" style={{ width: 400, height: 'auto' }}>
        <h2 className='text-center' style={{ fontSize: '2em', fontWeight: 600, color: '#FFCF55' }}>Recuperar senha</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="mail" />
            </span>
            <input type="email" placeholder="E-mail" required />
          </div>

          <p style={{ fontSize: '.8em', color: '#4e4e4e', margin: '0', textAlign: 'center' }}>
            Insira o e-mail cadastrado para receber o link.
          </p>

          <div className="button-box dois-links">
            <button type="submit" className="mt-3 py-2 btn-sm btn-navbar-custom w-75" required onClick={() => navigate('/redefinir-senha')}>
              Enviar link de recuperação
            </button>
            <Link to='/login' className='mt-2 py-2 btn-sm text-center w-50 alt-button'>Voltar para o login</Link >
          </div>

        </form>
      </div>
    </div>

  );
};

export default Esquecimento;