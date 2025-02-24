import React from 'react';
import { Link } from 'react-router-dom';

import documentIcon from '../img/document-icon.svg';
import giftIcon from '../img/gift-icon.svg';
import faqIcon from '../img/faq-icon.svg';
import mailIcon from "../img/mail-icon.svg";
import locationIcon from "../img/location-icon.svg";
import phoneIcon from "../img/phone-icon.svg";

//    <footer className="container-fluid text-center pt-3 mt-5">
export default function Footer() {
  return (
    <footer className="container-fluid text-center pt-3">
      <div className="container text-md-start mt-5">
        <div className="row mt-3">
          <div className="col-md-3 mx-auto mb-4">
            <h6 className="mb-4">DOAPEGO</h6>
            <p>
              Conectamos doadores a ONGs parceiras para levar alegria e esperança a crianças carentes. Com sua doação, pequenos gestos se transformam em grandes sorrisos!
            </p>
          </div>

          <div className="col-md-3 mx-auto mb-4">
            <h6 className="mb-4">UTILIDADE</h6>
            <p><Link to="/politica-de-privacidade" className='link-info-footer'><img src={documentIcon} alt='' />Política de privacidade</Link></p>
            <p><Link to="/termos-de-uso" className='link-info-footer'><img src={documentIcon} alt='' />Termos de uso</Link></p>
            <p><Link to="/tutorial" className='link-info-footer'><img src={giftIcon} alt='' />Como doar</Link></p>
            <p><Link to="/ajuda" className='link-info-footer'><img src={faqIcon} alt='' />Ajuda</Link></p>
          </div>

          <div className="col-md-4 mx-auto mb-md-0 mb-4">
            <h6 className="mb-4">CONTATO</h6>
            <p><img src={locationIcon} alt='' />Av. Grupo Bandeirantes 138, 06420-150</p>
            <p><img src={mailIcon} alt='' /> doapegoitb@gmail.com</p>
            <p><img src={phoneIcon} alt='' />+55 (11) 92078-7810</p>
            <p><img src={phoneIcon} alt='' />+55 (11) 91234-5678</p>
          </div>
        </div>
      </div>

      <div className="p-4"> © 2025 Doapego - Todos os direitos reservados
      </div>
    </footer>
  );
}