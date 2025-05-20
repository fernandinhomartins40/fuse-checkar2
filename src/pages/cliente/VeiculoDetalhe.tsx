
import React from 'react';
import ClienteHeader from '../../components/ClienteHeader';
import { Link, useParams } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";

const VeiculoDetalhe = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock data - in a real app, this would be fetched from an API
  const veiculo = {
    id: Number(id),
    modelo: id === "1" ? 'Honda Civic' : 'Jeep Compass',
    placa: id === "1" ? 'ABC-1234' : 'DEF-5678',
    ano: id === "1" ? 2019 : 2022,
    cor: id === "1" ? 'Prata' : 'Branco',
    quilometragem: id === "1" ? 45000 : 15000,
    ultimaRevisao: id === "1" ? '15/04/2023' : '20/05/2023',
    proximaRevisao: id === "1" ? '15/10/2023' : '20/11/2023',
    status: 'Em dia',
    alertas: id === "1" ? 1 : 0,
    informacoes: {
      marca: id === "1" ? 'Honda' : 'Jeep',
      modelo: id === "1" ? 'Civic' : 'Compass',
      versao: id === "1" ? 'EXL 2.0' : 'Limited 4x4',
      combustivel: id === "1" ? 'Gasolina/Etanol' : 'Diesel',
      motor: id === "1" ? '2.0' : '2.0 TD',
      cambio: id === "1" ? 'Automático CVT' : 'Automático 9 marchas',
      fabricante: id === "1" ? 'Honda' : 'Jeep',
      chassis: id === "1" ? '9BHCE12345678910' : '8AXCE98765432190',
      renavam: id === "1" ? '12345678910' : '09876543210',
    }
  };

  const revisoes = [
    {
      id: 1,
      tipoServico: 'Revisão Completa',
      data: '15/04/2023',
      quilometragem: 42500,
      status: 'Concluído',
      recomendacoes: id === "1" ? 1 : 0,
      tecnicos: ['João Silva', 'Carlos Oliveira'],
      itensVerificados: 120,
      itensOk: 119,
      itensNaoOk: 1
    },
    {
      id: 2,
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
      tipoServico: 'Alinhamento e Balanceamento',
      data: '05/10/2022',
      quilometragem: 30000,
      status: 'Concluído',
      recomendacoes: 0,
      tecnicos: ['José Santos'],
      itensVerificados: 15,
      itensOk: 15,
      itensNaoOk: 0
    }
  ];

  const proximas = [
    {
      id: 1,
      tipo: 'Revisão Programada',
      data: '15/10/2023',
      quilometragem: 50000,
      status: 'Agendado',
      observacoes: 'Revisão de 50.000 km'
    }
  ];

  return (
    <div id="webcrumbs">
      <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
        <ClienteHeader />
        
        <main className="container mx-auto py-6 px-4">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Link to="/cliente/veiculos" className="text-[#0F3460] hover:text-[#FF5722]">
                  Meus Veículos
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600">{veiculo.modelo}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{veiculo.modelo}</h2>
              <p className="text-gray-600">Placa: {veiculo.placa} • Ano: {veiculo.ano}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link 
                to={`/cliente/agendar?veiculo=${veiculo.id}`}
                className="bg-[#0F3460] hover:bg-[#0F3460]/90 text-white py-2 px-4 rounded-md flex items-center space-x-2"
              >
                <span className="material-symbols-outlined text-sm">calendar_add_on</span>
                <span>Agendar Revisão</span>
              </Link>
            </div>
          </div>

          {/* Vehicle Overview */}
          <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Informações do Veículo</h3>
              {veiculo.alertas > 0 ? (
                <Link to={`/cliente/recomendacoes?veiculo=${veiculo.id}`} className="text-yellow-600 flex items-center text-sm">
                  <span className="material-symbols-outlined text-sm mr-1">warning</span>
                  {veiculo.alertas} recomendação pendente
                </Link>
              ) : (
                <span className="text-green-600 flex items-center text-sm">
                  <span className="material-symbols-outlined text-sm mr-1">check_circle</span>
                  Sem pendências
                </span>
              )}
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
                <div className="h-32 w-32 bg-[#0F3460] bg-opacity-10 rounded-lg flex items-center justify-center mb-6 md:mb-0">
                  <span className="material-symbols-outlined text-6xl text-[#0F3460]">directions_car</span>
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                      <p className="font-medium">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          veiculo.status === 'Em dia' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {veiculo.status}
                        </span>
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Quilometragem</h4>
                      <p className="font-medium">{veiculo.quilometragem} km</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Cor</h4>
                      <p className="font-medium">{veiculo.cor}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Última Revisão</h4>
                      <p className="font-medium">{veiculo.ultimaRevisao}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Próxima Revisão</h4>
                      <p className="font-medium">{veiculo.proximaRevisao}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Combustível</h4>
                      <p className="font-medium">{veiculo.informacoes.combustivel}</p>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Informações Técnicas</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Marca</p>
                        <p className="text-sm font-medium">{veiculo.informacoes.marca}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Modelo</p>
                        <p className="text-sm font-medium">{veiculo.informacoes.modelo}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Versão</p>
                        <p className="text-sm font-medium">{veiculo.informacoes.versao}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Motor</p>
                        <p className="text-sm font-medium">{veiculo.informacoes.motor}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Câmbio</p>
                        <p className="text-sm font-medium">{veiculo.informacoes.cambio}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Fabricante</p>
                        <p className="text-sm font-medium">{veiculo.informacoes.fabricante}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Chassis</p>
                        <p className="text-sm font-medium">{veiculo.informacoes.chassis}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Renavam</p>
                        <p className="text-sm font-medium">{veiculo.informacoes.renavam}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Revision History */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md h-full">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Histórico de Revisões</h3>
                </div>
                <div className="p-4 overflow-x-auto">
                  <table className="w-full min-w-full">
                    <thead>
                      <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th className="p-2">Data</th>
                        <th className="p-2">Serviço</th>
                        <th className="p-2">Km</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Detalhes</th>
                        <th className="p-2">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {revisoes.map(revisao => (
                        <tr key={revisao.id} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="p-2 text-sm">{revisao.data}</td>
                          <td className="p-2 text-sm">{revisao.tipoServico}</td>
                          <td className="p-2 text-sm">{revisao.quilometragem} km</td>
                          <td className="p-2">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              {revisao.status}
                            </span>
                          </td>
                          <td className="p-2 text-sm">
                            <div className="flex flex-col space-y-1">
                              <span className="text-xs text-gray-500">
                                Itens verificados: {revisao.itensVerificados}
                              </span>
                              <span className="flex items-center text-xs text-green-600">
                                <span className="material-symbols-outlined text-xs mr-1">check</span>
                                OK: {revisao.itensOk}
                              </span>
                              {revisao.itensNaoOk > 0 && (
                                <span className="flex items-center text-xs text-red-600">
                                  <span className="material-symbols-outlined text-xs mr-1">close</span>
                                  Não OK: {revisao.itensNaoOk}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="flex space-x-2">
                              <Link
                                to={`/cliente/revisoes/${revisao.id}`}
                                className="p-1 text-gray-500 hover:text-[#0F3460] transition-colors duration-200"
                              >
                                <span className="material-symbols-outlined text-sm">visibility</span>
                              </Link>
                              {revisao.recomendacoes > 0 && (
                                <Link
                                  to={`/cliente/recomendacoes/${revisao.id}`}
                                  className="p-1 text-gray-500 hover:text-[#FF5722] transition-colors duration-200"
                                >
                                  <span className="material-symbols-outlined text-sm">warning</span>
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
              <div className="bg-white rounded-lg shadow-md h-full">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Próximas Revisões</h3>
                </div>
                <div className="p-4">
                  {proximas.length > 0 ? (
                    <ul className="space-y-3">
                      {proximas.map(proxima => (
                        <li key={proxima.id} className="flex items-start p-3 bg-blue-50 rounded-md border-l-4 border-blue-500">
                          <span className="material-symbols-outlined text-blue-500 mr-2">calendar_today</span>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{proxima.tipo}</p>
                            <p className="text-xs text-gray-600">Data: {proxima.data}</p>
                            <p className="text-xs text-gray-600">Km previsto: {proxima.quilometragem} km</p>
                            <p className="text-xs mt-1 text-blue-600">{proxima.observacoes}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center p-6">
                      <div className="h-16 w-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-3">
                        <span className="material-symbols-outlined text-2xl text-gray-400">calendar_today</span>
                      </div>
                      <p className="text-gray-500 mb-4">Nenhuma revisão agendada</p>
                      <Link 
                        to={`/cliente/agendar?veiculo=${veiculo.id}`}
                        className="text-[#0F3460] hover:text-[#FF5722] text-sm flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-sm mr-1">add_circle</span>
                        Agendar Revisão
                      </Link>
                    </div>
                  )}
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

export default VeiculoDetalhe;
