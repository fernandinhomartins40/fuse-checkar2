
import React from 'react';
import Header from '../components/Header';
import { useRelatoriosData } from '../hooks/useRelatoriosData';
import { RelatorioFilters } from '../components/relatorios/RelatorioFilters';
import { StatsCards } from '../components/relatorios/StatsCards';
import { RelatorioCharts } from '../components/relatorios/RelatorioCharts';
import { RelatorioTable } from '../components/relatorios/RelatorioTable';
import { useToast } from '@/hooks/use-toast';

const Relatorios = () => {
  const { toast } = useToast();
  const {
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
  } = useRelatoriosData();

  const handleExportar = () => {
    toast({
      title: "Exportação iniciada",
      description: "O relatório em PDF será baixado em breve.",
    });
    // Aqui seria implementada a lógica de exportação
  };

  return (
    <div id="webcrumbs">
      <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
        <Header />
        <main className="container mx-auto py-6 px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Relatórios</h2>
            <p className="text-gray-600">Gere e visualize relatórios detalhados de revisões e serviços.</p>
          </div>
          
          <div className="space-y-6">
            {/* Filtros */}
            <RelatorioFilters
              filtros={filtros}
              onFiltrosChange={setFiltros}
              clientes={clientes}
              veiculos={veiculos}
              onExportar={handleExportar}
            />

            {/* Cards de Estatísticas */}
            <StatsCards
              statsRevisoes={statsRevisoes}
              statsClientes={statsClientes}
              statsVeiculos={statsVeiculos}
              statsRecomendacoes={statsRecomendacoes}
            />

            {/* Gráficos */}
            <RelatorioCharts
              chartDataRevisoesPorMes={chartDataRevisoesPorMes}
              chartDataStatusRevisoes={chartDataStatusRevisoes}
              statsVeiculos={statsVeiculos}
            />

            {/* Tabela Detalhada */}
            <RelatorioTable
              revisoesFiltradas={revisoesFiltradas}
              clientes={clientes}
              veiculos={veiculos}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Relatorios;
