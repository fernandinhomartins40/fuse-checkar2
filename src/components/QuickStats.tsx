
import React from 'react';

const QuickStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#0F3460] hover:shadow-lg transition-shadow duration-300">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-500 text-sm">Revisões Hoje</p>
            <h3 className="text-3xl font-bold text-gray-800">5</h3>
          </div>
          <div className="h-12 w-12 bg-[#0F3460] bg-opacity-10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[#0F3460]">fact_check</span>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-xs text-green-600 flex items-center">
            <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
            +20% em relação a ontem
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#FF5722] hover:shadow-lg transition-shadow duration-300">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-500 text-sm">Veículos na Oficina</p>
            <h3 className="text-3xl font-bold text-gray-800">12</h3>
          </div>
          <div className="h-12 w-12 bg-[#FF5722] bg-opacity-10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[#FF5722]">directions_car</span>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-xs text-gray-600 flex items-center">3 em espera, 9 em manutenção</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#4CAF50] hover:shadow-lg transition-shadow duration-300">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-500 text-sm">Clientes Atendidos</p>
            <h3 className="text-3xl font-bold text-gray-800">85</h3>
          </div>
          <div className="h-12 w-12 bg-[#4CAF50] bg-opacity-10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[#4CAF50]">people</span>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-xs text-green-600 flex items-center">
            <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
            +12% este mês
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500 hover:shadow-lg transition-shadow duration-300">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-500 text-sm">Recomendações Pendentes</p>
            <h3 className="text-3xl font-bold text-gray-800">24</h3>
          </div>
          <div className="h-12 w-12 bg-yellow-500 bg-opacity-10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-yellow-500">warning</span>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-xs text-red-600 flex items-center">
            <span className="material-symbols-outlined text-sm mr-1">priority_high</span>8
            críticas, ação necessária
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
