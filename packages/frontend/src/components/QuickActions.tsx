
import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Ações Rápidas</h3>
      </div>
      <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link 
          to="/revisoes/nova" 
          className="flex flex-col items-center justify-center p-4 bg-[#0F3460] bg-opacity-5 rounded-lg hover:bg-opacity-10 transition-all duration-200 transform hover:scale-105"
        >
          <span className="material-symbols-outlined text-3xl text-[#0F3460] mb-2">
            add_circle
          </span>
          <span className="text-sm text-gray-700">Nova Revisão</span>
        </Link>

        <Link 
          to="/clientes/novo" 
          className="flex flex-col items-center justify-center p-4 bg-[#0F3460] bg-opacity-5 rounded-lg hover:bg-opacity-10 transition-all duration-200 transform hover:scale-105"
        >
          <span className="material-symbols-outlined text-3xl text-[#0F3460] mb-2">
            person_add
          </span>
          <span className="text-sm text-gray-700">Novo Cliente</span>
        </Link>

        <Link 
          to="/veiculos/novo" 
          className="flex flex-col items-center justify-center p-4 bg-[#0F3460] bg-opacity-5 rounded-lg hover:bg-opacity-10 transition-all duration-200 transform hover:scale-105"
        >
          <span className="material-symbols-outlined text-3xl text-[#0F3460] mb-2">
            directions_car
          </span>
          <span className="text-sm text-gray-700">Novo Veículo</span>
        </Link>

        <Link 
          to="/relatorios/gerar" 
          className="flex flex-col items-center justify-center p-4 bg-[#0F3460] bg-opacity-5 rounded-lg hover:bg-opacity-10 transition-all duration-200 transform hover:scale-105"
        >
          <span className="material-symbols-outlined text-3xl text-[#0F3460] mb-2">
            summarize
          </span>
          <span className="text-sm text-gray-700">Gerar Relatório</span>
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;
