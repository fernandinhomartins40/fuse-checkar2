
import React from 'react';
import ClienteHeader from '../../components/ClienteHeader';
import { Link, useLocation } from 'react-router-dom';

const Recomendacoes = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const veiculoFilter = searchParams.get('veiculo');

  const recomendacoes = [
    {
      id: 1,
      revisao: {
        id: 1,
        data: '15/04/2023',
        tipoServico: 'Revisão Completa'
      },
      veiculo: {
        id: 1,
        modelo: 'Honda Civic',
        placa: 'ABC-1234',
        ano: 2019
      },
      item: 'Pastilhas de freio dianteiras',
      prioridade: 'Alta',
      descricao: 'Substituição necessária devido ao desgaste avançado, abaixo do limite mínimo seguro.',
      prazo: '30 dias',
      status: 'Pendente',
      custo: 'R$ 280,00 a R$ 350,00',
    }
  ];

  // Filter recommendations if veiculo parameter exists
  const filteredRecomendacoes = veiculoFilter 
    ? recomendacoes.filter(rec => rec.veiculo.id === Number(veiculoFilter)) 
    : recomendacoes;

  return (
    <div id="webcrumbs">
      <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
        <ClienteHeader />
        
        <main className="container mx-auto py-6 px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Recomendações</h2>
            <p className="text-gray-600">Serviços recomendados pelos nossos técnicos para seus veículos.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-md mb-6">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Recomendações Pendentes</h3>
                </div>
                <div className="p-4">
                  {filteredRecomendacoes.length > 0 ? (
                    <div className="space-y-4">
                      {filteredRecomendacoes.map(rec => (
                        <div 
                          key={rec.id} 
                          className={`p-4 rounded-lg border-l-4 ${
                            rec.prioridade === 'Alta' 
                              ? 'border-red-500 bg-red-50' 
                              : rec.prioridade === 'Média'
                                ? 'border-yellow-500 bg-yellow-50'
                                : 'border-blue-500 bg-blue-50'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <span 
                                  className={`text-xs font-medium rounded-full px-2 py-0.5 ${
                                    rec.prioridade === 'Alta' 
                                      ? 'bg-red-200 text-red-800' 
                                      : rec.prioridade === 'Média'
                                        ? 'bg-yellow-200 text-yellow-800'
                                        : 'bg-blue-200 text-blue-800'
                                  }`}
                                >
                                  Prioridade {rec.prioridade}
                                </span>
                                <span className="text-sm text-gray-500">{rec.veiculo.modelo} ({rec.veiculo.placa})</span>
                              </div>
                              <h4 className="text-lg font-medium text-gray-800">{rec.item}</h4>
                              <p className="text-sm text-gray-600 mt-1">{rec.descricao}</p>
                            </div>
                            <Link
                              to={`/cliente/agendar?recomendacao=${rec.id}`}
                              className="bg-[#0F3460] hover:bg-[#0F3460]/90 text-white py-1 px-3 rounded-md text-sm flex items-center space-x-1"
                            >
                              <span className="material-symbols-outlined text-sm">calendar_add_on</span>
                              <span>Agendar</span>
                            </Link>
                          </div>
                          <div className="mt-4 pt-3 border-t border-gray-200/50 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                            <div>
                              <p className="text-xs text-gray-500">Prazo Recomendado</p>
                              <p className="font-medium">{rec.prazo}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Custo Estimado</p>
                              <p className="font-medium">{rec.custo}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Origem</p>
                              <Link to={`/cliente/revisoes/${rec.revisao.id}`} className="font-medium text-[#0F3460] hover:text-[#FF5722]">
                                {rec.revisao.tipoServico} ({rec.revisao.data})
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <div className="h-16 w-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-3">
                        <span className="material-symbols-outlined text-2xl text-gray-400">check_circle</span>
                      </div>
                      <p className="text-gray-500 mb-2">Não há recomendações pendentes</p>
                      <p className="text-sm text-gray-400">Todas as revisões estão em ordem</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Histórico de Recomendações</h3>
                </div>
                <div className="p-4">
                  <div className="text-center p-8">
                    <div className="h-16 w-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-3">
                      <span className="material-symbols-outlined text-2xl text-gray-400">history</span>
                    </div>
                    <p className="text-gray-500 mb-2">Sem histórico de recomendações atendidas</p>
                    <p className="text-sm text-gray-400">
                      Quando você atender às recomendações, elas aparecerão aqui
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Informações</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Por que são importantes?</h4>
                      <p className="text-gray-600">
                        As recomendações são baseadas na inspeção detalhada realizada pelos nossos técnicos e visam garantir 
                        a segurança, desempenho e durabilidade do seu veículo.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Níveis de Prioridade</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <span className="bg-red-200 text-red-800 rounded-full px-2 py-0.5 text-xs">Alta</span>
                          <span>Requer atenção imediata (segurança)</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="bg-yellow-200 text-yellow-800 rounded-full px-2 py-0.5 text-xs">Média</span>
                          <span>Atenção nos próximos 60 dias</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="bg-blue-200 text-blue-800 rounded-full px-2 py-0.5 text-xs">Baixa</span>
                          <span>Manutenção preventiva</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Precisa de ajuda?</h4>
                      <p className="text-gray-600 mb-3">
                        Se tiver dúvidas sobre alguma recomendação, entre em contato com nossa equipe.
                      </p>
                      <Link 
                        to="/cliente/contato"
                        className="bg-[#0F3460] hover:bg-[#0F3460]/90 text-white py-2 px-4 rounded-md flex items-center space-x-2 w-full justify-center"
                      >
                        <span className="material-symbols-outlined text-sm">support_agent</span>
                        <span>Contatar Suporte</span>
                      </Link>
                    </div>
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

export default Recomendacoes;
