// src/helpers/masks.js

export const formatarTelefone = (valor) => {
  if (!valor) return '';
  const numeros = valor.replace(/\D/g, '').slice(0, 11);

  if (numeros.length === 11) {
    return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
};

export const formatarCEP = (valor) => {
  if (!valor) return '';
  const numeros = valor.replace(/\D/g, '').slice(0, 8);
  return numeros.replace(/(\d{5})(\d{0,3})/, '$1-$2');
};

export const removerMascara = (valor) => {
  return (valor || '')
    .replace(/\D/g, '');
};