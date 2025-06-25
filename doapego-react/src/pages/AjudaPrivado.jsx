// src/pages/AjudaPrivado.jsx
import { faqPrivado } from "../constants/questionsFaq";

export default function AjudaPrivado() {
  return (
    <main>
      <h1 className="titulo-pagina mt-5">FAQ & AJUDA</h1>

      <div className="container my-5 nao-unico-elemento">
        <div className="accordion" id="accordionFaq">

          {faqPrivado.map((qa) => (
            <div key={qa.id} className="accordion-item">
              <h2 className="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={qa.dataTarget} aria-expanded="false">
                  {qa.pergunta}
                </button>
              </h2>

              <div id={qa.idTarget} class="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                <div class="accordion-body">
                  <p>{qa.resposta}</p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      <section className="still-questions mb-5">
        <p>Ainda tem dúvidas? Entre em contato conosco:</p>
        <p>Email: doapegoitb@gmail.com</p>
        <p>Telefone: (11) 92078-7810</p>
        <p>(Funcionamento: segunda à sexta, 08h às 18h)</p>
      </section>
    </main>
  );
}