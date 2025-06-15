
import React from 'react';
import Header from '../components/Header';
import { VeiculosList } from '../components/veiculos/VeiculosList';
import { useVeiculosData } from '../hooks/useVeiculosData';
import { Car, Users, AlertTriangle, TrendingUp } from 'lucide-react';

const Veiculos = () => {
  const { getEstatisticas } = useVeiculosData();
  const stats = getEstatisticas();

  return (
    <div id="webcrumbs">
      <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
        <Header />
        <main className="container mx-auto py-6 px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Gerenciamento de Veículos</h2>
            <p className="text-gray-600">Gerencie todos os veículos cadastrados no sistema.</p>
          </div>
          
          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-[#0F3460] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <Car className="h-6 w-6 text-[#0F3460]" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Total de Veículos</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Clientes Ativos</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.ativos}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Clientes Inativos</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.inativos}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Modelo + Popular</p>
                  <p className="text-lg font-bold text-gray-900 truncate">{stats.modeloMaisComum}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <VeiculosList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Veiculos;
