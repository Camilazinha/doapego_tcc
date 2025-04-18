import { useState } from 'react';
import { Link } from 'react-router-dom';

import crianca from "../img/crianca-mao-logo.png";
import gotoIcon from "../img/goto-icon.svg";

export default function Painel() {
  // Pega os dados do localStorage
  const [userType] = useState(localStorage.getItem('tipo') || '');
  const userOngId = localStorage.getItem('ongId');

  const [minhaOng] = useState(null); // Mantive seu estado original

  const sections = [
    {
      id: 'manage-donation',
      title: 'Gerenciar Doações',
      description: 'Aprove ou recuse doações enviadas pelos doadores da plataforma.',
      src: crianca,
      link: '/gerenciar-doacoes',
      allowed: ['STAFF', 'FUNCIONARIO']
    },
    {
      id: 'manage-request',
      title: 'Gerenciar Solicitações',
      description: 'Aprove ou recuse solicitações de novas ONGs que desejam ingressar na plataforma.',
      src: crianca,
      link: '/gerenciar-solicitacoes',
      allowed: ['MASTER']
    },
    ...((userType === 'STAFF' || userType === 'FUNCIONARIO') ? [
      {
        id: 'my-ong',
        title: minhaOng ? minhaOng.nome : 'Minha ONG',
        description: 'Visualize ou edite os detalhes da ONG que você administra ou trabalha.',
        src: minhaOng ? minhaOng.foto : crianca,
        link: `/configuracao/ongs/${userOngId}`,
        allowed: ['STAFF', 'FUNCIONARIO']
      }
    ] : []),
    {
      id: 'create-staff',
      title: 'Adicionar Staff',
      description: 'Crie a conta de acesso para o representante da ONG, permitindo que ele gerencie as doações.',
      src: crianca,
      link: '/configuracoes/administradores/adicionar',
      allowed: ['MASTER']
    },
    {
      id: 'check-photo',
      title: 'Revisar doações',
      description: 'Revise as doações antes de enviá-las para as ONGs, garantindo que o conteúdo esteja adequado.',
      src: crianca,
      link: '/checar-midia',
      allowed: ['MASTER']
    }
  ];

  return (
    <main>
      <div className='container-fluid my-5 px-5'>
        <h2 className='titulo-pagina'>PAINEL DE CONTROLE</h2>

        <div className='card-one mt-5 mx-3'>
          {sections
            .filter(section => section.allowed.includes(userType)) // Filtra pelas permissões
            .map((section) => (
              <div key={section.id} className='card'>
                <img src={section.src} alt='' className="card-img-top" />

                <div className='card-body'>
                  <h4 className='card-title mb-4'>{section.title}</h4>
                  <p className='card-text'>{section.description}</p>
                </div>

                <div className='card-body'>
                  <Link to={section.link} className="btn btn-custom-filled">
                    Acessar <img src={gotoIcon} alt='' />
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}