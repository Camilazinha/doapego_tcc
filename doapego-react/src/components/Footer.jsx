// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import iconeDocumento from '../img/icone-documento.svg';
import iconePresente from '../img/icone-presente.svg';
import iconeFaqVerde from '../img/icone-faqverde.svg';
import iconeEmail from '../img/icone-email.svg';
import iconeLocal from '../img/icone-local.svg';
import iconeTelefone from '../img/icone-telefone.svg';

export default function Footer() {
  return (
    <footer className='container-fluid text-center pt-3'>
      <div className='container text-md-start mt-5'>

        <div className='row mt-3'>

          <div className='col-md-3 mx-auto mb-4'>
            <h6 className='mb-4'>DOAPEGO</h6>
            <p>Conectamos doadores a ONGs parceiras para levar alegria e esperança a crianças carentes. Com sua doação, pequenos gestos se transformam em grandes sorrisos!</p>
          </div>

          <div className='col-md-3 mx-auto mb-4'>
            <h6 className='mb-4'>UTILIDADE</h6>
            <p><Link to='/politica-de-privacidade' className='link-info-footer'><img src={iconeDocumento} alt='' />Política de privacidade</Link></p>
            <p><Link to='/termos-de-uso' className='link-info-footer'><img src={iconeDocumento} alt='' />Termos de uso</Link></p>
            <p><Link to='/como-doar' className='link-info-footer'><img src={iconePresente} alt='' />Como doar</Link></p>
            <p><Link to='/ajuda' className='link-info-footer'><img src={iconeFaqVerde} alt='' />Ajuda</Link></p>
          </div>

          <div className='col-md-4 mx-auto mb-md-0 mb-4'>
            <h6 className='mb-4'>CONTATO</h6>
            <p><a href='https://g.co/kgs/Qcfd6Zx' className='link-info-footer'><img src={iconeLocal} alt='' />Av. Grupo Bandeirantes 138, 06420-150</a></p>
            <p><a href='mailto:doapegoitb@gmail.com' className='link-info-footer'><img src={iconeEmail} alt='' /> doapegoitb@gmail.com</a></p>
            <p><img src={iconeTelefone} alt='' />+55 (11) 92078-7810</p>
            <p><img src={iconeTelefone} alt='' />+55 (11) 91234-5678</p>
          </div>

        </div>
      </div>

      <p className='p-4 mb-0'>© 2025 Doapego - Todos os direitos reservados</p>
    </footer>
  );
}