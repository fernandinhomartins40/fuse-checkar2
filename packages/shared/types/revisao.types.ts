import { StatusRevisao, TipoRevisao } from '../constants/enums';

export interface Revisao {
  id: number;

  // Relações
  clienteId: number;
  veiculoId: number;
  mecanicoId?: number;

  // Informações da Revisão
  tipo: TipoRevisao;
  status: StatusRevisao;

  // Datas
  dataAgendamento: string;
  dataRevisao: string;
  dataInicio?: string;
  dataConclusao?: string;

  // Quilometragem
  kmAtual?: number;
  kmProxima?: number;

  // Checklist (JSON com itens verificados)
  checklist?: any;

  // Serviços Realizados
  servicosRealizados?: any;

  // Peças Substituídas
  pecasSubstituidas?: any;

  // Valores
  valorServico?: number;
  valorPecas?: number;
  valorTotal?: number;

  // Observações
  observacoes?: string;
  diagnostico?: string;

  // Garantia
  garantiaDias?: number;
  garantiaKm?: number;

  createdAt: string;
  updatedAt: string;

  // Relações
  cliente?: any;
  veiculo?: any;
  mecanico?: any;
}

export interface CreateRevisaoData {
  clienteId: number;
  veiculoId: number;
  mecanicoId?: number;
  tipo: TipoRevisao;
  dataAgendamento: string;
  dataRevisao: string;
  kmAtual?: number;
  observacoes?: string;
}

export interface UpdateRevisaoData extends Partial<CreateRevisaoData> {
  status?: StatusRevisao;
  dataInicio?: string;
  dataConclusao?: string;
  kmProxima?: number;
  checklist?: any;
  servicosRealizados?: any;
  pecasSubstituidas?: any;
  valorServico?: number;
  valorPecas?: number;
  valorTotal?: number;
  diagnostico?: string;
  garantiaDias?: number;
  garantiaKm?: number;
}
