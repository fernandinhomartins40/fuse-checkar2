
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Users, 
  Car, 
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

interface StatsCardsProps {
  statsRevisoes: any;
  statsClientes: any;
  statsVeiculos: any;
  statsRecomendacoes: any;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  statsRevisoes,
  statsClientes,
  statsVeiculos,
  statsRecomendacoes
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Revisões */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Revisões</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statsRevisoes.total}</div>
          <p className="text-xs text-muted-foreground">
            {statsRevisoes.concluidas} concluídas
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Faturamento</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(statsRevisoes.faturamentoTotal)}</div>
          <p className="text-xs text-muted-foreground">
            Média: {formatCurrency(statsRevisoes.faturamentoTotal / (statsRevisoes.total || 1))}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Clientes</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statsClientes.total}</div>
          <p className="text-xs text-muted-foreground">
            {statsClientes.novos} novos clientes
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recomendações</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statsRecomendacoes.total}</div>
          <p className="text-xs text-muted-foreground">
            {statsRecomendacoes.pendentes} pendentes
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Math.round(statsRevisoes.tempoMedioServico)}min</div>
          <p className="text-xs text-muted-foreground">
            Por revisão
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Satisfação</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statsRevisoes.satisfacaoMedia.toFixed(1)}</div>
          <p className="text-xs text-muted-foreground">
            Nota média
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Veículos</CardTitle>
          <Car className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statsVeiculos.total}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round(statsVeiculos.quilometragemMedia).toLocaleString()}km média
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Valor Recomendações</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(statsRecomendacoes.valorTotal)}</div>
          <p className="text-xs text-muted-foreground">
            Potencial de vendas
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
