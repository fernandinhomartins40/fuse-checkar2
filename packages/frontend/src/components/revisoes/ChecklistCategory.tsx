
import React, { useState } from 'react';
import { CategoriaChecklist, PreDiagnosisQuestion } from '../../types/revisoes';
import { ChecklistItem } from './ChecklistItem';
import { PreDiagnosisSection } from './PreDiagnosisSection';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface ChecklistCategoryProps {
  categoria: CategoriaChecklist;
  onUpdateItem: (itemId: string, updates: any) => void;
  onUpdatePreDiagnosis?: (questionId: string, resposta: string | boolean) => void;
  readonly?: boolean;
}

export const ChecklistCategory: React.FC<ChecklistCategoryProps> = ({
  categoria,
  onUpdateItem,
  onUpdatePreDiagnosis,
  readonly = false
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const getStats = () => {
    const total = categoria.itens.length;
    const ok = categoria.itens.filter(item => item.status === 'ok').length;
    const naoOk = categoria.itens.filter(item => item.status === 'nao_ok').length;
    const pendente = categoria.itens.filter(item => item.status === 'pendente').length;
    
    return { total, ok, naoOk, pendente };
  };

  const stats = getStats();

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">{categoria.nome}</h3>
                <p className="text-sm text-gray-600">{categoria.descricao}</p>
              </div>
            </div>
            <div className="flex space-x-4 text-sm">
              <span className="text-green-600 font-medium">{stats.ok} OK</span>
              <span className="text-red-600 font-medium">{stats.naoOk} Não OK</span>
              <span className="text-yellow-600 font-medium">{stats.pendente} Pendente</span>
              <span className="text-gray-600">Total: {stats.total}</span>
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4 space-y-4">
            {/* Pre-diagnosis Section */}
            {categoria.preDiagnostico && categoria.preDiagnostico.length > 0 && onUpdatePreDiagnosis && (
              <PreDiagnosisSection
                questions={categoria.preDiagnostico}
                onUpdateQuestion={onUpdatePreDiagnosis}
                readonly={readonly}
              />
            )}
            
            {/* Checklist Items */}
            {categoria.itens.map(item => (
              <ChecklistItem
                key={item.id}
                item={item}
                onUpdate={onUpdateItem}
                readonly={readonly}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
