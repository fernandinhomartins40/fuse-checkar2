
import React from 'react';

const MonthlySummary = () => {
  return (
    <div className="bg-white rounded-lg shadow-md h-full">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Resumo do Mês</h3>
      </div>
      <div className="p-4">
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Revisões por Status</h4>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-green-600">
                  Concluídas (65%)
                </span>
              </div>
              <div>
                <span className="text-xs font-semibold inline-block text-gray-600">
                  65 de 100
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div
                style={{width: "65%"}}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500"
              ></div>
            </div>
          </div>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-blue-600">
                  Em andamento (20%)
                </span>
              </div>
              <div>
                <span className="text-xs font-semibold inline-block text-gray-600">
                  20 de 100
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div
                style={{width: "20%"}}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
              ></div>
            </div>
          </div>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-yellow-600">
                  Agendadas (15%)
                </span>
              </div>
              <div>
                <span className="text-xs font-semibold inline-block text-gray-600">
                  15 de 100
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div
                style={{width: "15%"}}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500 transition-all duration-500"
              ></div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">
            Recomendações Mais Comuns
          </h4>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span className="text-sm">Troca de pastilhas de freio</span>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">18</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-sm">Substituição de óleo</span>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">15</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-sm">Troca de filtro de ar</span>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">12</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-sm">Alinhamento</span>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">10</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-sm">Balanceamento</span>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">8</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MonthlySummary;
