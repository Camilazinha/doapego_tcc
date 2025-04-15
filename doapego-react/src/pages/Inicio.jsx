// src/pages/Inicio.js
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import pendenteIcon from "../img/pendente-icon.svg";
import recusadaIcon from "../img/recusada-icon.svg";
import coletadaIcon from "../img/coletada-icon.svg";
import goToIcon from '../img/goto-icon.svg';

export default function Inicio() {
  //Hardcoded
  const tipoAdm = "master";
  const idOng = 1;

  const [doacoesStats, setDoacoesStats] = useState({
    PENDENTES: 0,
    COLETADAS: 0,
    RECUSADAS: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/doacoes")
      .then(response => {
        const data = response.data;

        const doacoesFiltradas =
          tipoAdm === "master"
            ? data
            : data.filter(doacao => doacao.ongId === idOng);

        const PENDENTES = doacoesFiltradas.filter(doacao => doacao.status === "PENDENTE").length;
        const COLETADAS = doacoesFiltradas.filter(doacao => doacao.status === "COLETADA").length;
        const RECUSADAS = doacoesFiltradas.filter(doacao => doacao.status === "RECUSADA").length;

        setDoacoesStats({ PENDENTES, COLETADAS, RECUSADAS });
      })
      .catch(error => {
        console.error("Erro ao buscar doações:", error);
      });
  }, [tipoAdm, idOng]);

  return (
    <main>
      <div className='container my-5 nao-unico-elemento'>
        <div className='grid-home'>
          <section className='name-container mb-1'>
            <span className='titulo-name'>Olá, Camila!</span>
            <Link className='link-name' to="/perfil">
              <img src={goToIcon} alt='Perfil' /> Ir para meu perfil
            </Link>
          </section>

          {/* Seção de Estatísticas (Lista de Doações) */}
          <section className="estatisticas-container me-1">
            <div className="borda-teste p-4">
              <h3 className="fw-bold">Lista de doações</h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <img src={coletadaIcon} alt="" className='me-2' />
                  Aceitas: <strong>{doacoesStats.COLETADAS}</strong>
                </li>
                <li className="list-group-item">
                  <img src={pendenteIcon} alt="" className='me-2' />
                  Pendentes: <strong>{doacoesStats.PENDENTES}</strong>
                </li>
                <li className="list-group-item">
                  <img src={recusadaIcon} alt="" className='me-2' />
                  Recusadas: <strong>{doacoesStats.RECUSADAS}</strong>
                </li>
              </ul>
            </div>
          </section>

          {/* Seção de Relatório de Erros */}
          <section className="report-container">
            <div className="borda-teste ms-1 p-4">
              <h3 className="fw-bold">Encontrou um erro?</h3>
              <p>Reporte para nós! Estamos disponíveis das <strong>08h às 18h</strong>.</p>
              <p className="mb-0">📧 <strong>@doapegoitb.com</strong></p>
            </div>
          </section>

          <section className='ms-2 calendar-container'>
            <Calendar calendarType='gregory' />
          </section>
        </div>
      </div>
    </main>
  );
}
