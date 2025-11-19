
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { useRevisoesData } from '../hooks/useRevisoesData';
import { ChecklistCategory } from '../components/revisoes/ChecklistCategory';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Calendar, 
  Car, 
  User, 
  Clock, 
  DollarSign,
  FileText,
  AlertTriangle,
  CheckCircle,
  Edit
} from 'lucide-react';

const RevisaoDetalhe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getRevisaoById, getClienteById, getVeiculoById, updateRevisao } = useRevisoesData();
  
  const revisao = getRevisaoById(id || '');
  const cliente = revisao ? getClienteById(revisao.clienteId) : null;
  const veiculo = revisao ? getVeiculoById(revisao.veiculoId) : null;
  
  const [checklistData, setChecklistData] = useState(revisao?.checklist || []);

  if (!revisao || !cliente || !veiculo) {
    return (
      <div id="webcrumbs">
        <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
          <Header />
          <main className="container mx-auto py-6 px-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Revisão não encontrada</h2>
              <Link to="/revisoes" className="text-[#0F3460] hover:underline">
                Voltar para lista de revisões
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const handleUpdateItem = (itemId: string, updates: any) => {
    const newChecklistData = checklistData.map(categoria => ({
      ...categoria,
      itens: categoria.itens.map(item =>
        item.id === itemId ? { ...item, ...updates } : item
      )
    }));
    
    setChecklistData(newChecklistData);
    updateRevisao(revisao.id, { checklist: newChecklistData });
  };

  const handleStatusChange = (newStatus: string) => {
    updateRevisao(revisao.id, { status: newStatus as any });
    toast({
      title: "Status atualizado",
      description: `Status da revisão alterado para ${newStatus}`,
    });
  };

  const getStatusOptions = () => {
    const currentStatus = revisao.status;
    const options = [];
    
    if (currentStatus === 'agendado') {
      options.push({ value: 'em_andamento', label: 'Iniciar Revisão' });
      options.push({ value: 'cancelado', label: 'Cancelar' });
    } else if (currentStatus === 'em_andamento') {
      options.push({ value: 'concluido', label: 'Finalizar Revisão' });
      options.push({ value: 'agendado', label: 'Reagendar' });
    }
    
    return options;
  };

  const getChecklistStats = () => {
    const allItems = checklistData.flatMap(categoria => categoria.itens);
    const total = allItems.length;
    const ok = allItems.filter(item => item.status === 'ok').length;
    const naoOk = allItems.filter(item => item.status === 'nao_ok').length;
    const pendente = allItems.filter(item => item.status === 'pendente').length;
    
    return { total, ok, naoOk, pendente, progresso: total > 0 ? Math.round((ok / total) * 100) : 0 };
  };

  const stats = getChecklistStats();

  return (
    <div id="webcrumbs">
      <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
        <Header />
        <main className="container mx-auto py-6 px-4">
          <div className="mb-6">
            <Link to="/revisoes" className="text-gray-600 hover:text-[#0F3460] flex items-center mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Voltar para lista de revisões
            </Link>
            
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Revisão #{revisao.id} - {revisao.tipoServico}
                </h2>
                <p className="text-gray-600">Detalhes completos da revisão e checklist</p>
              </div>
              <div className="flex space-x-2">
                {getStatusOptions().map(option => (
                  <Button
                    key={option.value}
                    onClick={() => handleStatusChange(option.value)}
                    variant={option.value === 'cancelado' ? 'destructive' : 'default'}
                    className={option.value === 'concluido' ? 'bg-green-600 hover:bg-green-700' : ''}
                  >
                    {option.label}
                  </Button>
                ))}
                <Button variant="outline" onClick={() => navigate(`/revisoes/${id}/editar`)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
            </div>
          </div>

          {/* Informações Gerais */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Informações da Revisão</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Cliente</p>
                      <p className="font-medium">{cliente.nome}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Car className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Veículo</p>
                      <p className="font-medium">{veiculo.marca} {veiculo.modelo} - {veiculo.placa}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Data</p>
                      <p className="font-medium">{new Date(revisao.data).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Quilometragem</p>
                      <p className="font-medium">{revisao.quilometragem.toLocaleString()} km</p>
                    </div>
                  </div>
                </div>
                
                {revisao.observacoes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded border">
                    <p className="text-sm text-gray-600 mb-1">Observações:</p>
                    <p className="text-sm">{revisao.observacoes}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Progresso do Checklist</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progresso</span>
                      <span>{stats.progresso}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#0F3460] h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${stats.progresso}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>{stats.ok} OK</span>
                    </div>
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                      <span>{stats.naoOk} Não OK</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-yellow-500 mr-2" />
                      <span>{stats.pendente} Pendente</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{stats.total} Total</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Técnicos Responsáveis</h3>
                <div className="space-y-2">
                  {revisao.tecnicos.map((tecnico, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-[#0F3460] rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {tecnico.charAt(0)}
                      </div>
                      <span className="text-sm">{tecnico}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-6">Checklist de Revisão</h3>
            <div className="space-y-4">
              {checklistData.map(categoria => (
                <ChecklistCategory
                  key={categoria.id}
                  categoria={categoria}
                  onUpdateItem={handleUpdateItem}
                  readonly={revisao.status === 'concluido'}
                />
              ))}
            </div>
          </div>

          {/* Recomendações */}
          {revisao.recomendacoes.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Recomendações</h3>
              <div className="space-y-4">
                {revisao.recomendacoes.map(recomendacao => (
                  <div key={recomendacao.id} className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{recomendacao.item}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        recomendacao.prioridade === 'critica' ? 'bg-red-100 text-red-800' :
                        recomendacao.prioridade === 'alta' ? 'bg-orange-100 text-orange-800' :
                        recomendacao.prioridade === 'media' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {recomendacao.prioridade}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{recomendacao.descricao}</p>
                    {recomendacao.custoEstimado && (
                      <p className="text-sm text-gray-600">
                        Custo estimado: R$ {recomendacao.custoEstimado.toFixed(2)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default RevisaoDetalhe;
