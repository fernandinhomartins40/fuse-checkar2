
import React, { useState } from 'react';
import Header from '../components/Header';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import ClientesList from '../components/clientes/ClientesList';
import { Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated or not a mechanic
  React.useEffect(() => {
    if (isAuthenticated && user?.role !== 'mecanico') {
      navigate('/cliente/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div id="webcrumbs">
      <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
        <Header />
        <main className="container mx-auto py-6 px-4">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Gerenciamento de Clientes</h2>
              <p className="text-gray-600">Gerencie os dados de todos os seus clientes.</p>
            </div>
            <Link to="/clientes/novo">
              <Button className="bg-[#0F3460] hover:bg-[#0F3460]/90 text-white">
                <span className="material-symbols-outlined mr-1">person_add</span>
                Novo Cliente
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
              <h3 className="text-lg font-semibold">Lista de Clientes</h3>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <ClientesList searchTerm={searchTerm} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Clientes;
