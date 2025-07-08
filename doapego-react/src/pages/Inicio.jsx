// src/pages/Inicio.js
import axios from 'axios';
import Calendar from 'react-calendar';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';

import pendenteIcon from "../img/pendente-icon.svg";
import recusadaIcon from "../img/recusada-icon.svg";
import coletadaIcon from "../img/coletada-icon.svg";
import goToIcon from '../img/goto-icon.svg';

export default function Inicio() {
  const userType = localStorage.getItem('tipo') || '';
  const userOngId = localStorage.getItem('ongId');
  const adminId = localStorage.getItem('id');
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    if (adminId) {
      axios.get(`http://localhost:8080/administradores/${adminId}`)
        .then(response => {
          setAdminName(response.data.nome);
        })
        .catch(error => {
          console.error("Erro ao buscar nome do administrador:", error);
        });
    }
  }, [adminId]);

  const [doacoesStats, setDoacoesStats] = useState({
    PENDENTES: 0,
    COLETADAS: 0,
    RECUSADAS: 0,
    ANALISE: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/doacoes")
      .then(response => {
        const data = response.data.items;

        const doacoesFiltradas =
          userType === "MASTER"
            ? data
            : data.filter(doacao => doacao.ongId === parseInt(userOngId));

        const PENDENTES = doacoesFiltradas.filter(doacao => doacao.status === "PENDENTE").length;
        const COLETADAS = doacoesFiltradas.filter(doacao => doacao.status === "COLETADA").length;
        const RECUSADAS = doacoesFiltradas.filter(doacao => doacao.status === "RECUSADA").length;
        const ANALISE = doacoesFiltradas.filter(doacao => doacao.status === "ANALISE").length;

        setDoacoesStats({ PENDENTES, COLETADAS, RECUSADAS, ANALISE });
      })
      .catch(error => {
        console.error("Erro ao buscar doações:", error);
      });
  }, [userType, userOngId]);

  return (
    <main>
      <div className='container my-5 nao-unico-elemento'>
        <div className='grid-home'>
          <section className='name-container mb-1'>
            <span className='titulo-name'>Olá, {adminName || 'visitante'}!</span>
            <Link className='link-name' to={`/configuracoes/administradores/detalhes/${adminId}`}>
              <img src={goToIcon} alt='Perfil' /> Ir para meu perfil
            </Link>
          </section>

          <section className="estatisticas-container me-1">
            <div className="borda-teste p-4">
              <h3 className="fw-bold">Lista de doações</h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <img src={coletadaIcon} alt="" className='me-2' />
                  Aceitas: <strong>{doacoesStats.COLETADAS}</strong>
                </li>

                {['FUNCIONARIO', 'STAFF'].includes(userType) && (
                  <li className="list-group-item">
                    <img src={pendenteIcon} alt="" className='me-2' />
                    Pendentes: <strong>{doacoesStats.PENDENTES}</strong>
                  </li>
                )}

                <li className="list-group-item">
                  <img src={recusadaIcon} alt="" className='me-2' />
                  Recusadas: <strong>{doacoesStats.RECUSADAS}</strong>
                </li>

                {userType === "MASTER" && (
                  <li className="list-group-item">
                    <img src={pendenteIcon} alt="" className='me-2' />
                    Pendentes: <strong>{doacoesStats.ANALISE}</strong>
                  </li>
                )}
              </ul>
            </div>
          </section>

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
    </main >
  );
}
