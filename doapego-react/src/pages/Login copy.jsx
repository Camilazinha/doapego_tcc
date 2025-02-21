// src/components/Login.js

import React, { useState } from 'react';
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
      navigate('/inicio'); // Redireciona para uma página de boas-vindas ou outra de sua escolha
    } else {
      alert('Email ou senha incorretos. Tente novamente!');
    }
  };

  return (
    <div className="container px-1 py-5 px-md-4 text-lg-start mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-box">
          <span className="icon">
            <ion-icon name="mail" />
          </span>
          <input type="text" placeholder="E-mail" value={emailAdmin} onChange={(e) => setEmailAdmin(e.target.value)} required />
        </div>
        <div className="input-box">
          <span className="icon">
            <ion-icon name="lock-closed" />
          </span>
          <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </div>
        <div className="remember-forgot mx-2 d-flex align-items-center">
          <label><input className="form-check-input me-1" type="checkbox" />Lembrar-se de mim </label>

          <Link to="/esqueci-senha">Esqueci minha senha</Link>
        </div>
        <div className="button-box">
          <button type="submit" className="mt-3 py-2 btn btn-navbar-custom w-75"> Entrar
          </button>
        </div>
        <div className="register-link">
          <p>Ainda não tem uma conta? <Link to="/cadastro">Cadastrar-se</Link></p>
        </div>
      </form>
    </div>
  );
}