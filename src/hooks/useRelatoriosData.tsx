
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

export interface RelatorioFilters {
  cliente: string;
  periodo: string;
  tipo: string;
  status: string;
}

export interface RelatorioStats {
  totalRelatorios: number;
  relatoriosConcluidos: number;
  relatoriosPendentes: number;
  receitaTotal: number;
}

// Mock data
const mockRelatorios: Relatorio[] = [
  {
    id: 1,
    cliente: 'João Silva',
    veiculo: 'Honda Civic 2019',
    periodo: '2023-10',
    tipo: 'revisoes',
    status: 'concluido',
    data: '2023-10-15',
    valor: 850
  },
  {
    id: 2,
    cliente: 'Maria Santos',
    veiculo: 'Toyota Corolla 2020',
    periodo: '2023-10',
    tipo: 'financeiro',
    status: 'pendente',
    data: '2023-10-20',
    valor: 1200
  },
  {
    id: 3,
    cliente: 'Pedro Costa',
    veiculo: 'Volkswagen Jetta 2021',
    periodo: '2023-09',
    tipo: 'desempenho',
    status: 'aprovado',
    data: '2023-09-28',
    valor: 950
  },
  {
    id: 4,
    cliente: 'Ana Oliveira',
    veiculo: 'Hyundai HB20 2018',
    periodo: '2023-09',
    tipo: 'revisoes',
    status: 'rejeitado',
    data: '2023-09-10',
    valor: 650
  }
];

export const useRelatoriosData = () => {
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<RelatorioFilters>({
    cliente: '',
    periodo: '',
    tipo: '',
    status: ''
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRelatorios(mockRelatorios);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredRelatorios = relatorios.filter(relatorio => {
    return (
      (filters.cliente === '' || relatorio.cliente.toLowerCase().includes(filters.cliente.toLowerCase())) &&
      (filters.periodo === '' || relatorio.periodo === filters.periodo) &&
      (filters.tipo === '' || relatorio.tipo === filters.tipo) &&
      (filters.status === '' || relatorio.status === filters.status)
    );
  });

  const stats: RelatorioStats = {
    totalRelatorios: relatorios.length,
    relatoriosConcluidos: relatorios.filter(r => r.status === 'concluido').length,
    relatoriosPendentes: relatorios.filter(r => r.status === 'pendente').length,
    receitaTotal: relatorios.reduce((total, r) => total + (r.valor || 0), 0)
  };

  const chartData = {
    revisoesPorMes: [
      { mes: 'Jan', revisoes: 45, receita: 12000 },
      { mes: 'Fev', revisoes: 52, receita: 14500 },
      { mes: 'Mar', revisoes: 48, receita: 13200 },
      { mes: 'Abr', revisoes: 61, receita: 16800 },
      { mes: 'Mai', revisoes: 55, receita: 15300 },
      { mes: 'Jun', revisoes: 67, receita: 18900 }
    ],
    tiposRevisao: [
      { tipo: 'Completa', quantidade: 120, cor: '#0F3460' },
      { tipo: 'Preventiva', quantidade: 85, cor: '#FF5722' },
      { tipo: 'Corretiva', quantidade: 45, cor: '#FFC107' },
      { tipo: 'Emergencial', quantidade: 23, cor: '#4CAF50' }
    ],
    statusDistribution: [
      { status: 'Concluídas', value: relatorios.filter(r => r.status === 'concluido').length },
      { status: 'Pendentes', value: relatorios.filter(r => r.status === 'pendente').length },
      { status: 'Aprovadas', value: relatorios.filter(r => r.status === 'aprovado').length },
      { status: 'Rejeitadas', value: relatorios.filter(r => r.status === 'rejeitado').length }
    ]
  };

  return {
    relatorios: filteredRelatorios,
    loading,
    filters,
    setFilters,
    stats,
    chartData
  };
};
