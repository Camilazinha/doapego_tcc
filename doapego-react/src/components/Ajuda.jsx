import React from 'react';
import '../styles/main.css';
import '../styles/layout.css';
import '../script/script.js';

export default function Ajuda() {
  return (
    <>
    <section id="faq-section" className="container px-4 py-5 px-md-5 mt-5 borda">
      <h2 className="faq-titulo-principal title mb-4">FAQ & Ajuda</h2>

    <div className='testando-grid'>
      <div className="faq-faq">
        <div className="faq-questao">
          <h3>Há algum custo para usar a plataforma?</h3>
          <svg width="15" height="10" viewBox="0 0 42 25">
            <path d="M3 3L21 21L39 3" fill="transparent" stroke="#FB6B9B" strokeWidth="7" strokeLinecap="round" />
          </svg>
        </div>
        <div className="faq-resposta">
          <p>Não, a plataforma é totalmente gratuita para todos os usuários.
          </p>
        </div>
      </div>

      <div className="faq-faq">
        <div className="faq-questao">
          <h3>É possível cancelar ou editar uma doação após a solicitação?</h3>
          <svg width="15" height="10" viewBox="0 0 42 25">
            <path d="M3 3L21 21L39 3" fill="transparent" stroke="#FB6B9B" strokeWidth="7" strokeLinecap="round" />
          </svg>
        </div>
        <div className="faq-resposta">
          <p>Sim, o doador pode cancelar a doação caso a ONG ainda não tenha concluído a revisão. No entanto, se a ONG já revisou a doação, será necessário entrar em contato diretamente com ela para resolver a situação. No momento, a edição de doações ainda não está disponível em nosso aplicativo. Estamos trabalhando para implementar essa função em breve; até lá, será necessário cancelar a doação e reinserir as informações corretas, se houver necessidade de ajuste.</p>
        </div>
      </div>

      <div className="faq-faq">
        <div className="faq-questao">
          <h3>Preciso de uma conta para doar, ou posso doar como visitante?</h3>
          <svg width="15" height="10" viewBox="0 0 42 25">
            <path d="M3 3L21 21L39 3" fill="transparent" stroke="#FB6B9B" strokeWidth="7" strokeLinecap="round" />
          </svg>
        </div>
        <div className="faq-resposta">
          <p>Para realizar uma doação, é necessário ter uma conta com os dados cadastrais completos. Essa medida é importante para garantirmos a segurança da doação e evitarmos possíveis fraudes.</p>
        </div>
      </div>

      <div className="faq-faq">
        <div className="faq-questao">
          <h3>Preciso embalar o brinquedo antes de doar?</h3>
          <svg width="15" height="10" viewBox="0 0 42 25">
            <path d="M3 3L21 21L39 3" fill="transparent" stroke="#FB6B9B" strokeWidth="7" strokeLinecap="round" />
          </svg>
        </div>
        <div className="faq-resposta">
          <p>Embora não seja obrigatório, recomendamos embalar o brinquedo, especialmente se ele for frágil, para garantir que chegue em boas condições às crianças.</p>
        </div>
      </div>

      <div className="faq-faq">
        <div className="faq-questao">
          <h3>Posso doar brinquedos de grande porte?</h3>
          <svg width="15" height="10" viewBox="0 0 42 25">
            <path d="M3 3L21 21L39 3" fill="transparent" stroke="#FB6B9B" strokeWidth="7" strokeLinecap="round" />
          </svg>
        </div>
        <div className="faq-resposta">
          <p>Sim, é possível doar brinquedos como bicicletas, patinetes e patins. Contudo, esses itens precisam estar em boas condições e com todas as peças. Doações de brinquedos incompletos ou danificados podem representar risco às crianças.</p>
        </div>
      </div>

      <div className="faq-faq">
        <div className="faq-questao">
          <h3>O que acontece se a ONG rejeitar minha doação?</h3>
          <svg width="15" height="10" viewBox="0 0 42 25">
            <path d="M3 3L21 21L39 3" fill="transparent" stroke="#FB6B9B" strokeWidth="7" strokeLinecap="round" />
          </svg>
        </div>
        <div className="faq-resposta">
          <p>Caso a ONG rejeite a sua doação, recomendamos verificar o motivo informado. Essa análise ajuda a garantir que futuras doações estejam adequadas e atendam aos requisitos da instituição.</p>
        </div>
      </div>

      <div className="faq-faq">
        <div className="faq-questao">
          <h3>Há algum programa de recompensas para doadores frequentes?</h3>
          <svg width="15" height="10" viewBox="0 0 42 25">
            <path d="M3 3L21 21L39 3" fill="transparent" stroke="#FB6B9B" strokeWidth="7" strokeLinecap="round" />
          </svg>
        </div>
        <div className="faq-resposta">
          <p>Ainda não temos um programa de recompensas, mas estamos avaliando essa possibilidade e pretendemos implementá-lo em breve.</p>
        </div>
      </div>
      </div>
      </section>

      <p id="duvida-faq">Ainda tem dúvidas? Entre em contato conosco:
        <br />Email: doapegoitb@gmail.com
        <br />Telefone: (11) 92078-7810
        <br />(Funcionamento: Segunda a Sexta, 08h às 18h)
      </p>
      </>
  );
}