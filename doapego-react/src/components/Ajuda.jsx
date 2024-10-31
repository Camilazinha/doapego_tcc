import React from 'react';
import '../styles/main.css';
import '../styles/layout.css';

function Ajuda() {
  return (
    <section id="faq-section">
      <h2 className="faq-titulo-principal">Ajuda</h2>

      <div className="faq-faq">
        <div className="faq-questao">
          <h3>Como gerencio as doações recebidas?</h3>
          <svg width="15" height="10" viewBox="0 0 42 25">
            <path d="M3 3L21 21L39 3" fill="transparent" stroke="#FB6B9B" strokeWidth="7" strokeLinecap="round" />
          </svg>
        </div>
        <div className="faq-resposta">
          <p>Na página principal quando o login é realizado, aparece um menu. Ao clicar na opção de 'Gerenciar Doações', você será redirecionado para lá.</p>
        </div>
      </div>

      <div className="faq-faq">
        <div className="faq-questao">
          <h3>Posso entrar em contato com os doadores?</h3>
          <svg width="15" height="10" viewBox="0 0 42 25">
            <path d="M3 3L21 21L39 3" fill="transparent" stroke="#FB6B9B" strokeWidth="7" strokeLinecap="round" />
          </svg>
        </div>
        <div className="faq-resposta">
          <p>Sim, após aceitar uma doação, você terá acesso aos detalhes de contato dos doadores para combinar a entrega ou retirada dos itens.</p>
        </div>
      </div>

      <div className="faq-faq">
        <div className="faq-questao">
          <h3>O que acontece se recuso uma doação?</h3>
          <svg width="15" height="10" viewBox="0 0 42 25">
            <path d="M3 3L21 21L39 3" fill="transparent" stroke="#FB6B9B" strokeWidth="7" strokeLinecap="round" />
          </svg>
        </div>
        <div className="faq-resposta">
          <p>O doador é notificado sobre a recusa. A ONG pode adicionar um motivo, caso seja necessário, para ajudar o doador a entender a decisão. Após isso, a doação recusada ficará disponível para visualização na seção 'Canceladas' do gerenciamento de doações.</p>
        </div>
      </div>

      <div className="faq-faq">
        <div className="faq-questao">
          <h3>Como faço para atualizar meu perfil e informações de contato?</h3>
          <svg width="15" height="10" viewBox="0 0 42 25">
            <path d="M3 3L21 21L39 3" fill="transparent" stroke="#FB6B9B" strokeWidth="7" strokeLinecap="round" />
          </svg>
        </div>
        <div className="faq-resposta">
          <p>Acesse a seção "Perfil da ONG" no painel (ou no menu da página inicial) e clique em "Editar Perfil". Lá você poderá atualizar seus dados de contato, endereço e outras informações importantes.</p>
        </div>
      </div>

      <div className="faq-faq">
        <div className="faq-questao">
          <h3>Como garantir que as doações cheguem com segurança?</h3>
          <svg width="15" height="10" viewBox="0 0 42 25">
            <path d="M3 3L21 21L39 3" fill="transparent" stroke="#FB6B9B" strokeWidth="7" strokeLinecap="round" />
          </svg>
        </div>
        <div className="faq-resposta">
          <p>Após aceitar uma doação, é importante combinar os detalhes de transporte com o doador. O ideal é definir pontos de coleta seguros ou combinar horários no espaço físico da ONG, para garantir a segurança do processo.</p>
        </div>
      </div>

      <div className="faq-faq">
        <div className="faq-questao">
          <h3>Como visualizar doações pendentes, aceitas e recusadas?</h3>
          <svg width="15" height="10" viewBox="0 0 42 25">
            <path d="M3 3L21 21L39 3" fill="transparent" stroke="#FB6B9B" strokeWidth="7" strokeLinecap="round" />
          </svg>
        </div>
        <div className="faq-resposta">
          <p>Na seção de gerenciamento, selecione o filtro desejado (pendentes, aceitas ou recusadas) para ver as doações de acordo com o status atual. Cada doação exibida inclui os detalhes e permite ações adicionais.</p>
        </div>
      </div>

      <div className="faq-faq">
        <div className="faq-questao">
          <h3>Posso solicitar mais informações ao doador antes de aceitar uma doação?</h3>
          <svg width="15" height="10" viewBox="0 0 42 25">
            <path d="M3 3L21 21L39 3" fill="transparent" stroke="#FB6B9B" strokeWidth="7" strokeLinecap="round" />
          </svg>
        </div>
        <div className="faq-resposta">
          <p>Sim! Você pode solicitar informações adicionais ao entrar em contato com o cliente. Para encontrá-lo, clique em ver detalhes da doação pendente.</p>
        </div>
      </div>

      <p id="duvida-faq">Ainda tem dúvidas? Entre em contato conosco:
        <br />Email: doapegoitb@gmail.com
        <br />Telefone: (00) 0000-0000
        <br />(Funcionamento: Segunda a Sexta, 08h-18h)
      </p>
    </section>
  );
}

export default Ajuda;
