import React from 'react';
import Layout from '../components/Layout';
import { VeiculosList } from '../components/veiculos/VeiculosList';
import { useVeiculosData } from '../hooks/useVeiculosData';
import { Car, Users, AlertTriangle, TrendingUp } from 'lucide-react';

const Veiculos = () => {
  const { getEstatisticas } = useVeiculosData();
  const stats = getEstatisticas();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Veículos</h1>
          <p className="text-muted-foreground mt-1">Gerencie todos os veículos cadastrados no sistema.</p>
        </div>
          
        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-card rounded-lg border shadow-sm p-4 md:p-6">
            <div className="flex items-center">
              <div className="h-10 w-10 md:h-12 md:w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Car className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <div className="ml-3 md:ml-4">
                <p className="text-xs md:text-sm text-muted-foreground">Total</p>
                <p className="text-lg md:text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border shadow-sm p-4 md:p-6">
            <div className="flex items-center">
              <div className="h-10 w-10 md:h-12 md:w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
              </div>
              <div className="ml-3 md:ml-4">
                <p className="text-xs md:text-sm text-muted-foreground">Ativos</p>
                <p className="text-lg md:text-2xl font-bold text-foreground">{stats.ativos}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border shadow-sm p-4 md:p-6">
            <div className="flex items-center">
              <div className="h-10 w-10 md:h-12 md:w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
              </div>
              <div className="ml-3 md:ml-4">
                <p className="text-xs md:text-sm text-muted-foreground">Inativos</p>
                <p className="text-lg md:text-2xl font-bold text-foreground">{stats.inativos}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border shadow-sm p-4 md:p-6">
            <div className="flex items-center">
              <div className="h-10 w-10 md:h-12 md:w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              </div>
              <div className="ml-3 md:ml-4">
                <p className="text-xs md:text-sm text-muted-foreground">Popular</p>
                <p className="text-sm md:text-lg font-bold text-foreground truncate">{stats.modeloMaisComum}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border shadow-sm p-4 md:p-6">
          <VeiculosList />
        </div>
      </div>
    </Layout>
  );
};

export default Veiculos;