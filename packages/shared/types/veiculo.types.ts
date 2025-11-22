import { StatusVeiculo } from '../constants/enums';

export interface Veiculo {
  id: number;
  clienteId: number;

  // Informações do Veículo
  marca: string;
  modelo: string;
  ano: number;
  anoModelo?: number;
  placa: string;
  cor?: string;
  chassi?: string;
  renavam?: string;

  // Dados Técnicos
  motor?: string;
  combustivel?: string;
  cambio?: string;

  // Quilometragem
  kmAtual?: number;
  kmUltimaRevisao?: number;

  // Status
  status: StatusVeiculo;

  // Observações
  observacoes?: string;

  createdAt: string;
  updatedAt: string;

  // Relações
  cliente?: any;
  revisoes?: any[];
  recomendacoes?: any[];
}

export interface CreateVeiculoData {
  clienteId: number;
  marca: string;
  modelo: string;
  ano: number;
  anoModelo?: number;
  placa: string;
  cor?: string;
  chassi?: string;
  renavam?: string;
  motor?: string;
  combustivel?: string;
  cambio?: string;
  kmAtual?: number;
  observacoes?: string;
}

export interface UpdateVeiculoData extends Partial<Omit<CreateVeiculoData, 'clienteId'>> {
  status?: StatusVeiculo;
}
