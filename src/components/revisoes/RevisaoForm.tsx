
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRevisoesData } from '../../hooks/useRevisoesData';
import { checklistTemplate } from '../../data/checklistTemplate';
import { ChecklistCategory } from './ChecklistCategory';
import { Revisao, CategoriaChecklist, ItemChecklist } from '../../types/revisoes';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface RevisaoFormProps {
  onSubmit: (revisao: Omit<Revisao, 'id'>) => void;
  onCancel: () => void;
}

export const RevisaoForm: React.FC<RevisaoFormProps> = ({ onSubmit, onCancel }) => {
  const { clientes, veiculos } = useRevisoesData();
  const [activeTab, setActiveTab] = useState('dados-basicos');
  const [formData, setFormData] = useState({
    clienteId: '',
    veiculoId: '',
    tipoServico: '',
    data: new Date().toISOString().split('T')[0],
    quilometragem: 0,
    tecnicos: '',
    observacoes: '',
    custoEstimado: 0,
    tempoEstimado: 0
  });

  // Inicializar checklist com template
  const [checklist, setChecklist] = useState<CategoriaChecklist[]>(
    checklistTemplate.map(categoria => ({
      ...categoria,
      itens: categoria.itens.map(item => ({ ...item }))
    }))
  );

  const veiculosDoCliente = veiculos.filter(v => v.clienteId === formData.clienteId);

  const handleUpdateChecklistItem = (itemId: string, updates: Partial<ItemChecklist>) => {
    setChecklist(prev => 
      prev.map(categoria => ({
        ...categoria,
        itens: categoria.itens.map(item =>
          item.id === itemId ? { ...item, ...updates } : item
        )
      }))
    );
  };

  const getChecklistStats = () => {
    const allItems = checklist.flatMap(categoria => categoria.itens);
    const total = allItems.length;
    const concluidos = allItems.filter(item => item.status !== 'pendente').length;
    const naoOk = allItems.filter(item => item.status === 'nao_ok').length;
    const criticos = allItems.filter(item => item.status === 'nao_ok' && item.prioridade === 'critica').length;
    
    return { total, concluidos, naoOk, criticos, percentual: Math.round((concluidos / total) * 100) };
  };

  const stats = getChecklistStats();

  const canProceedToChecklist = () => {
    return formData.clienteId && formData.veiculoId && formData.tipoServico && formData.data;
  };

  const canSubmit = () => {
    return canProceedToChecklist() && stats.concluidos === stats.total;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canSubmit()) {
      return;
    }
    
    const novaRevisao: Omit<Revisao, 'id'> = {
      ...formData,
      status: 'em_andamento',
      tecnicos: formData.tecnicos.split(',').map(t => t.trim()).filter(t => t),
      checklist,
      recomendacoes: []
    };

    onSubmit(novaRevisao);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dados-basicos" className="flex items-center space-x-2">
            <span>1. Dados Básicos</span>
          </TabsTrigger>
          <TabsTrigger 
            value="checklist" 
            disabled={!canProceedToChecklist()}
            className="flex items-center space-x-2"
          >
            <span>2. Checklist</span>
            {stats.concluidos > 0 && (
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {stats.percentual}%
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="finalizacao" 
            disabled={!canSubmit()}
            className="flex items-center space-x-2"
          >
            <span>3. Finalização</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dados-basicos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="cliente">Cliente</Label>
              <select
                id="cliente"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={formData.clienteId}
                onChange={(e) => setFormData(prev => ({ ...prev, clienteId: e.target.value, veiculoId: '' }))}
                required
              >
                <option value="">Selecione um cliente</option>
                {clientes.map(cliente => (
                  <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="veiculo">Veículo</Label>
              <select
                id="veiculo"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={formData.veiculoId}
                onChange={(e) => setFormData(prev => ({ ...prev, veiculoId: e.target.value }))}
                disabled={!formData.clienteId}
                required
              >
                <option value="">Selecione um veículo</option>
                {veiculosDoCliente.map(veiculo => (
                  <option key={veiculo.id} value={veiculo.id}>
                    {veiculo.marca} {veiculo.modelo} - {veiculo.placa}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="tipoServico">Tipo de Serviço</Label>
              <select
                id="tipoServico"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={formData.tipoServico}
                onChange={(e) => setFormData(prev => ({ ...prev, tipoServico: e.target.value }))}
                required
              >
                <option value="">Selecione o tipo</option>
                <option value="Revisão Completa">Revisão Completa</option>
                <option value="Revisão Programada">Revisão Programada</option>
                <option value="Troca de Óleo">Troca de Óleo</option>
                <option value="Alinhamento e Balanceamento">Alinhamento e Balanceamento</option>
                <option value="Sistema de Freios">Sistema de Freios</option>
                <option value="Sistema Elétrico">Sistema Elétrico</option>
                <option value="Ar Condicionado">Ar Condicionado</option>
                <option value="Suspensão">Suspensão</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div>
              <Label htmlFor="data">Data da Revisão</Label>
              <Input
                id="data"
                type="date"
                value={formData.data}
                onChange={(e) => setFormData(prev => ({ ...prev, data: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="quilometragem">Quilometragem</Label>
              <Input
                id="quilometragem"
                type="number"
                value={formData.quilometragem}
                onChange={(e) => setFormData(prev => ({ ...prev, quilometragem: parseInt(e.target.value) }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="tecnicos">Técnicos Responsáveis</Label>
              <Input
                id="tecnicos"
                type="text"
                placeholder="Separe por vírgula: João Silva, Maria Santos"
                value={formData.tecnicos}
                onChange={(e) => setFormData(prev => ({ ...prev, tecnicos: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="custoEstimado">Custo Estimado (R$)</Label>
              <Input
                id="custoEstimado"
                type="number"
                step="0.01"
                value={formData.custoEstimado}
                onChange={(e) => setFormData(prev => ({ ...prev, custoEstimado: parseFloat(e.target.value) }))}
              />
            </div>

            <div>
              <Label htmlFor="tempoEstimado">Tempo Estimado (minutos)</Label>
              <Input
                id="tempoEstimado"
                type="number"
                value={formData.tempoEstimado}
                onChange={(e) => setFormData(prev => ({ ...prev, tempoEstimado: parseInt(e.target.value) }))}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button 
              type="button" 
              onClick={() => setActiveTab('checklist')}
              disabled={!canProceedToChecklist()}
              className="bg-[#0F3460] hover:bg-[#0F3460]/90"
            >
              Próximo: Checklist
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="checklist" className="space-y-6">
          {/* Status do Checklist */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-blue-900">Progresso do Checklist</h3>
              <span className="text-2xl font-bold text-blue-600">{stats.percentual}%</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>{stats.concluidos}/{stats.total} Concluídos</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span>{stats.total - stats.concluidos} Pendentes</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span>{stats.naoOk} Problemas</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-800" />
                <span>{stats.criticos} Críticos</span>
              </div>
            </div>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${stats.percentual}%` }}
              />
            </div>
          </div>

          {/* Categorias do Checklist */}
          <div className="space-y-4">
            {checklist.map(categoria => (
              <ChecklistCategory
                key={categoria.id}
                categoria={categoria}
                onUpdateItem={handleUpdateChecklistItem}
              />
            ))}
          </div>

          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setActiveTab('dados-basicos')}
            >
              Voltar
            </Button>
            <Button 
              type="button" 
              onClick={() => setActiveTab('finalizacao')}
              disabled={stats.concluidos !== stats.total}
              className="bg-[#0F3460] hover:bg-[#0F3460]/90"
            >
              Próximo: Finalizar
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="finalizacao" className="space-y-6">
          {/* Resumo da Revisão */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4">Resumo da Revisão</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Cliente:</span>
                <span className="ml-2">{clientes.find(c => c.id === formData.clienteId)?.nome}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Veículo:</span>
                <span className="ml-2">
                  {veiculos.find(v => v.id === formData.veiculoId)?.marca} {veiculos.find(v => v.id === formData.veiculoId)?.modelo}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Tipo de Serviço:</span>
                <span className="ml-2">{formData.tipoServico}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Data:</span>
                <span className="ml-2">{new Date(formData.data).toLocaleDateString('pt-BR')}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Problemas Encontrados:</span>
                <span className="ml-2 text-red-600 font-semibold">{stats.naoOk}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Críticos:</span>
                <span className="ml-2 text-red-800 font-semibold">{stats.criticos}</span>
              </div>
            </div>
          </div>

          {/* Observações Finais */}
          <div>
            <Label htmlFor="observacoes">Observações Finais</Label>
            <Textarea
              id="observacoes"
              placeholder="Observações gerais sobre a revisão..."
              value={formData.observacoes}
              onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setActiveTab('checklist')}
            >
              Voltar ao Checklist
            </Button>
            <Button 
              type="submit" 
              className="bg-[#0F3460] hover:bg-[#0F3460]/90"
              disabled={!canSubmit()}
            >
              Criar Revisão
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
};
