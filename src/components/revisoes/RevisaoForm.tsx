
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRevisoesData } from '../../hooks/useRevisoesData';
import { newChecklistTemplate } from '../../data/newChecklistTemplate';
import { ChecklistCategory } from './ChecklistCategory';
import { FinalizationSection } from './FinalizationSection';
import { Revisao, CategoriaChecklist, ItemChecklist, PreDiagnosisQuestion, FinalizationData } from '../../types/revisoes';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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

  // Inicializar checklist com novo template
  const [checklist, setChecklist] = useState<CategoriaChecklist[]>(
    newChecklistTemplate.map(categoria => ({
      ...categoria,
      itens: categoria.itens.map(item => ({ ...item })),
      preDiagnostico: categoria.preDiagnostico?.map(question => ({ ...question }))
    }))
  );

  // Estado para finalização
  const [finalizacao, setFinalizacao] = useState<FinalizationData>({
    observacoesGerais: '',
    problemasCriticos: [],
    recomendacoesPrioritarias: [],
    custoTotalEstimado: 0,
    tempoEstimadoReparo: 0,
    proximaRevisaoData: '',
    proximaRevisaoKm: 0
  });

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

  const handleUpdatePreDiagnosis = (questionId: string, resposta: string | boolean) => {
    setChecklist(prev => 
      prev.map(categoria => ({
        ...categoria,
        preDiagnostico: categoria.preDiagnostico?.map(question =>
          question.id === questionId ? { ...question, resposta } : question
        )
      }))
    );
  };

  const handleUpdateFinalizacao = (updates: Partial<FinalizationData>) => {
    setFinalizacao(prev => ({ ...prev, ...updates }));
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
      recomendacoes: [],
      finalizacao
    };

    onSubmit(novaRevisao);
  };

  const isMobile = useIsMobile();

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto">
          <TabsTrigger value="dados-basicos" className="flex flex-col items-center py-3 px-2 text-xs md:text-sm">
            <span className="hidden sm:inline">1. Dados Básicos</span>
            <span className="sm:hidden">Dados</span>
          </TabsTrigger>
          <TabsTrigger 
            value="checklist" 
            disabled={!canProceedToChecklist()}
            className="flex flex-col items-center py-3 px-2 text-xs md:text-sm"
          >
            <span className="hidden sm:inline">2. Checklist</span>
            <span className="sm:hidden">Check</span>
            {stats.concluidos > 0 && (
              <span className="px-1 py-0.5 bg-blue-100 text-blue-800 text-[10px] md:text-xs rounded-full mt-1">
                {isMobile ? `${stats.percentual}%` : `${stats.percentual}%`}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="finalizacao" 
            disabled={!canSubmit()}
            className="flex flex-col items-center py-3 px-2 text-xs md:text-sm"
          >
            <span className="hidden sm:inline">3. Finalização</span>
            <span className="sm:hidden">Final</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dados-basicos" className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label htmlFor="cliente" className="text-sm font-medium">Cliente *</Label>
              <Select
                value={formData.clienteId}
                onValueChange={(value) => setFormData(prev => ({ ...prev, clienteId: value, veiculoId: '' }))}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientes.map(cliente => (
                    <SelectItem key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="veiculo" className="text-sm font-medium">Veículo *</Label>
              <Select
                value={formData.veiculoId}
                onValueChange={(value) => setFormData(prev => ({ ...prev, veiculoId: value }))}
                disabled={!formData.clienteId}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Selecione um veículo" />
                </SelectTrigger>
                <SelectContent>
                  {veiculosDoCliente.map(veiculo => (
                    <SelectItem key={veiculo.id} value={veiculo.id}>
                      <span className="block md:hidden">{veiculo.marca} {veiculo.modelo}</span>
                      <span className="hidden md:block">{veiculo.marca} {veiculo.modelo} - {veiculo.placa}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipoServico" className="text-sm font-medium">Tipo de Serviço *</Label>
              <Select
                value={formData.tipoServico}
                onValueChange={(value) => setFormData(prev => ({ ...prev, tipoServico: value }))}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Revisão Completa">Revisão Completa</SelectItem>
                  <SelectItem value="Revisão Programada">Revisão Programada</SelectItem>
                  <SelectItem value="Troca de Óleo">Troca de Óleo</SelectItem>
                  <SelectItem value="Alinhamento e Balanceamento">Alinhamento e Balanceamento</SelectItem>
                  <SelectItem value="Sistema de Freios">Sistema de Freios</SelectItem>
                  <SelectItem value="Sistema Elétrico">Sistema Elétrico</SelectItem>
                  <SelectItem value="Ar Condicionado">Ar Condicionado</SelectItem>
                  <SelectItem value="Suspensão">Suspensão</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="data" className="text-sm font-medium">Data da Revisão *</Label>
              <Input
                id="data"
                type="date"
                value={formData.data}
                onChange={(e) => setFormData(prev => ({ ...prev, data: e.target.value }))}
                className="h-10"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quilometragem" className="text-sm font-medium">Quilometragem *</Label>
              <Input
                id="quilometragem"
                type="number"
                placeholder="Ex: 50000"
                value={formData.quilometragem}
                onChange={(e) => setFormData(prev => ({ ...prev, quilometragem: parseInt(e.target.value) || 0 }))}
                className="h-10"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tecnicos" className="text-sm font-medium">Técnicos Responsáveis *</Label>
              <Input
                id="tecnicos"
                type="text"
                placeholder={isMobile ? "João Silva, Maria Santos" : "Separe por vírgula: João Silva, Maria Santos"}
                value={formData.tecnicos}
                onChange={(e) => setFormData(prev => ({ ...prev, tecnicos: e.target.value }))}
                className="h-10"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="custoEstimado" className="text-sm font-medium">Custo Estimado (R$)</Label>
              <Input
                id="custoEstimado"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.custoEstimado}
                onChange={(e) => setFormData(prev => ({ ...prev, custoEstimado: parseFloat(e.target.value) || 0 }))}
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tempoEstimado" className="text-sm font-medium">Tempo Estimado (min)</Label>
              <Input
                id="tempoEstimado"
                type="number"
                placeholder="120"
                value={formData.tempoEstimado}
                onChange={(e) => setFormData(prev => ({ ...prev, tempoEstimado: parseInt(e.target.value) || 0 }))}
                className="h-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes" className="text-sm font-medium">Observações</Label>
            <Textarea
              id="observacoes"
              placeholder="Observações adicionais sobre a revisão..."
              value={formData.observacoes}
              onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
            <Button type="button" variant="outline" onClick={onCancel} className="w-full sm:w-auto">
              Cancelar
            </Button>
            <Button 
              type="button" 
              onClick={() => setActiveTab('checklist')}
              disabled={!canProceedToChecklist()}
              className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
            >
              <span className="hidden sm:inline">Próximo: Checklist</span>
              <span className="sm:hidden">Próximo</span>
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
                onUpdatePreDiagnosis={handleUpdatePreDiagnosis}
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

          {/* Seção de Finalização */}
          <FinalizationSection
            finalizacao={finalizacao}
            onUpdateFinalizacao={handleUpdateFinalizacao}
          />

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
