// src/pages/Settings.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';

import rightChevronIcon from "../img/rightchevron-icon.svg"
import testIcon from "../img/test-icon.svg"

export default function Settings() {

  const sections = [
    {
      id: 'adm',
      title: 'Administradores',
      icon: testIcon,
      link: '/gerenciar/administradores',
      allowed: ['master', 'staff']
    },
    {
      id: 'category',
      title: 'Categorias',
      icon: testIcon,
      link: '/gerenciar/categorias-doacao',
      allowed: ['master', 'staff']
    },
    {
      id: 'address',
      title: 'Endereços',
      icon: testIcon,
      link: '/gerenciar/enderecos-ong',
      allowed: ['master', 'staff', 'funcionario']
    },
    {
      id: 'ngo',
      title: 'ONGs',
      icon: testIcon,
      link: '/gerenciar/ongs',
      allowed: ['master']
    },
    {
      id: 'user',
      title: 'Usuários',
      icon: testIcon,
      link: '/gerenciar/usuarios',
      allowed: ['master']
    },
    {
      id: 'help',
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

        {sections.filter(section => section.allowed.includes('master')).map((section) => (
        <div key={section.id} className="container container-config my-4">

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