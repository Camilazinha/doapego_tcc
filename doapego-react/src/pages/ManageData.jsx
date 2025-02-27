// src/pages/ManageData.js

import React from 'react';
import { Link } from 'react-router-dom';

import crianca from "../img/crianca-mao-logo.png"
import gotoIcon from "../img/goto-icon.svg"

const sections = [
  {
    title: 'Categorias',
    description: 'Gerencie as categorias dos brinquedos, adicione, edite ou remova conforme necessário.',
    src: crianca,
    link: '/categorias',
    allowed: ['master', 'staff', 'funcionario']
  },
  {
    title: "Endereços",
    description: "Visualize os endereços principais das ONGs cadastradas na plataforma.",
    src: crianca,
    link: '/enderecos',
    allowed: ['master', 'staff', 'funcionario']
  },
  {
    title: "Organizações Não Governamentais",
    description: "Explore e gerencie todas as ONGs registradas na plataforma.",
    src: crianca,
    link: '/ongs',
    allowed: ['master']
  },
  {
    title: "Administradores",
    description: "Gerencie as contas dos administradores das ONGs e suas permissões.",
    src: crianca,
    link: '/administradores',
    allowed: ['master', 'staff']
  }
];

export default function ManageData() {
  return (
    <main>
      <div className='container-fluid my-5'>
        <h2 className='titulo-pagina'>GERENCIAR DADOS</h2>

        <div className='card-one mt-5'>

          {sections.filter(section => section.allowed.includes('master')).map((section, index) => (

            <div key={index} className='card'>
              <img src={section.src} alt='' className="card-img-top" />

              <div className='card-body'>
                <h4 className='card-title mb-4'>{section.title}</h4>
                <p className='card-text'>{section.description}</p>
              </div>

              <div className='card-body'>
                <Link to={section.link} class="btn btn-custom-filled">Acessar <img src={gotoIcon} alt='' /> </Link>
              </div>

            </div>
          ))}
        </div>
      </div>
    </main>
  );
}