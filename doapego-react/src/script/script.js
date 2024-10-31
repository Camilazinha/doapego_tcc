import $ from 'jquery';

$(document).ready(function() {
  const faqs = document.querySelectorAll(".faq-faq");

faqs.forEach(faq => {
    faq.addEventListener("click", () => {
        // Fecha todas as FAQs abertas
        faqs.forEach(f => {
            if (f !== faq) {
                f.classList.remove("active");
            }
        });

        // Alterna a FAQ clicada
        faq.classList.toggle("active");
    });
});
});