
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface RelatorioTableProps {
  revisoesFiltradas: any[];
  clientes: any[];
  veiculos: any[];
}

export const RelatorioTable: React.FC<RelatorioTableProps> = ({
  revisoesFiltradas,
  clientes,
  veiculos
}) => {
  const getStatusBadge = (status: string) => {
    const styles = {
      agendado: 'bg-blue-100 text-blue-800',
      em_andamento: 'bg-yellow-100 text-yellow-800',
      concluido: 'bg-green-100 text-green-800',
      cancelado: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      agendado: 'Agendado',
      em_andamento: 'Em Andamento',
      concluido: 'Concluído',
      cancelado: 'Cancelado'
    };

    return (
      <Badge className={styles[status as keyof typeof styles]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalhamento das Revisões</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Veículo</TableHead>
              <TableHead>Tipo de Serviço</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Tempo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {revisoesFiltradas.map(revisao => {
              const cliente = clientes.find(c => c.id === revisao.clienteId);
              const veiculo = veiculos.find(v => v.id === revisao.veiculoId);
              
              return (
                <TableRow key={revisao.id}>
                  <TableCell>
                    {new Date(revisao.data).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>{cliente?.nome}</TableCell>
                  <TableCell>
                    {veiculo?.marca} {veiculo?.modelo} - {veiculo?.placa}
                  </TableCell>
                  <TableCell>{revisao.tipoServico}</TableCell>
                  <TableCell>{getStatusBadge(revisao.status)}</TableCell>
                  <TableCell>{formatCurrency(revisao.custoEstimado || 0)}</TableCell>
                  <TableCell>{revisao.tempoEstimado || 0}min</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        
        {revisoesFiltradas.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhuma revisão encontrada com os filtros aplicados</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
