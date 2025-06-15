
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useVeiculosData } from '../../hooks/useVeiculosData';
import { Search, Car, Edit, Trash2, Plus, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export const VeiculosList = () => {
  const { veiculos, deleteVeiculo } = useVeiculosData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');

  // Filtrar veículos
  const veiculosFiltrados = veiculos.filter(veiculo => {
    const matchesSearch = 
      veiculo.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      veiculo.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      veiculo.clienteNome.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = 
      statusFilter === 'todos' ||
      (statusFilter === 'ativos' && veiculo.clienteAtivo) ||
      (statusFilter === 'inativos' && !veiculo.clienteAtivo);

    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string, modelo: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o veículo ${modelo}?`)) {
      deleteVeiculo(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Lista de Veículos</h3>
          <p className="text-sm text-gray-600">{veiculosFiltrados.length} veículos encontrados</p>
        </div>
        <Link to="/veiculos/novo">
          <Button className="bg-[#0F3460] hover:bg-[#0F3460]/90">
            <Plus className="h-4 w-4 mr-2" />
            Novo Veículo
          </Button>
        </Link>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por modelo, placa ou cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status do cliente" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="ativos">Clientes Ativos</SelectItem>
            <SelectItem value="inativos">Clientes Inativos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Veículos */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {veiculosFiltrados.length === 0 ? (
          <div className="p-8 text-center">
            <Car className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum veículo encontrado</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || statusFilter !== 'todos' 
                ? 'Tente ajustar os filtros de busca.'
                : 'Comece cadastrando o primeiro veículo.'
              }
            </p>
            {!searchTerm && statusFilter === 'todos' && (
              <Link to="/veiculos/novo">
                <Button className="bg-[#0F3460] hover:bg-[#0F3460]/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Cadastrar Primeiro Veículo
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Veículo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Detalhes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {veiculosFiltrados.map((veiculo) => (
                  <tr key={veiculo.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-[#0F3460] bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                          <Car className="h-5 w-5 text-[#0F3460]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{veiculo.modelo}</p>
                          <p className="text-sm text-gray-500">Placa: {veiculo.placa}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{veiculo.clienteNome}</p>
                        <p className="text-sm text-gray-500">{veiculo.clienteEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-900">Ano: {veiculo.ano}</p>
                        <p className="text-sm text-gray-500">Cor: {veiculo.cor}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          veiculo.clienteAtivo
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {veiculo.clienteAtivo ? 'Cliente Ativo' : 'Cliente Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/veiculos/${veiculo.id}`}
                          className="p-2 text-gray-500 hover:text-[#0F3460] transition-colors duration-200"
                          title="Ver detalhes"
                        >
                          <Car className="h-4 w-4" />
                        </Link>
                        <Link
                          to={`/veiculos/${veiculo.id}/editar`}
                          className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                          title="Editar veículo"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(veiculo.id, veiculo.modelo)}
                          className="p-2 text-gray-500 hover:text-red-600 transition-colors duration-200"
                          title="Excluir veículo"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
