import React from 'react';
// import { Link } from 'react-router-dom';
import '../styles/main.css';
import '../styles/layout.css';

function  Redefinicao () {
  return (
<>
<div className="container px-4 py-5 bg-white justify-content-center" style={{borderStyle: 'solid', borderColor: '#bbbbbb', borderWidth: 2, borderRadius: 20, width: 400, height: 'auto', boxShadow: '0 0 20px #a0a0a0', marginTop: 30}}>
  <h2 style={{fontSize: '2em', fontWeight: 600, color: '#FFCF55', textAlign: 'center'}}>Criar nova senha</h2>
  <form action>
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
    <p style={{fontSize: '.8em', color: '#4e4e4e', margin: '30px 0 0', textAlign: 'center'}}>
      Sua senha deve conter no mínimo 8 caracteres (alfanumérico ou especial)
    </p>
    <div style={{display: 'flex', justifyContent: 'center'}} className="button-box">
      <button type="submit" className="mt-3 py-2 btn alt-button" style={{width: '75%', height: 45, background: '#FFA4C5', border: 'none', outline: 'none', borderRadius: 40, cursor: 'pointer', fontSize: '0.9em', color: '#fff', fontWeight: 500, justifyContent: 'center'}}>
        Confirmar
      </button>
    </div>
  </form>
</div>

</>
);
};

export default Redefinicao; 
