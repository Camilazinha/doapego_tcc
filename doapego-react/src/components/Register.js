import React from 'react';
import '../styles/main.css';
import '../styles/layout.css';

function Register () {
  return (
    <main>
      <div className="position-relative text-white">
        <div
          className="position-relative text-white"
          style={{
            backgroundImage: 'url("https://picsum.photos/1200/500")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '350px',
            alignContent: 'center',
          }}
        >
          <div
            className="container-fluid"
            style={{ maxWidth: '100%', width: 'auto', textAlign: 'center' }}
          >
            <h1 className="ps-5" style={{ fontSize: 'calc(1.5rem + 1vw)' }}>
              Parceiros
            </h1>
          </div>
        </div>
      </div>
      {/* Aqui vai o restante do conteúdo da página */}
    </main>
  );
};

export default Register;
