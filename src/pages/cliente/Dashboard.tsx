
import React from 'react';
import ClienteHeader from '../../components/ClienteHeader';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div id="webcrumbs">
      <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
        <ClienteHeader />
        
        <main className="container mx-auto py-6 px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Meu Dashboard</h2>
            <p className="text-gray-600">Olá {user?.name}, bem-vindo ao seu painel de controle.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#0F3460] hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total de Veículos</p>
                  <h3 className="text-3xl font-bold text-gray-800">2</h3>
                </div>
                <div className="h-12 w-12 bg-[#0F3460] bg-opacity-10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#0F3460]">directions_car</span>
                </div>
              </div>
              <div className="mt-2">
                <Link to="/cliente/veiculos" className="text-xs text-[#0F3460] flex items-center">
                  Ver detalhes 
                  <span className="material-symbols-outlined text-sm ml-1">chevron_right</span>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#FF5722] hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Revisões Realizadas</p>
                  <h3 className="text-3xl font-bold text-gray-800">5</h3>
                </div>
                <div className="h-12 w-12 bg-[#FF5722] bg-opacity-10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#FF5722]">fact_check</span>
                </div>
              </div>
              <div className="mt-2">
                <Link to="/cliente/revisoes" className="text-xs text-[#FF5722] flex items-center">
                  Ver histórico
                  <span className="material-symbols-outlined text-sm ml-1">chevron_right</span>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Recomendações Pendentes</p>
                  <h3 className="text-3xl font-bold text-gray-800">3</h3>
                </div>
                <div className="h-12 w-12 bg-yellow-500 bg-opacity-10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-yellow-500">warning</span>
                </div>
              </div>
              <div className="mt-2">
                <Link to="/cliente/recomendacoes" className="text-xs text-yellow-600 flex items-center">
                  <span className="material-symbols-outlined text-sm mr-1">priority_high</span>
                  1 recomendação crítica
                </Link>
              </div>
            </div>
          </div>

          {/* Vehicles Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Meus Veículos</h3>
                  <Link to="/cliente/veiculos" className="text-[#0F3460] hover:text-[#FF5722] transition-colors duration-200">
                    Ver todos
                  </Link>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg hover:border-[#0F3460] transition-colors duration-200">
                      <div className="flex justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 bg-[#0F3460] bg-opacity-10 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#0F3460]">directions_car</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">Honda Civic</h4>
                            <p className="text-sm text-gray-500">Placa: ABC-1234 • Ano: 2019</p>
                          </div>
                        </div>
                        <div>
                          <Link 
                            to="/cliente/veiculos/1" 
                            className="text-[#0F3460] hover:text-[#FF5722] transition-colors duration-200"
                          >
                            <span className="material-symbols-outlined">visibility</span>
                          </Link>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100 text-sm flex justify-between">
                        <div className="text-gray-500">
                          <span className="font-medium">Última revisão:</span> 15/04/2023
                        </div>
                        <div className="text-yellow-600 flex items-center">
                          <span className="material-symbols-outlined text-sm mr-1">warning</span>
                          1 recomendação pendente
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg hover:border-[#0F3460] transition-colors duration-200">
                      <div className="flex justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 bg-[#0F3460] bg-opacity-10 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#0F3460]">directions_car</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">Jeep Compass</h4>
                            <p className="text-sm text-gray-500">Placa: DEF-5678 • Ano: 2022</p>
                          </div>
                        </div>
                        <div>
                          <Link 
                            to="/cliente/veiculos/2" 
                            className="text-[#0F3460] hover:text-[#FF5722] transition-colors duration-200"
                          >
                            <span className="material-symbols-outlined">visibility</span>
                          </Link>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100 text-sm flex justify-between">
                        <div className="text-gray-500">
                          <span className="font-medium">Última revisão:</span> 20/05/2023
                        </div>
                        <div className="text-green-600 flex items-center">
                          <span className="material-symbols-outlined text-sm mr-1">check_circle</span>
                          Sem pendências
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md h-full">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Próximas Revisões</h3>
                </div>
                <div className="p-4">
                  <ul className="space-y-3">
                    <li className="flex items-start p-3 bg-blue-50 rounded-md border-l-4 border-blue-500">
                      <span className="material-symbols-outlined text-blue-500 mr-2">calendar_today</span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Honda Civic</p>
                        <p className="text-xs text-gray-600">Revisão Agendada: 10/06/2023</p>
                      </div>
                    </li>
                    <li className="flex items-start p-3 bg-yellow-50 rounded-md border-l-4 border-yellow-500">
                      <span className="material-symbols-outlined text-yellow-500 mr-2">schedule</span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Jeep Compass</p>
                        <p className="text-xs text-gray-600">Revisão Prevista: 15/08/2023</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Histórico de Revisões Recentes</h3>
              <Link to="/cliente/revisoes" className="text-[#0F3460] hover:text-[#FF5722] transition-colors duration-200">
                Ver todas
              </Link>
            </div>
            <div className="p-4 overflow-x-auto">
              <table className="w-full min-w-full">
                <thead>
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="p-2">Veículo</th>
                    <th className="p-2">Serviço</th>
                    <th className="p-2">Data</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="p-2">
                      <div className="flex items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Honda Civic</p>
                          <p className="text-xs text-gray-500">ABC-1234</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 text-sm">Revisão Completa</td>
                    <td className="p-2 text-sm text-gray-500">15/04/2023</td>
                    <td className="p-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        Concluído
                      </span>
                    </td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        <Link 
                          to="/cliente/revisoes/1" 
                          className="p-1 text-gray-500 hover:text-[#0F3460] transition-colors duration-200"
                        >
                          <span className="material-symbols-outlined text-sm">
                            visibility
                          </span>
                        </Link>
                        <Link 
                          to="/cliente/recomendacoes/1" 
                          className="p-1 text-gray-500 hover:text-[#FF5722] transition-colors duration-200"
                        >
                          <span className="material-symbols-outlined text-sm">
                            build
                          </span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="p-2">
                      <div className="flex items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Jeep Compass</p>
                          <p className="text-xs text-gray-500">DEF-5678</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 text-sm">Troca de Óleo</td>
                    <td className="p-2 text-sm text-gray-500">20/05/2023</td>
                    <td className="p-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        Concluído
                      </span>
                    </td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        <Link 
                          to="/cliente/revisoes/2" 
                          className="p-1 text-gray-500 hover:text-[#0F3460] transition-colors duration-200"
                        >
                          <span className="material-symbols-outlined text-sm">
                            visibility
                          </span>
                        </Link>
                        <Link 
                          to="/cliente/recomendacoes/2" 
                          className="p-1 text-gray-500 hover:text-[#FF5722] transition-colors duration-200"
                        >
                          <span className="material-symbols-outlined text-sm">
                            build
                          </span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Footer */}
          <footer className="mt-8 text-center py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">© 2023 CHECAR - Sistema de Revisão para Auto Centers</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
