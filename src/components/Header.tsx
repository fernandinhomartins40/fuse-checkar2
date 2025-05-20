
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-[#0F3460] text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-3xl">directions_car</span>
            <h1 className="text-2xl font-bold tracking-tight">CHECAR</h1>
          </Link>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
