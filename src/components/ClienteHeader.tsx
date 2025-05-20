
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ClienteHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const getInitials = () => {
    if (!user || !user.name) return 'C';
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <header className="bg-[#0F3460] text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/cliente/dashboard" className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-3xl">directions_car</span>
          <h1 className="text-2xl font-bold tracking-tight">CHECAR</h1>
        </Link>
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex space-x-6">
            <Link
              to="/cliente/dashboard"
              className="hover:text-[#FF5722] transition-colors duration-200 flex items-center"
            >
              <span className="material-symbols-outlined mr-1">dashboard</span>
              Dashboard
            </Link>
            <Link
              to="/cliente/veiculos"
              className="hover:text-[#FF5722] transition-colors duration-200 flex items-center"
            >
              <span className="material-symbols-outlined mr-1">directions_car</span>
              Meus Veículos
            </Link>
            <Link
              to="/cliente/revisoes"
              className="hover:text-[#FF5722] transition-colors duration-200 flex items-center"
            >
              <span className="material-symbols-outlined mr-1">fact_check</span>
              Revisões
            </Link>
            <Link
              to="/cliente/recomendacoes"
              className="hover:text-[#FF5722] transition-colors duration-200 flex items-center"
            >
              <span className="material-symbols-outlined mr-1">build</span>
              Recomendações
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="hover:bg-[#FF5722] bg-opacity-70 p-2 rounded-full transition-all duration-200 transform hover:scale-105">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <details className="relative">
              <summary className="list-none cursor-pointer flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-[#FF5722] flex items-center justify-center text-white">
                  {getInitials()}
                </div>
                <span className="hidden md:block">{user?.name || 'Cliente'}</span>
                <span className="material-symbols-outlined">expand_more</span>
              </summary>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link to="/cliente/perfil" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Meu Perfil
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Sair
                </button>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ClienteHeader;
