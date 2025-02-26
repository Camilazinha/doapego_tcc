// src/pages/ManageData.js

import React from 'react';
import { Link } from 'react-router-dom';
import crianca from "../img/crianca-mao-logo.png"

const sections = [
  {
    title: 'Ver Categorias',
    description: 'Gerencie as categorias dos brinquedos, adicione, edite ou remova conforme necessário.',
    src: crianca,
    link: '/categorias',
    allowed: ['master', 'blablablba']
  },
  {
    title: "Ver Endereços",
    description: "Visualize os endereços principais das ONGs cadastradas na plataforma.",
    src: crianca,
    link: '/enderecos',
    allowed: ['master', 'blablablba']
  },
  {
    title: "Gerenciar ONGs",
    description: "Explore e gerencie todas as ONGs registradas na plataforma.",
    src: crianca,
    link: '/ongs',
    allowed: ['master', 'blablablba']
  },
  {
    title: "Ver Administradores",
    description: "Gerencie as contas dos administradores das ONGs e suas permissões.",
    src: crianca,
    link: '/administradores',
    allowed: ['master', 'blablablba']
  }
];

export default function ManageData() {
  return (
    <main>
      <div className='container my-5'>
        <h2 className='titulo-pagina'>GERENCIAR DADOS</h2>

        {sections.filter(section => section.allowed.includes('master')).map((section, index) => (
          <div key={index} className='card'>
            <img src={section.src} alt='' className="card-img-top" />

            <div className='card-body'>
              <h4 className='card-title'>{section.title}</h4>
              <p className='card-text'>{section.description}</p>
            </div>

            <div className='card-body'>
              <Link to={section.link} class="btn btn-primary">Go somewhere</Link>
            </div>
          </div>
        ))}

      </div>
    </main>
  );
}