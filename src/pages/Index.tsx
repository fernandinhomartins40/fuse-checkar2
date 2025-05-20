
import React from 'react';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div id="webcrumbs">
      <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
        {/* Header */}
        <Header />

        {/* Add client links */}
        <div className="bg-[#FF5722]/10 p-4">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-medium text-gray-800">Área do Cliente</h3>
              <p className="text-sm text-gray-600">Acompanhe suas revisões e recomendações técnicas.</p>
            </div>
            <div className="flex space-x-3">
              <Link to="/cliente/dashboard">
                <Button className="bg-[#FF5722] hover:bg-[#FF5722]/90">
                  Acessar Painel do Cliente
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Dashboard Main Content */}
        <main className="container mx-auto py-6 px-4">
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default Index;
