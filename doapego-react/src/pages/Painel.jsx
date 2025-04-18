import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import gotoIcon from "../img/goto-icon.svg";

export default function Painel() {
  // Pega os dados do localStorage
  const [userType] = useState(localStorage.getItem('tipo') || '');
  const userOngId = localStorage.getItem('ongId');
  const [ongData, setOngData] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (userOngId) {
      fetch(`http://localhost:8080/ongs/${userOngId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro ao buscar dados da ONG');
          }
          return response.json();
        })
        .then((data) => {
          setOngData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro:', error);
          setLoading(false);
        });
    }
  }, [userOngId]);


  const sections = [
    {
      id: 'manage-donation',
      title: 'Gerenciar Doações',
      description: 'Aprove ou recuse doações enviadas pelos doadores da plataforma.',
      src: 'https://placehold.co/600x400?text?font=poppins&text=Sem+foto',
      link: '/gerenciar-doacoes',
      allowed: ['STAFF', 'FUNCIONARIO']
    },
    {
      id: 'manage-request',
      title: 'Gerenciar Solicitações',
      description: 'Aprove ou recuse solicitações de novas ONGs que desejam ingressar na plataforma.',
      src: 'https://placehold.co/600x400?text?font=poppins&text=Sem+foto',
      link: '/gerenciar-solicitacoes',
      allowed: ['MASTER']
    },
    ...((userType === 'STAFF' || userType === 'FUNCIONARIO') ? [
      {
        id: 'my-ong',
        title: ongData ? ongData.nome : 'Minha ONG',
        description: 'Visualize ou edite os detalhes da ONG que você administra ou trabalha.',
        src: ongData && ongData.foto ? ongData.foto : 'https://placehold.co/600x400?text?font=poppins&text=Sem+foto',
        link: `/configuracoes/ongs/detalhes/${userOngId}`,
        allowed: ['STAFF', 'FUNCIONARIO']
      }
    ] : []),
    {
      id: 'create-staff',
      title: 'Adicionar Staff',
      description: 'Crie a conta de acesso para o representante da ONG, permitindo que ele gerencie as doações.',
      src: 'https://placehold.co/600x400?text?font=poppins&text=Sem+foto',
      link: '/configuracoes/administradores/adicionar',
      allowed: ['MASTER']
    },
    {
      id: 'check-photo',
      title: 'Revisar doações',
      description: 'Revise as doações antes de enviá-las para as ONGs, garantindo que o conteúdo esteja adequado.',
      src: 'https://placehold.co/600x400?text?font=poppins&text=Sem+foto',
      link: '/checar-midia',
      allowed: ['MASTER']
    }
  ];

  if (loading) {
    return <p>Carregando...</p>;
  }

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