
export interface PreDiagnosisQuestion {
  id: string;
  pergunta: string;
  tipo: 'sim_nao' | 'texto' | 'multipla_escolha';
  opcoes?: string[];
  resposta?: string | boolean;
  obrigatoria: boolean;
}

export interface ItemChecklist {
  id: string;
  nome: string;
  categoria: string;
  obrigatorio: boolean;
  status: 'ok' | 'nao_ok' | 'nao_aplicavel' | 'pendente';
  observacoes?: string;
  prioridade: 'baixa' | 'media' | 'alta' | 'critica';
  detalheProblema?: string;
  acaoRecomendada?: string;
  custoEstimado?: number;
}

export interface CategoriaChecklist {
  id: string;
  nome: string;
  descricao: string;
  preDiagnostico?: PreDiagnosisQuestion[];
  itens: ItemChecklist[];
}

export interface FinalizationData {
  observacoesGerais: string;
  problemasCriticos: string[];
  recomendacoesPrioritarias: string[];
  custoTotalEstimado: number;
  tempoEstimadoReparo: number;
  proximaRevisaoData: string;
  proximaRevisaoKm: number;
}

export interface Revisao {
  id: string;
  clienteId: string;
  veiculoId: string;
  tipoServico: string;
  data: string;
  quilometragem: number;
  status: 'agendado' | 'em_andamento' | 'concluido' | 'cancelado';
  tecnicos: string[];
  checklist: CategoriaChecklist[];
  observacoes?: string;
  recomendacoes: Recomendacao[];
  custoEstimado?: number;
  tempoEstimado?: number;
  proximaRevisao?: {
    data: string;
    quilometragem: number;
    tipo: string;
  };
  finalizacao?: FinalizationData;
}

export interface Recomendacao {
  id: string;
  item: string;
  descricao: string;
  prioridade: 'baixa' | 'media' | 'alta' | 'critica';
  custoEstimado?: number;
  prazoRecomendado?: string;
  status: 'pendente' | 'aprovado' | 'rejeitado' | 'concluido';
}

export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
}

export interface Veiculo {
  id: string;
  clienteId: string;
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
  chassi: string;
  cor: string;
  quilometragem: number;
}
