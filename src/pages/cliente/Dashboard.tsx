
import React from 'react';
import ClienteHeader from '../../components/ClienteHeader';
import ClienteSidebar from '../../components/cliente/ClienteSidebar';
import ModernStatsCard from '../../components/cliente/ModernStatsCard';
import ModernQuickAction from '../../components/cliente/ModernQuickAction';
import ModernVehicleCard from '../../components/cliente/ModernVehicleCard';
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

  const veiculos = [
    {
      id: 1,
      veiculo: 'Honda Civic',
      placa: 'ABC-1234',
      ano: 2019,
      ultimaRevisao: '15/04/2023',
      status: 'atencao' as const,
      recomendacoes: 1
    },
    {
      id: 2,
      veiculo: 'Jeep Compass',
      placa: 'DEF-5678',
      ano: 2022,
      ultimaRevisao: '20/05/2023',
      status: 'em_dia' as const
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ClienteHeader />
      
      <div className="flex w-full">
        {/* Sidebar para desktop */}
        <div className="hidden lg:block">
          <ClienteSidebar isOpen={true} onClose={() => {}} />
        </div>
        
        {/* Conteúdo principal */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
          {/* Hero Section Moderno */}
          <div className="relative overflow-hidden bg-gradient-to-r from-[#0F3460] via-[#1a4b7a] to-[#0F3460] rounded-3xl p-8 lg:p-12 text-white mb-8 shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            
            {/* Content */}
            <div className="relative">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <span className="material-symbols-outlined text-2xl">waving_hand</span>
                    </div>
                    <div>
                      <h1 className="text-3xl lg:text-4xl font-bold">
                        Olá, {user?.name?.split(' ')[0] || 'Cliente'}!
                      </h1>
                      <p className="text-white/80 text-sm">Bem-vindo de volta</p>
                    </div>
                  </div>
                  <p className="text-white/90 text-lg lg:text-xl leading-relaxed max-w-2xl">
                    Mantenha seus veículos sempre em perfeito estado com nosso sistema inteligente de monitoramento.
                  </p>
                </div>
                <div className="mt-6 lg:mt-0">
                  <Link
                    to="/cliente/veiculos"
                    className="inline-flex items-center space-x-3 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl group"
                  >
                    <span className="material-symbols-outlined group-hover:scale-110 transition-transform">add_circle</span>
                    <span>Novo Agendamento</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards Modernos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <ModernStatsCard
              title="Total de Veículos"
              value="2"
              icon="directions_car"
              color="blue"
              trend={{ value: 12, isPositive: true }}
              linkTo="/cliente/veiculos"
              linkText="Ver detalhes"
            />
            <ModernStatsCard
              title="Revisões Realizadas"
              value="5"
              icon="fact_check"
              color="green"
              trend={{ value: 8, isPositive: true }}
              linkTo="/cliente/revisoes"
              linkText="Ver histórico"
            />
            <ModernStatsCard
              title="Recomendações"
              value="3"
              icon="warning"
              color="yellow"
              description="1 crítica"
              linkTo="/cliente/recomendacoes"
              linkText="Ver pendências"
            />
            <ModernStatsCard
              title="Economia Total"
              value="R$ 1.245"
              icon="savings"
              color="purple"
              description="Com manutenção preventiva"
              trend={{ value: 15, isPositive: true }}
            />
          </div>

          {/* Ações Rápidas Modernas */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ações Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ModernQuickAction
                title="Agendar Revisão"
                description="Marque sua próxima revisão com facilidade"
                icon="calendar_add_on"
                linkTo="/cliente/agendar"
                color="blue"
              />
              <ModernQuickAction
                title="Recomendações"
                description="Confira as pendências dos seus veículos"
                icon="build"
                linkTo="/cliente/recomendacoes"
                color="orange"
                badge="3 pendentes"
              />
              <ModernQuickAction
                title="Histórico Completo"
                description="Todas as suas revisões e serviços"
                icon="history"
                linkTo="/cliente/revisoes"
                color="purple"
              />
              <ModernQuickAction
                title="Suporte Premium"
                description="Atendimento especializado 24/7"
                icon="support_agent"
                linkTo="/cliente/suporte"
                color="green"
              />
            </div>
          </div>

          {/* Seção Principal com Layout Moderno */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Meus Veículos */}
            <div className="xl:col-span-2">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Meus Veículos</h2>
                    <p className="text-gray-600 mt-1">Gerencie e monitore seus veículos</p>
                  </div>
                  <Link 
                    to="/cliente/veiculos" 
                    className="inline-flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span>Ver todos</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
                <div className="p-8">
                  <div className="grid gap-6">
                    {veiculos.map(veiculo => (
                      <ModernVehicleCard key={veiculo.id} {...veiculo} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Próximas Revisões */}
            <div className="xl:col-span-1">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 h-full">
                <div className="p-8 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900">Próximas Revisões</h2>
                  <p className="text-gray-600 mt-1">Agenda personalizada</p>
                </div>
                <div className="p-8">
                  <div className="space-y-6">
                    {proximasRevisoes.map(revisao => (
                      <div 
                        key={revisao.id}
                        className={`relative p-6 rounded-2xl border-l-4 ${
                          revisao.urgencia === 'normal' 
                            ? 'bg-gradient-to-r from-blue-50 to-blue-50/50 border-blue-500' 
                            : 'bg-gradient-to-r from-yellow-50 to-yellow-50/50 border-yellow-500'
                        } hover:shadow-lg transition-all duration-300`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-xl ${
                            revisao.urgencia === 'normal' ? 'bg-blue-500' : 'bg-yellow-500'
                          } shadow-lg`}>
                            <span className="material-symbols-outlined text-white text-xl">
                              {revisao.urgencia === 'normal' ? 'calendar_today' : 'schedule'}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-lg">{revisao.veiculo}</p>
                            <p className="text-gray-600 text-sm mt-1">{revisao.tipo}</p>
                            <div className="flex items-center space-x-2 mt-3">
                              <span className="material-symbols-outlined text-gray-400 text-sm">schedule</span>
                              <p className="text-gray-500 text-sm font-medium">{revisao.data}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Histórico Recente Moderno */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Atividades Recentes</h2>
                <p className="text-gray-600 mt-1">Últimas revisões e serviços realizados</p>
              </div>
              <Link 
                to="/cliente/revisoes" 
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
              >
                <span>Ver todas</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="text-left py-4 px-8 font-semibold text-gray-700">Veículo</th>
                    <th className="text-left py-4 px-8 font-semibold text-gray-700">Serviço</th>
                    <th className="text-left py-4 px-8 font-semibold text-gray-700">Data</th>
                    <th className="text-left py-4 px-8 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-8 font-semibold text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map(activity => (
                    <tr key={activity.id} className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors duration-200">
                      <td className="py-6 px-8">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-sm">directions_car</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{activity.veiculo}</p>
                            <p className="text-sm text-gray-500">{activity.placa}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-8 text-gray-700 font-medium">{activity.servico}</td>
                      <td className="py-6 px-8 text-gray-500">{activity.data}</td>
                      <td className="py-6 px-8">
                        <span className="px-4 py-2 text-xs rounded-full bg-green-100 text-green-800 font-semibold">
                          {activity.status}
                        </span>
                      </td>
                      <td className="py-6 px-8">
                        <Link 
                          to={`/cliente/revisoes/${activity.id}`} 
                          className="inline-flex items-center justify-center h-9 w-9 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                        >
                          <span className="material-symbols-outlined text-sm">visibility</span>
                        </Link>
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
