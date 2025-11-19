/**
 * Service de CEP (ViaCEP)
 */

import env from '@config/env';
import { BadRequestError } from '@utils/errors';

interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export interface EnderecoData {
  cep: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
}

class CEPService {
  /**
   * Busca endereço pelo CEP usando API ViaCEP
   */
  async buscarEndereco(cep: string): Promise<EnderecoData> {
    const cepLimpo = cep.replace(/[^\d]/g, '');

    if (cepLimpo.length !== 8) {
      throw new BadRequestError('CEP inválido');
    }

    try {
      const response = await fetch(`${env.VIACEP_API_URL}/${cepLimpo}/json/`);

      if (!response.ok) {
        throw new BadRequestError('Erro ao buscar CEP');
      }

      const data: ViaCEPResponse = await response.json();

      if (data.erro) {
        throw new BadRequestError('CEP não encontrado');
      }

      return {
        cep: data.cep,
        endereco: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf,
      };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw error;
      }
      throw new BadRequestError('Erro ao buscar CEP');
    }
  }
}

export default new CEPService();
