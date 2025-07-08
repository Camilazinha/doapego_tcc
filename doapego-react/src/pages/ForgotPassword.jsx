// src/pages/ForgotPassword.jsx
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import errorTriangleIcon from "../img/errortriangle-icon.svg";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setError(null);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [error]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post(
        'http://localhost:8080/redefinir-senha/solicitar',
        email,
        {
          headers: {
            'Content-Type': 'text/plain'
          }
        }
      );

      localStorage.setItem('resetEmail', email);
      navigate('/redefinir-senha');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('E-mail não encontrado.');
      } else {
        setError('Erro ao enviar o link. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>

      {error &&
        <div className="alert alert-danger d-flex align-items-start popup-alert w-25">
          <img src={errorTriangleIcon} className="me-2" alt="erro" />

          <div className='ms-1'>
            <p className="fw-semibold alert-heading">Erro!</p>
            <p className="mb-0">{error}</p>
          </div>
        </div>}

      <div className="container my-5">
        <div className='form-container'>
          <h2 className='titulo-pagina-container'>RECUPERAR SENHA</h2>

          <form onSubmit={handleSubmit}>
            <p className='texto-obs'>Insira o e-mail cadastrado para receber o link.</p>

            <div className='form-group'>
              <label htmlFor='email' className='form-label'>E-mail</label>
              <input id='email' type="email" className='form-control' placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-custom-filled" disabled={loading} >
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