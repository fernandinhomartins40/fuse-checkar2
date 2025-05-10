
import React from 'react';
import { Link } from 'react-router-dom';

const RecentActivities = () => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Atividades Recentes</h3>
        <Link to="/atividades" className="text-[#0F3460] hover:text-[#FF5722] transition-colors duration-200">
          Ver todas
        </Link>
      </div>
      <div className="p-4">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="p-2">Cliente/Veículo</th>
              <th className="p-2">Serviço</th>
              <th className="p-2">Status</th>
              <th className="p-2">Data</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50 transition-colors duration-150">
              <td className="p-2">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-[#0F3460] flex items-center justify-center text-white text-xs">
                    MS
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-medium text-gray-900">
                      Maria Silva
                    </p>
                    <p className="text-xs text-gray-500">
                      Honda Civic (ABC-1234)
                    </p>
                  </div>
                </div>
              </td>
              <td className="p-2 text-sm">Revisão Completa</td>
              <td className="p-2">
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  Concluído
                </span>
              </td>
              <td className="p-2 text-sm text-gray-500">Hoje, 09:30</td>
              <td className="p-2">
                <div className="flex space-x-2">
                  <Link to="/revisoes/1" className="p-1 text-gray-500 hover:text-[#0F3460] transition-colors duration-200">
                    <span className="material-symbols-outlined text-sm">
                      visibility
                    </span>
                  </Link>
                  <Link to="/revisoes/1/editar" className="p-1 text-gray-500 hover:text-[#FF5722] transition-colors duration-200">
                    <span className="material-symbols-outlined text-sm">
                      edit
                    </span>
                  </Link>
                  <button className="p-1 text-gray-500 hover:text-red-500 transition-colors duration-200">
                    <span className="material-symbols-outlined text-sm">
                      delete
                    </span>
                  </button>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors duration-150">
              <td className="p-2">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-[#0F3460] flex items-center justify-center text-white text-xs">
                    JS
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-medium text-gray-900">
                      José Santos
                    </p>
                    <p className="text-xs text-gray-500">Fiat Uno (XYZ-9876)</p>
                  </div>
                </div>
              </td>
              <td className="p-2 text-sm">Troca de Óleo</td>
              <td className="p-2">
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                  Em andamento
                </span>
              </td>
              <td className="p-2 text-sm text-gray-500">Hoje, 11:45</td>
              <td className="p-2">
                <div className="flex space-x-2">
                  <Link to="/revisoes/2" className="p-1 text-gray-500 hover:text-[#0F3460] transition-colors duration-200">
                    <span className="material-symbols-outlined text-sm">
                      visibility
                    </span>
                  </Link>
                  <Link to="/revisoes/2/editar" className="p-1 text-gray-500 hover:text-[#FF5722] transition-colors duration-200">
                    <span className="material-symbols-outlined text-sm">
                      edit
                    </span>
                  </Link>
                  <button className="p-1 text-gray-500 hover:text-red-500 transition-colors duration-200">
                    <span className="material-symbols-outlined text-sm">
                      delete
                    </span>
                  </button>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors duration-150">
              <td className="p-2">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-[#0F3460] flex items-center justify-center text-white text-xs">
                    CO
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-medium text-gray-900">
                      Carlos Oliveira
                    </p>
                    <p className="text-xs text-gray-500">
                      Toyota Corolla (DEF-5678)
                    </p>
                  </div>
                </div>
              </td>
              <td className="p-2 text-sm">Alinhamento e Balanceamento</td>
              <td className="p-2">
                <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                  Agendado
                </span>
              </td>
              <td className="p-2 text-sm text-gray-500">Amanhã, 10:00</td>
              <td className="p-2">
                <div className="flex space-x-2">
                  <Link to="/revisoes/3" className="p-1 text-gray-500 hover:text-[#0F3460] transition-colors duration-200">
                    <span className="material-symbols-outlined text-sm">
                      visibility
                    </span>
                  </Link>
                  <Link to="/revisoes/3/editar" className="p-1 text-gray-500 hover:text-[#FF5722] transition-colors duration-200">
                    <span className="material-symbols-outlined text-sm">
                      edit
                    </span>
                  </Link>
                  <button className="p-1 text-gray-500 hover:text-red-500 transition-colors duration-200">
                    <span className="material-symbols-outlined text-sm">
                      delete
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivities;
