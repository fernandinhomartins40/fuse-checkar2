
import React from 'react';
import ClienteHeader from '../../components/ClienteHeader';
import { Link } from 'react-router-dom';

const Revisoes = () => {
  const revisoes = [
    {
      id: 1,
      veiculo: {
        id: 1,
        modelo: 'Honda Civic',
        placa: 'ABC-1234'
      },
      tipoServico: 'Revisão Completa',
      data: '15/04/2023',
      quilometragem: 42500,
      status: 'Concluído',
      recomendacoes: 1,
      tecnicos: ['João Silva', 'Carlos Oliveira'],
      itensVerificados: 120,
      itensOk: 119,
      itensNaoOk: 1
    },
    {
      id: 2,
      veiculo: {
        id: 1,
        modelo: 'Honda Civic',
        placa: 'ABC-1234'
      },
      tipoServico: 'Troca de Óleo',
      data: '10/01/2023',
      quilometragem: 37000,
      status: 'Concluído',
      recomendacoes: 0,
      tecnicos: ['Carlos Oliveira'],
      itensVerificados: 20,
      itensOk: 20,
      itensNaoOk: 0
    },
    {
      id: 3,
      veiculo: {
        id: 1,
        modelo: 'Honda Civic',
        placa: 'ABC-1234'
      },
      tipoServico: 'Alinhamento e Balanceamento',
      data: '05/10/2022',
      quilometragem: 30000,
      status: 'Concluído',
      recomendacoes: 0,
      tecnicos: ['José Santos'],
      itensVerificados: 15,
      itensOk: 15,
      itensNaoOk: 0
    },
    {
      id: 4,
      veiculo: {
        id: 2,
        modelo: 'Jeep Compass',
        placa: 'DEF-5678'
      },
      tipoServico: 'Revisão Programada',
      data: '20/05/2023',
      quilometragem: 15000,
      status: 'Concluído',
      recomendacoes: 0,
      tecnicos: ['Maria Oliveira', 'José Santos'],
      itensVerificados: 120,
      itensOk: 120,
      itensNaoOk: 0
    }
  ];

  const proximasRevisoes = [
    {
      id: 1,
      veiculo: {
        id: 1,
        modelo: 'Honda Civic',
        placa: 'ABC-1234'
      },
      tipo: 'Revisão Programada',
      data: '15/10/2023',
      quilometragem: 50000,
      status: 'Agendado',
      observacoes: 'Revisão de 50.000 km'
    },
    {
      id: 2,
      veiculo: {
        id: 2,
        modelo: 'Jeep Compass',
        placa: 'DEF-5678'
      },
      tipo: 'Revisão Programada',
      data: '20/11/2023',
      quilometragem: 20000,
      status: 'Agendado',
      observacoes: 'Revisão de 20.000 km'
    }
  ];

  return (
    <div id="webcrumbs">
      <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
        <ClienteHeader />
        
        <main className="container mx-auto py-6 px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Revisões</h2>
            <p className="text-gray-600">Histórico completo de revisões e serviços dos seus veículos.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Histórico de Revisões</h3>
                </div>
                <div className="p-4 overflow-x-auto">
                  <table className="w-full min-w-full">
                    <thead>
                      <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th className="p-2">Veículo</th>
                        <th className="p-2">Serviço</th>
                        <th className="p-2">Data</th>
                        <th className="p-2">Km</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {revisoes.map(revisao => (
                        <tr key={revisao.id} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="p-2">
                            <div className="flex items-center">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{revisao.veiculo.modelo}</p>
                                <p className="text-xs text-gray-500">{revisao.veiculo.placa}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 text-sm">{revisao.tipoServico}</td>
                          <td className="p-2 text-sm text-gray-500">{revisao.data}</td>
                          <td className="p-2 text-sm">{revisao.quilometragem} km</td>
                          <td className="p-2">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              {revisao.status}
                            </span>
                          </td>
                          <td className="p-2">
                            <div className="flex space-x-2">
                              <Link 
                                to={`/cliente/revisoes/${revisao.id}`} 
                                className="p-1 text-gray-500 hover:text-[#0F3460] transition-colors duration-200"
                              >
                                <span className="material-symbols-outlined text-sm">
                                  visibility
                                </span>
                              </Link>
                              {revisao.recomendacoes > 0 && (
                                <Link 
                                  to={`/cliente/recomendacoes/${revisao.id}`} 
                                  className="p-1 text-gray-500 hover:text-[#FF5722] transition-colors duration-200"
                                >
                                  <span className="material-symbols-outlined text-sm">
                                    warning
                                  </span>
                                </Link>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md mb-6">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Próximas Revisões</h3>
                </div>
                <div className="p-4">
                  <ul className="space-y-4">
                    {proximasRevisoes.map(revisao => (
                      <li key={revisao.id} className="flex items-start p-3 bg-blue-50 rounded-md border-l-4 border-blue-500">
                        <span className="material-symbols-outlined text-blue-500 mr-2">calendar_today</span>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{revisao.veiculo.modelo}</p>
                          <p className="text-xs text-gray-600">Placa: {revisao.veiculo.placa}</p>
                          <p className="text-xs text-gray-600 mt-1">Serviço: {revisao.tipo}</p>
                          <p className="text-xs text-gray-600">Data: {revisao.data}</p>
                          <p className="text-xs text-gray-600">Km previsto: {revisao.quilometragem} km</p>
                          <p className="text-xs mt-1 text-blue-600">{revisao.observacoes}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Estatísticas</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total de Revisões</p>
                      <p className="text-2xl font-bold">{revisoes.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Revisões por Veículo</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Honda Civic (ABC-1234)</p>
                          <span className="text-sm font-medium">3</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Jeep Compass (DEF-5678)</p>
                          <span className="text-sm font-medium">1</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Recomendações Pendentes</p>
                      <p className="text-lg font-bold text-yellow-600">1</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      to="/cliente/agendar"
                      className="bg-[#0F3460] hover:bg-[#0F3460]/90 text-white py-2 px-4 rounded-md flex items-center space-x-2 w-full justify-center"
                    >
                      <span className="material-symbols-outlined text-sm">calendar_add_on</span>
                      <span>Agendar Nova Revisão</span>
                    </Link>
                  </div>
                </div>
              </div>
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

export default Revisoes;
