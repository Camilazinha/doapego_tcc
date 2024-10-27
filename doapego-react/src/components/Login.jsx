// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';
import '../styles/layout.css';
import '../styles/login.css';
import '../styles/forms.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Busca o email e a senha do localStorage
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    // Verifica as credenciais
    if (email === storedEmail && senha === storedPassword) {
      alert('Login realizado com sucesso!');
      navigate('/bemvindo'); // Redireciona para uma página de boas-vindas ou outra de sua escolha
    } else {
      alert('Email ou senha incorretos. Tente novamente!');
    }
  };

  return (
    <div className="container px-4 py-5 bg-white justify-content-center" style={{borderStyle: 'solid', borderColor: '#bbbbbb', borderWidth: 2, borderRadius: 20, width: 400, height: 'auto', boxShadow: '0 0 20px #a0a0a0', marginTop: 30}}>
      <h2 style={{fontSize: '2em', fontWeight: 600, color: '#FFCF55', textAlign: 'center'}}>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-box">
          <span className="icon">
            <ion-icon name="mail" />
          </span>
          <input
            type="text"
            placeholder="Email da ONG"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="remember-forgot" style={{margin: '15px 0 15px', fontSize: '.9em', color: '#4e4e4e', display: 'flex', justifyContent: 'space-between', marginLeft: 15, marginRight: 15}}>
          <label><input type="checkbox" /> Lembre-se de mim </label>
          <a href="#">Esqueci minha senha</a>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}} className="button-box">
          <button type="submit" className="mt-3 py-2 btn alt-button" style={{width: '60%', height: 45, background: '#FFA4C5', border: 'none', outline: 'none', borderRadius: 40, cursor: 'pointer', fontSize: '1em', color: '#fff', fontWeight: 500}}>
            Login
          </button>
        </div>
        <div className="register-link" style={{margin: '20px 0 -30px', fontSize: '.9em', color: '#4e4e4e', display: 'flex', justifyContent: 'center'}}>
          <p>Novo por aqui? <a href="register.html">Cadastrar ONG</a></p>
        </div>
      </form>
    </div>
  );
}

export default Login;
