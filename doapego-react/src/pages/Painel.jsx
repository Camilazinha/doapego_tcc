// src/pages/Painel.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';

import crianca from "../img/crianca-mao-logo.png"
import gotoIcon from "../img/goto-icon.svg"

export default function Painel() {

  const [minhaOng] = useState(null);
  const [userType] = useState('master');
  const userOngId = 48;

  const sections = [
    {
      id: 'manage-donation',
      title: 'Gerenciar Doações',
      description: 'Aprove ou recuse doações enviadas pelos doadores da plataforma.',
      src: crianca,
      link: '/gerenciar-doacoes',
      allowed: ['staff', 'funcionario']
    },
    {
      id: 'manage-request',
      title: 'Gerenciar Solicitações',
      description: 'Aprove ou recuse solicitações de novas ONGs que desejam ingressar na plataforma.',
      src: crianca,
      link: '/gerenciar-solicitacoes',
      allowed: ['master']
    },
    ...(userType === 'staff' || userType === 'funcionario' ? [
      {
        id: 'my-ong',
        title: minhaOng ? minhaOng.nome : 'Minha ONG',
        description: 'Visualize os detalhes da ONG que você administra ou trabalha.',
        src: minhaOng ? minhaOng.foto : crianca,
        link: `/configuracao/ongs/${userOngId}`,
        allowed: ['staff', 'funcionario']
      }
    ] : []), // Se não for STAFF/FUNCIONÁRIO, essa seção não aparece
    {
      id: 'create-admin',
      title: 'Criar Administrador',
      description: 'Crie novas ONGs e atribua administradores para gerenciá-las.',
      src: crianca,
      link: '/configuracoes/administradores/adicionar',
      allowed: ['master']
    },
    {
      id: 'check-photo',
      title: 'Checar Mídia',
      description: 'Revise as fotos enviadas pelos doadores antes que sejam exibidas para as ONGs.',
      src: crianca,
      link: '/checar-midia',
      allowed: ['master']
    }
  ];


  return (
    <main>
      <div className='container-fluid my-5 px-5'>
        <h2 className='titulo-pagina'>PAINEL DE CONTROLE</h2>

        <div className='card-one mt-5 mx-3'>

          {sections.filter(section => section.allowed.includes('master')).map((section) => (

            <div key={section.id} className='card'>
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