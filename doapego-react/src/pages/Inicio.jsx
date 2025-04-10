// src/pages/Inicio.js
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';

import testIcon from '../img/goto-icon.svg';

export default function Inicio() {
  return (
    <main>
      <div className='container my-5 nao-unico-elemento'>

        <div className='grid-home'>
          <section className='name-container'>
            <span className='titulo-name'> Olá, Camila!</span>
            <Link className='link-name'> <img src={testIcon} alt='' /> Ir para meu perfil </Link>
          </section>

          <section className='activity-container'>
            <h2>Suas atividades</h2>
            <p>Quando houverem atividades recentes, elas aparecerão aqui.</p>
          </section>

          <section className='report-container'>
            <h2>Encontrou um erro?</h2>
            <p>Reporte-o para nós.</p>
            <p>Horário de funcionamento: 07h às 20h</p>
            <p>@doapegoitb.com</p>
          </section>

          <section className='calendar-container'>
            <Calendar calendarType='gregory' />
          </section>
        </div>
      </div>

    </main>
  );
}
