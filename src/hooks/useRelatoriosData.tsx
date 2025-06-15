
import { useState, useMemo } from 'react';
import { useRevisoesData } from './useRevisoesData';

export interface RelatorioFilter {
  dataInicio?: string;
  dataFim?: string;
  clienteId?: string;
  veiculoId?: string;
  status?: string;
  tipoServico?: string;
}

export interface EstatsRevisoes {
  total: number;
  concluidas: number;
  agendadas: number;
  emAndamento: number;
  canceladas: number;
  faturamentoTotal: number;
  tempoMedioServico: number;
  satisfacaoMedia: number;
}

export interface EstatsClientes {
  total: number;
  novos: number;
  recorrentes: number;
  inativos: number;
}

export interface EstatsVeiculos {
  total: number;
  porMarca: { marca: string; quantidade: number }[];
  porAno: { ano: number; quantidade: number }[];
  quilometragemMedia: number;
}

export interface EstatsRecomendacoes {
  total: number;
  pendentes: number;
  aprovadas: number;
  rejeitadas: number;
  valorTotal: number;
}

export const useRelatoriosData = () => {
  const { revisoes, clientes, veiculos } = useRevisoesData();
  const [filtros, setFiltros] = useState<RelatorioFilter>({});

  const revisoesFiltradas = useMemo(() => {
    return revisoes.filter(revisao => {
      if (filtros.dataInicio && revisao.data < filtros.dataInicio) return false;
      if (filtros.dataFim && revisao.data > filtros.dataFim) return false;
      if (filtros.clienteId && revisao.clienteId !== filtros.clienteId) return false;
      if (filtros.veiculoId && revisao.veiculoId !== filtros.veiculoId) return false;
      if (filtros.status && revisao.status !== filtros.status) return false;
      if (filtros.tipoServico && !revisao.tipoServico.includes(filtros.tipoServico)) return false;
      return true;
    });
  }, [revisoes, filtros]);

  const statsRevisoes = useMemo((): EstatsRevisoes => {
    const total = revisoesFiltradas.length;
    const concluidas = revisoesFiltradas.filter(r => r.status === 'concluido').length;
    const agendadas = revisoesFiltradas.filter(r => r.status === 'agendado').length;
    const emAndamento = revisoesFiltradas.filter(r => r.status === 'em_andamento').length;
    const canceladas = revisoesFiltradas.filter(r => r.status === 'cancelado').length;
    
    const faturamentoTotal = revisoesFiltradas.reduce((acc, r) => acc + (r.custoEstimado || 0), 0);
    const tempoMedioServico = revisoesFiltradas.reduce((acc, r) => acc + (r.tempoEstimado || 0), 0) / (total || 1);
    const satisfacaoMedia = 4.2; // Mock data
    
    return {
      total,
      concluidas,
      agendadas,
      emAndamento,
      canceladas,
      faturamentoTotal,
      tempoMedioServico,
      satisfacaoMedia
    };
  }, [revisoesFiltradas]);

  const statsClientes = useMemo((): EstatsClientes => {
    const total = clientes.length;
    const novos = Math.floor(total * 0.3); // Mock calculation
    const recorrentes = Math.floor(total * 0.6);
    const inativos = total - novos - recorrentes;
    
    return { total, novos, recorrentes, inativos };
  }, [clientes]);

  const statsVeiculos = useMemo((): EstatsVeiculos => {
    const total = veiculos.length;
    
    const porMarca = veiculos.reduce((acc: { marca: string; quantidade: number }[], veiculo) => {
      const existing = acc.find(item => item.marca === veiculo.marca);
      if (existing) {
        existing.quantidade++;
      } else {
        acc.push({ marca: veiculo.marca, quantidade: 1 });
      }
      return acc;
    }, []);

    const porAno = veiculos.reduce((acc: { ano: number; quantidade: number }[], veiculo) => {
      const existing = acc.find(item => item.ano === veiculo.ano);
      if (existing) {
        existing.quantidade++;
      } else {
        acc.push({ ano: veiculo.ano, quantidade: 1 });
      }
      return acc;
    }, []);

    const quilometragemMedia = veiculos.reduce((acc, v) => acc + v.quilometragem, 0) / (total || 1);
    
    return { total, porMarca, porAno, quilometragemMedia };
  }, [veiculos]);

  const statsRecomendacoes = useMemo((): EstatsRecomendacoes => {
    const todasRecomendacoes = revisoesFiltradas.flatMap(r => r.recomendacoes);
    const total = todasRecomendacoes.length;
    const pendentes = todasRecomendacoes.filter(r => r.status === 'pendente').length;
    const aprovadas = todasRecomendacoes.filter(r => r.status === 'aprovada').length;
    const rejeitadas = todasRecomendacoes.filter(r => r.status === 'rejeitada').length;
    const valorTotal = todasRecomendacoes.reduce((acc, r) => acc + (r.custoEstimado || 0), 0);
    
    return { total, pendentes, aprovadas, rejeitadas, valorTotal };
  }, [revisoesFiltradas]);

  const chartDataRevisoesPorMes = useMemo(() => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return months.map((month, index) => ({
      mes: month,
      revisoes: Math.floor(Math.random() * 20) + 5,
      faturamento: Math.floor(Math.random() * 50000) + 10000
    }));
  }, []);

  const chartDataStatusRevisoes = useMemo(() => [
    { status: 'Concluídas', quantidade: statsRevisoes.concluidas, color: '#22c55e' },
    { status: 'Agendadas', quantidade: statsRevisoes.agendadas, color: '#3b82f6' },
    { status: 'Em Andamento', quantidade: statsRevisoes.emAndamento, color: '#eab308' },
    { status: 'Canceladas', quantidade: statsRevisoes.canceladas, color: '#ef4444' }
  ], [statsRevisoes]);

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
    clientes,
    veiculos
  };
};
