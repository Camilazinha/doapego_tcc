// src/pages/Inicio.js
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import pendenteIcon from "../img/pendente-icon.svg";
import recusadaIcon from "../img/recusada-icon.svg";
import coletadaIcon from "../img/coletada-icon.svg";
import testIcon from '../img/goto-icon.svg';

export default function Inicio() {
  // Variáveis para simular o tipo de administrador e o id da ONG
  // Mude "tipoAdm" para "master" para ver todas as doações
  const tipoAdm = "staff"; // ou "master"
  const idOng = 1; // Id da ONG para admins que não são master

  const [doacoesStats, setDoacoesStats] = useState({
    PENDENTES: 0,
    COLETADAS: 0,
    RECUSADAS: 0,
  });

  useEffect(() => {
    // Dados simulados de doações, com campo 'status' e 'ongId'
    const simulatedDoacoes = [
      { id: 1, ongId: 1, status: "PENDENTE" },
      { id: 2, ongId: 2, status: "COLETADA" },
      { id: 3, ongId: 1, status: "PENDENTE" },
      { id: 4, ongId: 3, status: "RECUSADA" },
      { id: 5, ongId: 1, status: "COLETADA" },
      { id: 6, ongId: 1, status: "COLETADA" },
      { id: 7, ongId: 2, status: "RECUSADA" },
      { id: 8, ongId: 1, status: "PENDENTE" },
      { id: 9, ongId: 3, status: "COLETADA" },
      { id: 10, ongId: 1, status: "RECUSADA" },
      { id: 11, ongId: 1, status: "COLETADA" },
      { id: 12, ongId: 2, status: "COLETADA" },
      { id: 13, ongId: 1, status: "PENDENTE" }
    ];

    // Se for master, utilizar todas as doações; caso contrário, filtrar por idOng
    const doacoesFiltradas =
      tipoAdm === "master"
        ? simulatedDoacoes
        : simulatedDoacoes.filter(doacao => doacao.ongId === idOng);

    // Contar os diferentes status
    const PENDENTES = doacoesFiltradas.filter(doacao => doacao.status === "PENDENTE").length;
    const COLETADAS = doacoesFiltradas.filter(doacao => doacao.status === "COLETADA").length;
    const RECUSADAS = doacoesFiltradas.filter(doacao => doacao.status === "RECUSADA").length;

    // Atualizar o estado com as estatísticas
    setDoacoesStats({
      PENDENTES,
      COLETADAS,
      RECUSADAS
    });
  }, [tipoAdm, idOng]);

  return (
    <main>
      <div className='container my-5 nao-unico-elemento'>
        <div className='grid-home'>
          <section className='name-container'>
            <span className='titulo-name'>Olá, Camila!</span>
            <Link className='link-name' to="/perfil">
              <img src={testIcon} alt='Perfil' /> Ir para meu perfil
            </Link>
          </section>

          {/* Seção de Estatísticas (Novo Nome: Resumo das Doações) */}
          <section className="estatisticas-container">
            <div className="shadow-sm p-4">
              <h3 className="fw-bold">Lista de doações</h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><img src={coletadaIcon} alt="" className='me-2' />Aceitas: <strong>{doacoesStats.COLETADAS}</strong></li>
                <li className="list-group-item"><img src={pendenteIcon} alt="" className='me-2' />Pendentes: <strong>{doacoesStats.PENDENTES}</strong></li>
                <li className="list-group-item"><img src={recusadaIcon} alt="" className='me-2' />Recusadas: <strong>{doacoesStats.RECUSADAS}</strong></li>
              </ul>
            </div>
          </section>

          {/* Seção de Relatório de Erros */}
          <section className="report-container">
            <div className="shadow-sm p-4">
              <h3 className="fw-bold">Encontrou um erro?</h3>
              <p>Reporte para nós! Estamos disponíveis das <strong>08h às 18h</strong>.</p>
              <p className="mb-0">📧 <strong>@doapegoitb.com</strong></p>
            </div>
          </section>

          <section className='calendar-container'>
            <Calendar calendarType='gregory' />
          </section>
        </div>
      </div>
    </main>
  );
}
