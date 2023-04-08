import axios from 'axios';
import { IUser } from '../models/User';

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
