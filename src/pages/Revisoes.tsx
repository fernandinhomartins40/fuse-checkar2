
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useRevisoesData } from '../hooks/useRevisoesData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Calendar, 
  Car, 
  Users, 
  Clock,
  AlertTriangle,
  CheckCircle 
} from 'lucide-react';

const Revisoes = () => {
  const navigate = useNavigate();
  const { revisoes, clientes, veiculos } = useRevisoesData();
  const [filtro, setFiltro] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('');

  const revisoesFiltradas = revisoes.filter(revisao => {
    const cliente = clientes.find(c => c.id === revisao.clienteId);
    const veiculo = veiculos.find(v => v.id === revisao.veiculoId);
    
    const matchesFiltro = !filtro || 
      cliente?.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      veiculo?.placa.toLowerCase().includes(filtro.toLowerCase()) ||
      revisao.tipoServico.toLowerCase().includes(filtro.toLowerCase());
    
    const matchesStatus = !statusFiltro || revisao.status === statusFiltro;
    
    return matchesFiltro && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      agendado: 'bg-blue-100 text-blue-800',
      em_andamento: 'bg-yellow-100 text-yellow-800',
      concluido: 'bg-green-100 text-green-800',
      cancelado: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      agendado: 'Agendado',
      em_andamento: 'Em Andamento',
      concluido: 'Concluído',
      cancelado: 'Cancelado'
    };

    return (
      <span className={`px-2 py-1 text-xs rounded-full font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getStatsResumo = () => {
    const agendadas = revisoes.filter(r => r.status === 'agendado').length;
    const emAndamento = revisoes.filter(r => r.status === 'em_andamento').length;
    const concluidas = revisoes.filter(r => r.status === 'concluido').length;
    const recomendacoesPendentes = revisoes.reduce((acc, r) => 
      acc + r.recomendacoes.filter(rec => rec.status === 'pendente').length, 0);
    
    return { agendadas, emAndamento, concluidas, recomendacoesPendentes };
  };

  const stats = getStatsResumo();

  return (
    <div id="webcrumbs">
      <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
        <Header />
        <main className="container mx-auto py-6 px-4">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Gerenciamento de Revisões</h2>
                <p className="text-gray-600">Acompanhe e gerencie todas as revisões realizadas.</p>
              </div>
              <Button 
                onClick={() => navigate('/revisoes/nova')} 
                className="bg-[#0F3460] hover:bg-[#0F3460]/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nova Revisão
              </Button>
            </div>

            {/* Estatísticas Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Agendadas</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.agendadas}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Em Andamento</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.emAndamento}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Concluídas</p>
                    <p className="text-2xl font-bold text-green-600">{stats.concluidas}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Recomendações</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.recomendacoesPendentes}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por cliente, placa ou tipo de serviço..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={statusFiltro}
                  onChange={(e) => setStatusFiltro(e.target.value)}
                >
                  <option value="">Todos os status</option>
                  <option value="agendado">Agendado</option>
                  <option value="em_andamento">Em Andamento</option>
                  <option value="concluido">Concluído</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tabela de Revisões */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente / Veículo</TableHead>
                  <TableHead>Tipo de Serviço</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Quilometragem</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Técnicos</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {revisoesFiltradas.map(revisao => {
                  const cliente = clientes.find(c => c.id === revisao.clienteId);
                  const veiculo = veiculos.find(v => v.id === revisao.veiculoId);
                  
                  return (
                    <TableRow key={revisao.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{cliente?.nome}</p>
                          <p className="text-sm text-gray-500">
                            {veiculo?.marca} {veiculo?.modelo} - {veiculo?.placa}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{revisao.tipoServico}</TableCell>
                      <TableCell>
                        {new Date(revisao.data).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>{revisao.quilometragem.toLocaleString()} km</TableCell>
                      <TableCell>{getStatusBadge(revisao.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {revisao.tecnicos.map((tecnico, index) => (
                            <div key={index}>{tecnico}</div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/revisoes/${revisao.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {revisao.status !== 'concluido' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/revisoes/${revisao.id}/editar`)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {revisoesFiltradas.length === 0 && (
              <div className="text-center py-8">
                <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nenhuma revisão encontrada</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Revisoes;
