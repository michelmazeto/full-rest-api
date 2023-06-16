import axios from 'axios';
import { IUser } from '../models/User';

export function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]/g, '');

  if (cpf.length !== 11) {
    return false;
  }

  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  let remainder;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cpf.charAt(9))) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cpf.charAt(10))) {
    return false;
  }

  return true;
}

export function validateCEP(cep: string): boolean {
  cep = cep.replace(/[^\d]/g, '');

  if (cep.length !== 8) {
    return false;
  }
  if (/^(\d)\1+$/.test(cep)) {
    return false;
  }

  return true;
}

export async function viaCep(this: IUser) {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${this.cep}/json`);
    const { logradouro, bairro, localidade, uf } = response.data;
    this.logradouro = logradouro;
    this.bairro = bairro;
    this.cidade = localidade;
    this.uf = uf;
  } catch (error) {
    console.error(`Error getting CEP info from ViaCEP: ${error}`);
  }
}
