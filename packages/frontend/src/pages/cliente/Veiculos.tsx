
import React from 'react';
import ClienteHeader from '../../components/ClienteHeader';
import { Link } from 'react-router-dom';

const Veiculos = () => {
  const veiculos = [
    {
      id: 1,
      modelo: 'Honda Civic',
      placa: 'ABC-1234',
      ano: 2019,
      cor: 'Prata',
      quilometragem: 45000,
      ultimaRevisao: '15/04/2023',
      proximaRevisao: '15/10/2023',
      status: 'Em dia',
      alertas: 1
    },
    {
      id: 2,
      modelo: 'Jeep Compass',
      placa: 'DEF-5678',
      ano: 2022,
      cor: 'Branco',
      quilometragem: 15000,
      ultimaRevisao: '20/05/2023',
      proximaRevisao: '20/11/2023',
      status: 'Em dia',
      alertas: 0
    }
  ];

  return (
    <div id="webcrumbs">
      <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
        <ClienteHeader />
        
        <main className="container mx-auto py-6 px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Meus Veículos</h2>
            <p className="text-gray-600">Gerenciamento e acompanhamento dos seus veículos.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Veículos Cadastrados</h3>
            </div>
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {veiculos.map(veiculo => (
                <div key={veiculo.id} className="border border-gray-200 rounded-lg p-6 hover:border-[#0F3460] transition-colors duration-200 shadow-sm hover:shadow-md">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                      <div className="h-14 w-14 bg-[#0F3460] bg-opacity-10 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl text-[#0F3460]">directions_car</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-800">{veiculo.modelo}</h4>
                        <p className="text-sm text-gray-500">Placa: {veiculo.placa} • Ano: {veiculo.ano}</p>
                      </div>
                    </div>
                    <Link
                      to={`/cliente/veiculos/${veiculo.id}`}
                      className="text-[#0F3460] hover:text-[#FF5722] transition-colors duration-200"
                    >
                      <span className="material-symbols-outlined">visibility</span>
                    </Link>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Cor</p>
                        <p className="text-sm font-medium">{veiculo.cor}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Quilometragem</p>
                        <p className="text-sm font-medium">{veiculo.quilometragem} km</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Última Revisão</p>
                        <p className="text-sm font-medium">{veiculo.ultimaRevisao}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Próxima Revisão</p>
                        <p className="text-sm font-medium">{veiculo.proximaRevisao}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      veiculo.status === 'Em dia' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {veiculo.status}
                    </span>
                    {veiculo.alertas > 0 ? (
                      <Link to={`/cliente/recomendacoes?veiculo=${veiculo.id}`} className="text-yellow-600 flex items-center text-xs">
                        <span className="material-symbols-outlined text-sm mr-1">warning</span>
                        {veiculo.alertas} recomendação pendente
                      </Link>
                    ) : (
                      <span className="text-green-600 flex items-center text-xs">
                        <span className="material-symbols-outlined text-sm mr-1">check_circle</span>
                        Sem pendências
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md mb-8">
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
                    <th className="p-2">Quilometragem</th>
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
                    <td className="p-2 text-sm">42.500 km</td>
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
                          <span className="material-symbols-outlined text-sm">visibility</span>
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
                    <td className="p-2 text-sm">15.000 km</td>
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
                          <span className="material-symbols-outlined text-sm">visibility</span>
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

export default Veiculos;
