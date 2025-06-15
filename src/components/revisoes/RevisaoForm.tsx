
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useRevisoesData } from '../../hooks/useRevisoesData';
import { checklistTemplate } from '../../data/checklistTemplate';
import { Revisao } from '../../types/revisoes';

interface RevisaoFormProps {
  onSubmit: (revisao: Omit<Revisao, 'id'>) => void;
  onCancel: () => void;
}

export const RevisaoForm: React.FC<RevisaoFormProps> = ({ onSubmit, onCancel }) => {
  const { clientes, veiculos } = useRevisoesData();
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

  const veiculosDoCliente = veiculos.filter(v => v.clienteId === formData.clienteId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const novaRevisao: Omit<Revisao, 'id'> = {
      ...formData,
      status: 'agendado',
      tecnicos: formData.tecnicos.split(',').map(t => t.trim()).filter(t => t),
      checklist: checklistTemplate,
      recomendacoes: []
    };

    onSubmit(novaRevisao);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div>
        <Label htmlFor="observacoes">Observações</Label>
        <Textarea
          id="observacoes"
          placeholder="Observações gerais sobre a revisão..."
          value={formData.observacoes}
          onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
          className="min-h-[100px]"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-[#0F3460] hover:bg-[#0F3460]/90">
          Criar Revisão
        </Button>
      </div>
    </form>
  );
};
