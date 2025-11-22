
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ClienteSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClienteSidebar: React.FC<ClienteSidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    {
      icon: 'dashboard',
      label: 'Dashboard',
      path: '/cliente/dashboard'
    },
    {
      icon: 'directions_car',
      label: 'Meus Veículos',
      path: '/cliente/veiculos'
    },
    {
      icon: 'fact_check',
      label: 'Revisões',
      path: '/cliente/revisoes'
    },
    {
      icon: 'build',
      label: 'Recomendações',
      path: '/cliente/recomendacoes'
    },
    {
      icon: 'person',
      label: 'Meu Perfil',
      path: '/cliente/perfil'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:shadow-none lg:border-r lg:border-gray-200
      `}>
        {/* Header da sidebar */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <Link to="/cliente/dashboard" className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-[#0F3460] rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-xl">directions_car</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#0F3460]">CHECAR</h2>
                <p className="text-xs text-gray-500">Área do Cliente</p>
              </div>
            </Link>
            <button 
              onClick={onClose}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <span className="material-symbols-outlined text-gray-500">close</span>
            </button>
          </div>
        </div>

        {/* Informações do usuário */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-[#FF5722] rounded-full flex items-center justify-center">
              <span className="text-white font-medium">
                {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'C'}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-800">{user?.name || 'Cliente'}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Menu de navegação */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive(item.path) 
                      ? 'bg-[#0F3460] text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-[#0F3460]'
                    }
                  `}
                >
                  <span className="material-symbols-outlined text-xl">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer da sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500">© 2023 CHECAR</p>
            <p className="text-xs text-gray-400">v1.0.0</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClienteSidebar;
