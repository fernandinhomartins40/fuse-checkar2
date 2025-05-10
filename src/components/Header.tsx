
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-[#0F3460] text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-3xl">directions_car</span>
          <h1 className="text-2xl font-bold tracking-tight">CHECAR</h1>
        </div>
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="hover:text-[#FF5722] transition-colors duration-200 flex items-center"
            >
              <span className="material-symbols-outlined mr-1">dashboard</span>
              Dashboard
            </Link>
            <Link
              to="/clientes"
              className="hover:text-[#FF5722] transition-colors duration-200 flex items-center"
            >
              <span className="material-symbols-outlined mr-1">group</span>
              Clientes
            </Link>
            <Link
              to="/veiculos"
              className="hover:text-[#FF5722] transition-colors duration-200 flex items-center"
            >
              <span className="material-symbols-outlined mr-1">directions_car</span>
              Veículos
            </Link>
            <Link
              to="/revisoes"
              className="hover:text-[#FF5722] transition-colors duration-200 flex items-center"
            >
              <span className="material-symbols-outlined mr-1">fact_check</span>
              Revisões
            </Link>
            <Link
              to="/relatorios"
              className="hover:text-[#FF5722] transition-colors duration-200 flex items-center"
            >
              <span className="material-symbols-outlined mr-1">description</span>
              Relatórios
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="hover:bg-[#FF5722] bg-opacity-70 p-2 rounded-full transition-all duration-200 transform hover:scale-105">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <details className="relative">
              <summary className="list-none cursor-pointer flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-[#FF5722] flex items-center justify-center text-white">
                  JD
                </div>
                <span className="hidden md:block">João Mecânico</span>
                <span className="material-symbols-outlined">expand_more</span>
              </summary>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link to="/perfil" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Meu Perfil
                </Link>
                <Link to="/configuracoes" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Configurações
                </Link>
                <Link to="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Sair
                </Link>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
