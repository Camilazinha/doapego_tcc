// src/pages/Settings.jsx

import { Link } from 'react-router-dom';

import rightChevronIcon from "../img/rightchevron-icon.svg"
import testIcon from "../img/test-icon.svg"

export default function Settings() {

  const sections = [
    {
      id: 'adm',
      title: 'Administradores',
      icon: testIcon,
      link: '/configuracoes/administradores',
      allowed: ['master', 'staff']
    },
    {
      id: 'category',
      title: 'Categorias',
      icon: testIcon,
      link: '/configuracoes/categorias-doacao',
      allowed: ['master', 'staff']
    },
    {
      id: 'address',
      title: 'Endereços',
      icon: testIcon,
      link: '/configuracoes/enderecos-ong',
      allowed: ['master', 'staff', 'funcionario']
    },
    {
      id: 'ngo',
      title: 'ONGs',
      icon: testIcon,
      link: '/configuracoes/ongs',
      allowed: ['master']
    },
    {
      id: 'user',
      title: 'Usuários',
      icon: testIcon,
      link: '/configuracoes/usuarios',
      allowed: ['master']
    },
    {
      id: 'help',
      title: 'Ajuda',
      icon: testIcon,
      link: '/perguntas-frequentes',
      allowed: ['master', 'staff', 'funcionario']
    }
  ]

  return (
    <main>
      <div className="container my-5 nao-unico-elemento">
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