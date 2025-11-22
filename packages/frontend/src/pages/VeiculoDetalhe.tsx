
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { useVeiculosData } from '../hooks/useVeiculosData';
import { useRevisoesData } from '../hooks/useRevisoesData';
import { ArrowLeft, Edit, Car, User, Calendar, Settings } from 'lucide-react';
import { Button } from '../components/ui/button';

const VeiculoDetalhe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getVeiculoById } = useVeiculosData();
  const { getRevisoesByVeiculo } = useRevisoesData();

  const veiculo = id ? getVeiculoById(id) : null;
  const revisoes = id ? getRevisoesByVeiculo(id) : [];

  if (!veiculo) {
    return (
      <div id="webcrumbs">
        <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
          <Header />
          <main className="container mx-auto py-6 px-4">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Veículo não encontrado</h2>
              <p className="text-gray-600 mb-4">O veículo que você está procurando não existe.</p>
              <Link to="/veiculos">
                <Button className="bg-[#0F3460] hover:bg-[#0F3460]/90">
                  Voltar para lista de veículos
                </Button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const ultimaRevisao = revisoes
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())[0];

  return (
    <div id="webcrumbs">
      <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
        <Header />
        <main className="container mx-auto py-6 px-4">
          <div className="mb-6">
            <Link to="/veiculos" className="text-gray-600 hover:text-[#0F3460] flex items-center mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Voltar para lista de veículos
            </Link>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{veiculo.modelo}</h2>
                <p className="text-gray-600">Placa: {veiculo.placa}</p>
              </div>
              <Link to={`/veiculos/${veiculo.id}/editar`}>
                <Button className="bg-[#0F3460] hover:bg-[#0F3460]/90">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Veículo
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Informações do Veículo */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Car className="h-5 w-5 text-[#0F3460] mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">Informações do Veículo</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Modelo</p>
                    <p className="text-lg font-medium text-gray-900">{veiculo.modelo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Placa</p>
                    <p className="text-lg font-medium text-gray-900">{veiculo.placa}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ano</p>
                    <p className="text-lg font-medium text-gray-900">{veiculo.ano}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Cor</p>
                    <p className="text-lg font-medium text-gray-900">{veiculo.cor}</p>
                  </div>
                </div>
              </div>

              {/* Histórico de Revisões */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 text-[#0F3460] mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">Histórico de Revisões</h3>
                  </div>
                  <Link to={`/revisoes/nova?veiculo=${veiculo.id}`}>
                    <Button size="sm" className="bg-[#0F3460] hover:bg-[#0F3460]/90">
                      Nova Revisão
                    </Button>
                  </Link>
                </div>

                {revisoes.length === 0 ? (
                  <div className="text-center py-8">
                    <Settings className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500 mb-4">Nenhuma revisão encontrada para este veículo.</p>
                    <Link to={`/revisoes/nova?veiculo=${veiculo.id}`}>
                      <Button className="bg-[#0F3460] hover:bg-[#0F3460]/90">
                        Agendar Primeira Revisão
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {revisoes.map((revisao) => (
                      <div key={revisao.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#0F3460] transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{revisao.tipoServico}</h4>
                            <p className="text-sm text-gray-500">
                              {new Date(revisao.data).toLocaleDateString('pt-BR')} • {revisao.quilometragem} km
                            </p>
                            <div className="flex items-center mt-2">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                revisao.status === 'concluido' 
                                  ? 'bg-green-100 text-green-800'
                                  : revisao.status === 'em_andamento'
                                  ? 'bg-blue-100 text-blue-800'
                                  : revisao.status === 'agendado'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {revisao.status === 'concluido' && 'Concluído'}
                                {revisao.status === 'em_andamento' && 'Em Andamento'}
                                {revisao.status === 'agendado' && 'Agendado'}
                                {revisao.status === 'cancelado' && 'Cancelado'}
                              </span>
                            </div>
                          </div>
                          <Link 
                            to={`/revisoes/${revisao.id}`}
                            className="text-[#0F3460] hover:text-[#0F3460]/80 text-sm font-medium"
                          >
                            Ver detalhes
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Informações do Cliente */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <User className="h-5 w-5 text-[#0F3460] mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">Cliente</h3>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Nome</p>
                    <p className="font-medium text-gray-900">{veiculo.clienteNome}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{veiculo.clienteEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Telefone</p>
                    <p className="font-medium text-gray-900">{veiculo.clienteTelefone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      veiculo.clienteAtivo 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {veiculo.clienteAtivo ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Resumo de Revisões */}
              {ultimaRevisao && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-5 w-5 text-[#0F3460] mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">Última Revisão</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Serviço</p>
                      <p className="font-medium text-gray-900">{ultimaRevisao.tipoServico}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Data</p>
                      <p className="font-medium text-gray-900">
                        {new Date(ultimaRevisao.data).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Quilometragem</p>
                      <p className="font-medium text-gray-900">{ultimaRevisao.quilometragem} km</p>
                    </div>
                    
                    <Link 
                      to={`/revisoes/${ultimaRevisao.id}`}
                      className="inline-block w-full text-center bg-[#0F3460] text-white py-2 px-4 rounded-lg hover:bg-[#0F3460]/90 transition-colors text-sm font-medium"
                    >
                      Ver Revisão Completa
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VeiculoDetalhe;
