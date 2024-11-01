// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/main.css';
import '../styles/layout.css';
import '../styles/login.css';
import '../styles/forms.css';

function Login() {
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
      navigate('/inicio'); // Redireciona para uma página de boas-vindas ou outra de sua escolha
    } else {
      alert('Email ou senha incorretos. Tente novamente!');
    }
  };

  return (
    <div className="container px-1 py-5 px-md-4 text-lg-start borda mt-5" style={{ width: 400, height: 'auto' }}>
      <h2 style={{ fontSize: '2em', fontWeight: 600, color: '#FFCF55', textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-box">
          <span className="icon">
            <ion-icon name="mail" />
          </span>
          <input
            type="text"
            placeholder="E-mail"
            value={emailAdmin}
            onChange={(e) => setEmailAdmin(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <span className="icon">
            <ion-icon name="lock-closed" />
          </span>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div className="remember-forgot mx-2 d-flex align-items-center" style={{ justifyContent: 'space-between', fontSize: '.9em' }}>
          <label><input className="form-check-input me-1" type="checkbox" />Lembre-se de mim </label>

          <Link to="/esqueci-senha">Esqueci minha senha</Link>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }} className="button-box">
          <button type="submit" className="mt-3 py-2 btn btn-navbar-custom w-75"> Login
          </button>
        </div>
        <div className="register-link" style={{ margin: '20px 0 -30px', fontSize: '.9em', display: 'flex', justifyContent: 'center' }}>
          <p>Novo por aqui? <Link to="/cadastro">Cadastrar-se</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Login;
