
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface RelatorioChartsProps {
  chartDataRevisoesPorMes: any[];
  chartDataStatusRevisoes: any[];
  statsVeiculos: any;
}

const chartConfig = {
  revisoes: {
    label: "Revisões",
    color: "#2563eb",
  },
  faturamento: {
    label: "Faturamento",
    color: "#dc2626",
  }
};

export const RelatorioCharts: React.FC<RelatorioChartsProps> = ({
  chartDataRevisoesPorMes,
  chartDataStatusRevisoes,
  statsVeiculos
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico de Linha - Revisões por Mês */}
      <Card>
        <CardHeader>
          <CardTitle>Revisões por Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart data={chartDataRevisoesPorMes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="revisoes" 
                stroke="var(--color-revisoes)" 
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Pizza - Status das Revisões */}
      <Card>
        <CardHeader>
          <CardTitle>Status das Revisões</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <PieChart>
              <Pie
                data={chartDataStatusRevisoes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ status, quantidade }) => `${status}: ${quantidade}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="quantidade"
              >
                {chartDataStatusRevisoes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Barras - Veículos por Marca */}
      <Card>
        <CardHeader>
          <CardTitle>Veículos por Marca</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={statsVeiculos.porMarca}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="marca" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="quantidade" fill="var(--color-revisoes)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Faturamento por Mês */}
      <Card>
        <CardHeader>
          <CardTitle>Faturamento Mensal</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={chartDataRevisoesPorMes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value) => [
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(Number(value)),
                  'Faturamento'
                ]}
              />
              <Bar dataKey="faturamento" fill="var(--color-faturamento)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
