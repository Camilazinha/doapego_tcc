// src/helpers/cepService.js
import axios from 'axios';
import { formatarCEP, removerMascara } from './masks';

export const buscarCEP = async (cep) => {
  try {
    const cepNumerico = removerMascara(cep);
    const response = await axios.get(`https://viacep.com.br/ws/${cepNumerico}/json/`);

    // Verifica se a API retornou erro
    if (response.data.erro) {
      return {
        erro: true,
        logradouro: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: formatarCEP(cepNumerico)
      };
    }

    return {
      logradouro: response.data.logradouro,
      bairro: response.data.bairro,
      cidade: response.data.localidade,
      estado: response.data.uf,
      cep: formatarCEP(cepNumerico)
    };
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    return {
      erro: true,
      logradouro: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: formatarCEP(cep)
    };
  }
};