import React from 'react';
import { FinalizationData } from '../../types/revisoes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Clock, DollarSign } from 'lucide-react';

interface FinalizationSectionProps {
  finalizacao: FinalizationData;
  onUpdateFinalizacao: (updates: Partial<FinalizationData>) => void;
  readonly?: boolean;
}

export const FinalizationSection: React.FC<FinalizationSectionProps> = ({
  finalizacao,
  onUpdateFinalizacao,
  readonly = false
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
          <ClipboardIcon className="h-5 w-5 mr-2" />
          Finalização da Revisão
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Observações Gerais */}
        <div className="space-y-2">
          <Label htmlFor="observacoes-gerais">Observações Gerais</Label>
          {readonly ? (
            <div className="p-3 bg-gray-50 rounded border">
              <p className="text-sm text-gray-700">{finalizacao.observacoesGerais || 'Nenhuma observação registrada'}</p>
            </div>
          ) : (
            <Textarea
              id="observacoes-gerais"
              placeholder="Observações gerais sobre a revisão..."
              value={finalizacao.observacoesGerais || ''}
              onChange={(e) => onUpdateFinalizacao({ observacoesGerais: e.target.value })}
              className="min-h-[100px]"
            />
          )}
        </div>

        {/* Problemas Críticos */}
        <div className="space-y-2">
          <Label>Problemas Críticos Identificados</Label>
          {readonly ? (
            <div className="space-y-2">
              {finalizacao.problemasCriticos && finalizacao.problemasCriticos.length > 0 ? (
                finalizacao.problemasCriticos.map((problema, index) => (
                  <Badge key={index} variant="destructive" className="mr-2 mb-2">
                    {problema}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-gray-500">Nenhum problema crítico identificado</p>
              )}
            </div>
          ) : (
            <Textarea
              placeholder="Liste os problemas críticos encontrados (um por linha)..."
              value={finalizacao.problemasCriticos?.join('\n') || ''}
              onChange={(e) => onUpdateFinalizacao({ 
                problemasCriticos: e.target.value.split('\n').filter(linha => linha.trim()) 
              })}
              className="min-h-[80px]"
            />
          )}
        </div>

        {/* Recomendações Prioritárias */}
        <div className="space-y-2">
          <Label>Recomendações Prioritárias</Label>
          {readonly ? (
            <div className="space-y-2">
              {finalizacao.recomendacoesPrioritarias && finalizacao.recomendacoesPrioritarias.length > 0 ? (
                finalizacao.recomendacoesPrioritarias.map((recomendacao, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-2">
                    {recomendacao}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-gray-500">Nenhuma recomendação prioritária</p>
              )}
            </div>
          ) : (
            <Textarea
              placeholder="Liste as recomendações prioritárias (uma por linha)..."
              value={finalizacao.recomendacoesPrioritarias?.join('\n') || ''}
              onChange={(e) => onUpdateFinalizacao({ 
                recomendacoesPrioritarias: e.target.value.split('\n').filter(linha => linha.trim()) 
              })}
              className="min-h-[80px]"
            />
          )}
        </div>

        {/* Custos e Tempos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="custo-total" className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              Custo Total Estimado
            </Label>
            {readonly ? (
              <div className="p-3 bg-gray-50 rounded border">
                <p className="text-sm font-medium text-gray-900">
                  {formatCurrency(finalizacao.custoTotalEstimado || 0)}
                </p>
              </div>
            ) : (
              <Input
                id="custo-total"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={finalizacao.custoTotalEstimado || ''}
                onChange={(e) => onUpdateFinalizacao({ custoTotalEstimado: Number(e.target.value) })}
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tempo-reparo" className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Tempo Estimado de Reparo (horas)
            </Label>
            {readonly ? (
              <div className="p-3 bg-gray-50 rounded border">
                <p className="text-sm font-medium text-gray-900">
                  {finalizacao.tempoEstimadoReparo || 0}h
                </p>
              </div>
            ) : (
              <Input
                id="tempo-reparo"
                type="number"
                step="0.5"
                placeholder="0"
                value={finalizacao.tempoEstimadoReparo || ''}
                onChange={(e) => onUpdateFinalizacao({ tempoEstimadoReparo: Number(e.target.value) })}
              />
            )}
          </div>
        </div>

        {/* Próxima Revisão */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="proxima-data" className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              Próxima Revisão - Data
            </Label>
            {readonly ? (
              <div className="p-3 bg-gray-50 rounded border">
                <p className="text-sm font-medium text-gray-900">
                  {finalizacao.proximaRevisaoData ? new Date(finalizacao.proximaRevisaoData).toLocaleDateString('pt-BR') : 'Não definida'}
                </p>
              </div>
            ) : (
              <Input
                id="proxima-data"
                type="date"
                value={finalizacao.proximaRevisaoData || ''}
                onChange={(e) => onUpdateFinalizacao({ proximaRevisaoData: e.target.value })}
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="proxima-km">Próxima Revisão - Quilometragem</Label>
            {readonly ? (
              <div className="p-3 bg-gray-50 rounded border">
                <p className="text-sm font-medium text-gray-900">
                  {finalizacao.proximaRevisaoKm ? `${finalizacao.proximaRevisaoKm.toLocaleString('pt-BR')} km` : 'Não definida'}
                </p>
              </div>
            ) : (
              <Input
                id="proxima-km"
                type="number"
                placeholder="0"
                value={finalizacao.proximaRevisaoKm || ''}
                onChange={(e) => onUpdateFinalizacao({ proximaRevisaoKm: Number(e.target.value) })}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Placeholder icon component since ClipboardIcon isn't available in lucide-react
const ClipboardIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);