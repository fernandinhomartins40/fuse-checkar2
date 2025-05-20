
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
          {isAuthenticated && user?.role === 'mecanico' && (
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
          )}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button className="hover:bg-[#FF5722] bg-opacity-70 p-2 rounded-full transition-all duration-200 transform hover:scale-105">
                  <span className="material-symbols-outlined">notifications</span>
                </button>
                <details className="relative">
                  <summary className="list-none cursor-pointer flex items-center space-x-2">
                    <div className="h-10 w-10 rounded-full bg-[#FF5722] flex items-center justify-center text-white">
                      {user?.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                    </div>
                    <span className="hidden md:block">{user?.name}</span>
                    <span className="material-symbols-outlined">expand_more</span>
                  </summary>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    {user?.role === 'cliente' ? (
                      <Link to="/cliente/perfil" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Meu Perfil
                      </Link>
                    ) : (
                      <Link to="/perfil" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Meu Perfil
                      </Link>
                    )}
                    <Link to="/configuracoes" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                      Configurações
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Sair
                    </button>
                  </div>
                </details>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="py-2 px-4 bg-transparent border border-white rounded-md hover:bg-white hover:text-[#0F3460] transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  to="/registro"
                  className="py-2 px-4 bg-[#FF5722] rounded-md hover:bg-[#FF5722]/90 transition-colors"
                >
                  Registrar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
