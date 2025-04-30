// src/helpers/cepService.js
import axios from "axios";
import { formatarCEP, removerMascara } from './masks';

export const buscarCEP = async (cep) => {
  try {
    const cepNumerico = removerMascara(cep);
    const response = await axios.get(`https://viacep.com.br/ws/${cepNumerico}/json/`);

    return {
      logradouro: response.data.logradouro,
      bairro: response.data.bairro,
      cidade: response.data.localidade,
      estado: response.data.uf,
      cep: formatarCEP(cepNumerico) // Retorna o CEP formatado
    };
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    return null;
  }
};