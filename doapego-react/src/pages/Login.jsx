// src/components/Login.js

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [emailAdmin, setEmailAdmin] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Busca o email e a senha do localStorage
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    // Verifica as credenciais
    if (emailAdmin === storedEmail && senha === storedPassword) {
      alert('Login realizado com sucesso!');
      navigate('/inicio');
    } else {
      alert('Email ou senha incorretos. Tente novamente!');
    }
  };

  return (
    <main className="container form-container my-5">
      <h2 className='titulo-pagina'>LOGIN</h2>

      <form onSubmit={handleLogin}>

        <div className="form-group">
          <label htmlFor='email-admin' className='form-label'>E-mail</label>
          <input id='email-admin' type="email" className='form-control' placeholder="Insira seu e-mail" value={emailAdmin} onChange={(e) => setEmailAdmin(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor='senha-admin' className='form-label'>Senha</label>
          <input id='senha-admin' type="password" className='form-control' placeholder="Insira sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </div>

        <div className='form-group form-check'>
          <input className="form-check-input" type="checkbox" id='remember-me' />
          <div className="d-flex justify-content-between">
            <label className='form-check-label' htmlFor='remember-me'>Lembrar-me</label>
            <Link to="/esqueci-minha-senha" className='form-link'>Esqueci minha senha</Link>
          </div>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-custom-filled">Entrar</button>
        </div>


        <section className="form-group">
          <p>Ainda não tem uma conta? <Link to="/cadastro" className='form-link'>Cadastrar-se</Link></p>
        </section>

      </form>
    </main>
  );
}