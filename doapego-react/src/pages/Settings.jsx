// src/pages/Settings.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';

import rightChevronIcon from "../img/rightchevron-icon.svg"
import testIcon from "../img/test-icon.svg"

export default function Settings() {

  const sections = [
    {
      title: 'Administradores',
      icon: testIcon,
      link: '/administradores',
      allowed: ['master', 'staff']
    },
    {
      title: 'Categorias',
      icon: testIcon,
      link: '/categorias',
      allowed: ['master', 'staff']
    },
    {
      title: 'Endereços',
      icon: testIcon,
      link: '/enderecos',
      allowed: ['master', 'staff', 'funcionario']
    },
    {
      title: 'ONGs',
      icon: testIcon,
      link: '/ongs',
      allowed: ['master']
    },
    {
      title: 'Usuários',
      icon: testIcon,
      link: '/usuarios',
      allowed: ['master']
    },
    {
      title: 'Ajuda',
      icon: testIcon,
      link: '/faq',
      allowed: ['master', 'staff', 'funcionario']
    }
  ]

    return (          
    <main>
      <div className="container my-5">
        <h2 className="titulo-pagina mb-5">CONFIGURAÇÕES</h2>
        {/* <p className='subtitulo align-center'>TEXTO MENORZINHO</p> */}

        {sections.filter(section => section.allowed.includes('staff')).map((section, index) => (
        <div key={index} className="container container-config my-4">

          <Link to={section.link} className='item-config'>
            <span className='d-flex gap-2 align-items-center'>
              <img src={section.icon} alt='' />
              <p>{section.title}</p>
            </span>
            <img src={rightChevronIcon} alt='' />
          </Link>
      </div>

        ))}
          </div>

    </main>

        );
      };