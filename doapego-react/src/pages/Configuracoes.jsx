// src/pages/Configuracoes.jsx

import { Link } from 'react-router-dom';

import rightChevronIcon from "../img/rightchevron-icon.svg"
import profileIcon from "../img/test-icon.svg"
import ngosIcon from "../img/ngos-icon.svg"
import helpIcon from "../img/confighelp-icon.svg"
import adminIcon from "../img/admin-icon.svg"
import addressIcon from "../img/address-icon.svg"
import userIcon from "../img/user-icon.svg"
import categoryIcon from "../img/category-icon.svg"

export default function Configuracoes() {

  // Pega os dados do localStorage
  const userType = localStorage.getItem('tipo') || '';
  const userOngId = localStorage.getItem('ongId') || '';

  const sections = [
    {
      id: 'profile',
      title: 'Meu perfil',
      icon: profileIcon,
      link: '/configuracoes/meu-perfil',
      allowed: ['MASTER', 'STAFF', 'FUNCIONARIO']
    },
    {
      id: 'my-ngo',
      title: 'Minha ONG',
      icon: ngosIcon,
      // link: `/ongs/ong-${userOngId}`,
      link: `/configuracoes/ongs/detalhes/${userOngId}`,
      allowed: ['STAFF', 'FUNCIONARIO']
    },
    {
      id: 'adm',
      title: 'Administradores',
      icon: adminIcon,
      link: '/configuracoes/administradores',
      allowed: ['MASTER', 'STAFF']
    },
    {
      id: 'ngo',
      title: 'ONGs',
      icon: ngosIcon,
      link: '/configuracoes/ongs',
      allowed: ['MASTER']
    },
    {
      id: 'address',
      title: 'Endereços',
      icon: addressIcon,
      link: '/configuracoes/enderecos-ong',
      allowed: ['MASTER', 'STAFF', 'FUNCIONARIO']
    },
    {
      id: 'category',
      title: 'Categorias',
      icon: categoryIcon,
      link: '/configuracoes/categorias-doacao',
      allowed: ['MASTER', 'STAFF', 'FUNCIONARIO']
    },
    {
      id: 'user',
      title: 'Usuários',
      icon: userIcon,
      link: '/configuracoes/usuarios',
      allowed: ['MASTER']
    },
    {
      id: 'help',
      title: 'Ajuda',
      icon: helpIcon,
      link: '/perguntas-frequentes',
      allowed: ['MASTER', 'STAFF', 'FUNCIONARIO']
    }
  ]

  return (
    <main>
      <div className="container my-5 nao-unico-elemento">
        <h2 className="titulo-pagina mb-5">CONFIGURAÇÕES</h2>

        {sections.filter(section => section.allowed.includes(userType)).map((section) => (
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