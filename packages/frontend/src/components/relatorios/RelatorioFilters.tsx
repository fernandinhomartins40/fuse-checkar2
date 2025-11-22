
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Filter, Download } from 'lucide-react';
import { RelatorioFilter } from '../../hooks/useRelatoriosData';

interface RelatorioFiltersProps {
  filtros: RelatorioFilter;
  onFiltrosChange: (filtros: RelatorioFilter) => void;
  clientes: any[];
  veiculos: any[];
  onExportar: () => void;
}

export const RelatorioFilters: React.FC<RelatorioFiltersProps> = ({
  filtros,
  onFiltrosChange,
  clientes,
  veiculos,
  onExportar
}) => {
  const handleFilterChange = (key: keyof RelatorioFilter, value: string) => {
    onFiltrosChange({ ...filtros, [key]: value || undefined });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filtros de Relatório
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Data Início</label>
            <Input
              type="date"
              value={filtros.dataInicio || ''}
              onChange={(e) => handleFilterChange('dataInicio', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Data Fim</label>
            <Input
              type="date"
              value={filtros.dataFim || ''}
              onChange={(e) => handleFilterChange('dataFim', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Cliente</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={filtros.clienteId || ''}
              onChange={(e) => handleFilterChange('clienteId', e.target.value)}
            >
              <option value="">Todos os clientes</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={filtros.status || ''}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">Todos os status</option>
              <option value="agendado">Agendado</option>
              <option value="em_andamento">Em Andamento</option>
              <option value="concluido">Concluído</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <Button onClick={onExportar} variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
