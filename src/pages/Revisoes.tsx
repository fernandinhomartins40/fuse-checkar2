
import React from 'react';
import Header from '../components/Header';

const Revisoes = () => {
  return (
    <div id="webcrumbs">
      <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
        <Header />
        <main className="container mx-auto py-6 px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Gerenciamento de Revisões</h2>
            <p className="text-gray-600">Acompanhe e gerencie todas as revisões realizadas.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-center text-gray-500">Conteúdo da página de revisões será implementado em breve.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Revisoes;
