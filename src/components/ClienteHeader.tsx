
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ClienteSidebar from './cliente/ClienteSidebar';

const ClienteHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const getInitials = () => {
    if (!user || !user.name) return 'C';
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Menu toggle e logo */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <span className="material-symbols-outlined text-gray-600">menu</span>
              </button>
              
              <Link to="/cliente/dashboard" className="flex items-center space-x-3 lg:hidden">
                <div className="h-8 w-8 bg-[#0F3460] rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-sm">directions_car</span>
                </div>
                <h1 className="text-xl font-bold text-[#0F3460]">CHECAR</h1>
              </Link>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                to="/cliente/dashboard"
                className="flex items-center space-x-2 text-gray-700 hover:text-[#0F3460] transition-colors"
              >
                <span className="material-symbols-outlined text-sm">dashboard</span>
                <span>Dashboard</span>
              </Link>
              <Link
                to="/cliente/veiculos"
                className="flex items-center space-x-2 text-gray-700 hover:text-[#0F3460] transition-colors"
              >
                <span className="material-symbols-outlined text-sm">directions_car</span>
                <span>Veículos</span>
              </Link>
              <Link
                to="/cliente/revisoes"
                className="flex items-center space-x-2 text-gray-700 hover:text-[#0F3460] transition-colors"
              >
                <span className="material-symbols-outlined text-sm">fact_check</span>
                <span>Revisões</span>
              </Link>
              <Link
                to="/cliente/recomendacoes"
                className="flex items-center space-x-2 text-gray-700 hover:text-[#0F3460] transition-colors"
              >
                <span className="material-symbols-outlined text-sm">build</span>
                <span>Recomendações</span>
              </Link>
            </nav>

            {/* User menu */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                <span className="material-symbols-outlined text-gray-600">notifications</span>
                <span className="absolute top-1 right-1 h-2 w-2 bg-[#FF5722] rounded-full"></span>
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-[#FF5722] flex items-center justify-center text-white text-sm font-medium">
                    {getInitials()}
                  </div>
                  <span className="hidden md:block text-gray-700 font-medium">{user?.name || 'Cliente'}</span>
                  <span className="material-symbols-outlined text-gray-500 text-sm">expand_more</span>
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                    <Link 
                      to="/cliente/perfil" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <span className="material-symbols-outlined text-sm">person</span>
                      <span>Meu Perfil</span>
                    </Link>
                    <hr className="my-1 border-gray-200" />
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <span className="material-symbols-outlined text-sm">logout</span>
                      <span>Sair</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar para mobile */}
      <ClienteSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
    </>
  );
};

export default ClienteHeader;
