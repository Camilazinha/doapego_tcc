// src/pages/Inicio.js
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';

import testIcon from '../img/goto-icon.svg';

export default function Inicio() {
  return (
    <main className='container my-5'>

    <section className='name-container col-6'>
      <span className='titulo-name'> Olá, Camila!</span>
      <Link className='link-name'> <img src={testIcon}/> Ir para meu perfil </Link>
    </section>

    <section className='col-6'>
      <Calendar />
    </section>

    </main>
  );
}
