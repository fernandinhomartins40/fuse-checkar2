
import { useState, useEffect } from 'react';

export interface Relatorio {
  id: number;
  cliente: string;
  veiculo: string;
  periodo: string;
  tipo: 'revisoes' | 'financeiro' | 'desempenho';
  status: 'concluido' | 'pendente' | 'aprovado' | 'rejeitado';
  data: string;
  valor?: number;
}

export interface RelatorioFilter {
  dataInicio?: string;
  dataFim?: string;
  clienteId?: string;
  status?: string;
}

export interface RelatorioStats {
  totalRelatorios: number;
  relatoriosConcluidos: number;
  relatoriosPendentes: number;
  receitaTotal: number;
}

// Mock data for revisões
const mockRevisoes = [
  {
    id: 1,
    clienteId: '1',
    veiculoId: '1',
    data: '2024-01-15',
    tipoServico: 'Revisão Completa',
    status: 'concluido',
    custoEstimado: 850,
    tempoEstimado: 120
  },
  {
    id: 2,
    clienteId: '2',
    veiculoId: '2',
    data: '2024-01-20',
    tipoServico: 'Troca de Óleo',
    status: 'agendado',
    custoEstimado: 200,
    tempoEstimado: 45
  },
  {
    id: 3,
    clienteId: '3',
    veiculoId: '3',
    data: '2024-01-25',
    tipoServico: 'Revisão Preventiva',
    status: 'em_andamento',
    custoEstimado: 450,
    tempoEstimado: 90
  }
];

const mockClientes = [
  { id: '1', nome: 'João Silva' },
  { id: '2', nome: 'Maria Santos' },
  { id: '3', nome: 'Pedro Costa' }
];

const mockVeiculos = [
  { id: '1', marca: 'Honda', modelo: 'Civic', placa: 'ABC-1234' },
  { id: '2', marca: 'Toyota', modelo: 'Corolla', placa: 'DEF-5678' },
  { id: '3', marca: 'Volkswagen', modelo: 'Jetta', placa: 'GHI-9012' }
];

export const useRelatoriosData = () => {
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState<RelatorioFilter>({});

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const revisoesFiltradas = mockRevisoes.filter(revisao => {
    const dataRevisao = new Date(revisao.data);
    const dataInicio = filtros.dataInicio ? new Date(filtros.dataInicio) : null;
    const dataFim = filtros.dataFim ? new Date(filtros.dataFim) : null;

    return (
      (!dataInicio || dataRevisao >= dataInicio) &&
      (!dataFim || dataRevisao <= dataFim) &&
      (!filtros.clienteId || revisao.clienteId === filtros.clienteId) &&
      (!filtros.status || revisao.status === filtros.status)
    );
  });

  const statsRevisoes = {
    total: mockRevisoes.length,
    concluidas: mockRevisoes.filter(r => r.status === 'concluido').length,
    faturamentoTotal: mockRevisoes.reduce((total, r) => total + (r.custoEstimado || 0), 0),
    tempoMedioServico: 85,
    satisfacaoMedia: 4.7
  };

  const statsClientes = {
    total: mockClientes.length,
    novos: 5
  };

  const statsVeiculos = {
    total: mockVeiculos.length,
    quilometragemMedia: 45000,
    porMarca: [
      { marca: 'Honda', quantidade: 15 },
      { marca: 'Toyota', quantidade: 12 },
      { marca: 'Volkswagen', quantidade: 8 },
      { marca: 'Ford', quantidade: 6 }
    ]
  };

  const statsRecomendacoes = {
    total: 18,
    pendentes: 5,
    valorTotal: 12500
  };

  const chartDataRevisoesPorMes = [
    { mes: 'Jan', revisoes: 45, faturamento: 12000 },
    { mes: 'Fev', revisoes: 52, faturamento: 14500 },
    { mes: 'Mar', revisoes: 48, faturamento: 13200 },
    { mes: 'Abr', revisoes: 61, faturamento: 16800 },
    { mes: 'Mai', revisoes: 55, faturamento: 15300 },
    { mes: 'Jun', revisoes: 67, faturamento: 18900 }
  ];

  const chartDataStatusRevisoes = [
    { status: 'Concluídas', quantidade: 45, color: '#22c55e' },
    { status: 'Agendadas', quantidade: 12, color: '#3b82f6' },
    { status: 'Em Andamento', quantidade: 8, color: '#f59e0b' },
    { status: 'Canceladas', quantidade: 3, color: '#ef4444' }
  ];

  return {
    filtros,
    setFiltros,
    revisoesFiltradas,
    statsRevisoes,
    statsClientes,
    statsVeiculos,
    statsRecomendacoes,
    chartDataRevisoesPorMes,
    chartDataStatusRevisoes,
    clientes: mockClientes,
    veiculos: mockVeiculos,
    loading
  };
};
