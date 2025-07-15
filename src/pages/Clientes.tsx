
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import ClientesList from '../components/clientes/ClientesList';
import { Search, Plus } from 'lucide-react';

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Layout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Clientes</h1>
            <p className="text-muted-foreground mt-1">Gerencie os dados de todos os seus clientes.</p>
          </div>
          <Link to="/clientes/novo">
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Novo Cliente</span>
              <span className="sm:hidden">Novo</span>
            </Button>
          </Link>
        </div>
        
        <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
          <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg font-semibold">Lista de Clientes</h2>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          
          <ClientesList searchTerm={searchTerm} />
        </div>
      </div>
    </Layout>
  );
};

export default Clientes;
