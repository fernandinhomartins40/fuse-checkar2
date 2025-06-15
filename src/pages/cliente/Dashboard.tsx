
import React from 'react';
import ClienteHeader from '../../components/ClienteHeader';
import ClienteSidebar from '../../components/cliente/ClienteSidebar';
import StatsCard from '../../components/cliente/StatsCard';
import QuickActionCard from '../../components/cliente/QuickActionCard';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  const recentActivities = [
    {
      id: 1,
      type: 'revisao',
      veiculo: 'Honda Civic',
      placa: 'ABC-1234',
      servico: 'Revisão Completa',
      data: '15/04/2023',
      status: 'Concluído'
    },
    {
      id: 2,
      type: 'revisao',
      veiculo: 'Jeep Compass',
      placa: 'DEF-5678',
      servico: 'Troca de Óleo',
      data: '20/05/2023',
      status: 'Concluído'
    }
  ];

  const proximasRevisoes = [
    {
      id: 1,
      veiculo: 'Honda Civic',
      data: '10/06/2023',
      tipo: 'Revisão Agendada',
      urgencia: 'normal'
    },
    {
      id: 2,
      veiculo: 'Jeep Compass',
      data: '15/08/2023',
      tipo: 'Revisão Prevista',
      urgencia: 'baixa'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ClienteHeader />
      
      <div className="flex">
        {/* Sidebar para desktop */}
        <div className="hidden lg:block">
          <ClienteSidebar isOpen={true} onClose={() => {}} />
        </div>
        
        {/* Conteúdo principal */}
        <main className="flex-1 p-4 lg:p-6 max-w-7xl mx-auto w-full">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-[#0F3460] to-[#1a4b7a] rounded-2xl p-6 lg:p-8 text-white mb-8 shadow-lg">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                  Bem-vindo, {user?.name?.split(' ')[0] || 'Cliente'}! 👋
                </h1>
                <p className="text-white/90 text-lg">
                  Acompanhe seus veículos e mantenha-os sempre em perfeito estado.
                </p>
              </div>
              <div className="mt-4 lg:mt-0">
                <Link
                  to="/cliente/veiculos"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 inline-flex items-center space-x-2"
                >
                  <span className="material-symbols-outlined">add</span>
                  <span>Novo Agendamento</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total de Veículos"
              value="2"
              icon="directions_car"
              color="blue"
              linkTo="/cliente/veiculos"
              linkText="Ver detalhes"
            />
            <StatsCard
              title="Revisões Realizadas"
              value="5"
              icon="fact_check"
              color="orange"
              linkTo="/cliente/revisoes"
              linkText="Ver histórico"
            />
            <StatsCard
              title="Recomendações"
              value="3"
              icon="warning"
              color="yellow"
              linkTo="/cliente/recomendacoes"
              linkText="1 crítica"
              subtitle="Pendentes"
            />
            <StatsCard
              title="Economia Total"
              value="R$ 1.245"
              icon="savings"
              color="green"
              linkText="Detalhes"
              subtitle="Com manutenção preventiva"
            />
          </div>

          {/* Ações Rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <QuickActionCard
              title="Agendar Revisão"
              description="Marque sua próxima revisão"
              icon="calendar_add_on"
              linkTo="/cliente/agendar"
              color="blue"
            />
            <QuickActionCard
              title="Ver Recomendações"
              description="Confira as pendências"
              icon="build"
              linkTo="/cliente/recomendacoes"
              color="orange"
            />
            <QuickActionCard
              title="Histórico"
              description="Todas as suas revisões"
              icon="history"
              linkTo="/cliente/revisoes"
              color="purple"
            />
            <QuickActionCard
              title="Suporte"
              description="Precisa de ajuda?"
              icon="support_agent"
              linkTo="/cliente/suporte"
              color="green"
            />
          </div>

          {/* Seção Principal com 2 colunas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Meus Veículos */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Meus Veículos</h2>
                  <Link 
                    to="/cliente/veiculos" 
                    className="text-[#0F3460] hover:text-[#FF5722] transition-colors duration-200 font-medium"
                  >
                    Ver todos
                  </Link>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {/* Veículo 1 */}
                    <div className="p-4 border border-gray-200 rounded-xl hover:border-[#0F3460] transition-all duration-200 hover:shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 bg-[#0F3460]/10 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#0F3460]">directions_car</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">Honda Civic</h3>
                            <p className="text-sm text-gray-500">ABC-1234 • 2019</p>
                          </div>
                        </div>
                        <Link 
                          to="/cliente/veiculos/1" 
                          className="p-2 text-gray-400 hover:text-[#0F3460] transition-colors duration-200 rounded-lg hover:bg-gray-100"
                        >
                          <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Última revisão:</span> 15/04/2023
                        </div>
                        <div className="flex items-center text-yellow-600 text-sm">
                          <span className="material-symbols-outlined text-sm mr-1">warning</span>
                          1 recomendação
                        </div>
                      </div>
                    </div>

                    {/* Veículo 2 */}
                    <div className="p-4 border border-gray-200 rounded-xl hover:border-[#0F3460] transition-all duration-200 hover:shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 bg-[#0F3460]/10 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#0F3460]">directions_car</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">Jeep Compass</h3>
                            <p className="text-sm text-gray-500">DEF-5678 • 2022</p>
                          </div>
                        </div>
                        <Link 
                          to="/cliente/veiculos/2" 
                          className="p-2 text-gray-400 hover:text-[#0F3460] transition-colors duration-200 rounded-lg hover:bg-gray-100"
                        >
                          <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Última revisão:</span> 20/05/2023
                        </div>
                        <div className="flex items-center text-green-600 text-sm">
                          <span className="material-symbols-outlined text-sm mr-1">check_circle</span>
                          Em dia
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Próximas Revisões */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">Próximas Revisões</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {proximasRevisoes.map(revisao => (
                      <div 
                        key={revisao.id}
                        className={`p-4 rounded-xl border-l-4 ${
                          revisao.urgencia === 'normal' ? 'bg-blue-50 border-blue-500' : 'bg-yellow-50 border-yellow-500'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <span className={`material-symbols-outlined text-xl ${
                            revisao.urgencia === 'normal' ? 'text-blue-500' : 'text-yellow-500'
                          }`}>
                            {revisao.urgencia === 'normal' ? 'calendar_today' : 'schedule'}
                          </span>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{revisao.veiculo}</p>
                            <p className="text-sm text-gray-600">{revisao.tipo}</p>
                            <p className="text-sm text-gray-500">{revisao.data}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Histórico Recente */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Atividades Recentes</h2>
              <Link 
                to="/cliente/revisoes" 
                className="text-[#0F3460] hover:text-[#FF5722] transition-colors duration-200 font-medium"
              >
                Ver todas
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Veículo</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Serviço</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Data</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Status</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map(activity => (
                    <tr key={activity.id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-gray-800">{activity.veiculo}</p>
                          <p className="text-sm text-gray-500">{activity.placa}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-700">{activity.servico}</td>
                      <td className="py-4 px-6 text-gray-500">{activity.data}</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 font-medium">
                          {activity.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <Link 
                            to={`/cliente/revisoes/${activity.id}`} 
                            className="p-2 text-gray-400 hover:text-[#0F3460] transition-colors duration-200 rounded-lg hover:bg-gray-100"
                          >
                            <span className="material-symbols-outlined text-sm">visibility</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
