// helpers/masks.js
export const formatarTelefone = (telefone) => {
  if (!telefone) return '';

  // Remove tudo que não é dígito
  const numeros = telefone.replace(/\D/g, '');

  // Formatação para números com DDD (11) 99999-9999
  if (numeros.length === 11) {
    return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  // Formatação padrão para 10 dígitos (11) 9999-9999
  return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
};

export const formatarCEP = (cep) => {
  if (!cep) return '';

  // Remove tudo que não é dígito
  const numeros = cep.replace(/\D/g, '');

  // Formata 12345-678
  return numeros.replace(/(\d{5})(\d{3})/, '$1-$2');
};