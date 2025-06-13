import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import gotoIcon from "../img/goto-icon.svg";

import no4Photo from "../img-teste/no4.png";
import no2Photo from "../img-teste/no2.png";
import half1Photo from "../img-teste/half1.png";

export default function Painel() {

  const userType = localStorage.getItem('tipo') || '';
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
      src: no2Photo,
      link: '/gerenciar-solicitacoes',
      allowed: ['MASTER']
    },
    ...((userType === 'STAFF' || userType === 'FUNCIONARIO') ? [
      {
        id: 'my-ong',
        title: ongData ? ongData.nome : 'Minha ONG',
        description: 'Visualize ou edite os detalhes da ONG que você administra ou trabalha.',
        src: ongData && ongData.fotoPerfil ? ongData.fotoPerfil : 'https://placehold.co/600x400?text?font=poppins&text=Sem+foto',
        link: `/configuracoes/ongs/detalhes/${userOngId}`,
        allowed: ['STAFF', 'FUNCIONARIO']
      }
    ] : []),
    {
      id: 'create-staff',
      title: 'Adicionar Staff',
      description: 'Crie a conta de acesso para o representante da ONG, permitindo que ele gerencie as doações.',
      src: no4Photo,
      link: '/configuracoes/administradores/adicionar',
      allowed: ['MASTER']
    },
    {
      id: 'check-donation',
      title: 'Revisar doações',
      description: 'Revise as doações antes de enviá-las para as ONGs, garantindo que o conteúdo esteja adequado.',
      src: half1Photo,
      link: '/gerenciar-doacoes',
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
            .filter(section => section.allowed.includes(userType))
            .map((section) => (
              <div key={section.id} className='card'>
                <img src={section.src}
                  alt='' className="card-img-top px-3" style={{
                    width: "100%", maxHeight: "200px", objectFit: "cover"
                  }}
                />

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