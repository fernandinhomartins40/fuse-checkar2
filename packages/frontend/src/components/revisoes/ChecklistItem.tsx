
import React from 'react';
import { ItemChecklist } from '../../types/revisoes';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';

interface ChecklistItemProps {
  item: ItemChecklist;
  onUpdate: (itemId: string, updates: Partial<ItemChecklist>) => void;
  readonly?: boolean;
}

export const ChecklistItem: React.FC<ChecklistItemProps> = ({
  item,
  onUpdate,
  readonly = false
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'nao_ok':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'nao_aplicavel':
        return <div className="h-5 w-5 rounded-full bg-gray-300" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getPriorityColor = (prioridade: string) => {
    switch (prioridade) {
      case 'critica':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'alta':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'media':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className={`p-4 border rounded-lg ${item.status === 'nao_ok' ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          {getStatusIcon(item.status)}
          <div>
            <h4 className="font-medium text-gray-900">{item.nome}</h4>
            {item.obrigatorio && (
              <span className="text-xs text-red-600 font-medium">* Obrigatório</span>
            )}
          </div>
        </div>
        <div className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(item.prioridade)}`}>
          {item.prioridade.charAt(0).toUpperCase() + item.prioridade.slice(1)}
        </div>
      </div>

      {!readonly && (
        <div className="space-y-3">
          <RadioGroup
            value={item.status}
            onValueChange={(value) => onUpdate(item.id, { status: value as any })}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ok" id={`${item.id}-ok`} />
              <Label htmlFor={`${item.id}-ok`} className="text-sm">OK</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nao_ok" id={`${item.id}-nao-ok`} />
              <Label htmlFor={`${item.id}-nao-ok`} className="text-sm">Não OK</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nao_aplicavel" id={`${item.id}-na`} />
              <Label htmlFor={`${item.id}-na`} className="text-sm">N/A</Label>
            </div>
          </RadioGroup>

          <Textarea
            placeholder="Observações sobre este item..."
            value={item.observacoes || ''}
            onChange={(e) => onUpdate(item.id, { observacoes: e.target.value })}
            className="min-h-[60px]"
          />

          {item.status === 'nao_ok' && (
            <div className="space-y-3 mt-4 p-4 bg-red-50 border border-red-200 rounded">
              <div className="space-y-2">
                <Label>Detalhe do Problema</Label>
                <Textarea
                  placeholder="Descreva o problema identificado..."
                  value={item.detalheProblema || ''}
                  onChange={(e) => onUpdate(item.id, { detalheProblema: e.target.value })}
                  className="min-h-[60px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Ação Recomendada</Label>
                <Textarea
                  placeholder="Qual ação é recomendada para resolver este problema?"
                  value={item.acaoRecomendada || ''}
                  onChange={(e) => onUpdate(item.id, { acaoRecomendada: e.target.value })}
                  className="min-h-[60px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Custo Estimado (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={item.custoEstimado || ''}
                  onChange={(e) => onUpdate(item.id, { custoEstimado: Number(e.target.value) })}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {readonly && (
        <div className="space-y-3 mt-3">
          {item.observacoes && (
            <div className="p-3 bg-gray-50 rounded border">
              <h5 className="text-xs font-medium text-gray-600 mb-1">Observações:</h5>
              <p className="text-sm text-gray-700">{item.observacoes}</p>
            </div>
          )}
          
          {item.status === 'nao_ok' && (
            <div className="space-y-2">
              {item.detalheProblema && (
                <div className="p-3 bg-red-50 rounded border border-red-200">
                  <h5 className="text-xs font-medium text-red-600 mb-1">Problema:</h5>
                  <p className="text-sm text-red-700">{item.detalheProblema}</p>
                </div>
              )}
              
              {item.acaoRecomendada && (
                <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                  <h5 className="text-xs font-medium text-yellow-600 mb-1">Ação Recomendada:</h5>
                  <p className="text-sm text-yellow-700">{item.acaoRecomendada}</p>
                </div>
              )}
              
              {item.custoEstimado && (
                <div className="p-3 bg-blue-50 rounded border border-blue-200">
                  <h5 className="text-xs font-medium text-blue-600 mb-1">Custo Estimado:</h5>
                  <p className="text-sm text-blue-700 font-medium">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.custoEstimado)}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
