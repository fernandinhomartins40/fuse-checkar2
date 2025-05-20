
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from "@/components/ui/button";
import { Cliente, useClientesData } from '../hooks/useClientesData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Pencil } from 'lucide-react';

const ClienteDetalhe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getClienteById, updateCliente } = useClientesData();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const foundCliente = getClienteById(id);
      if (foundCliente) {
        setCliente(foundCliente);
      } else {
        toast({
          title: "Cliente não encontrado",
          description: "O cliente que você está procurando não existe.",
          variant: "destructive",
        });
        navigate('/clientes');
      }
    }
    setLoading(false);
  }, [id, getClienteById, navigate, toast]);

  const handleStatusToggle = () => {
    if (cliente) {
      const newStatus = !cliente.ativo;
      updateCliente(cliente.id, { ativo: newStatus });
      setCliente({ ...cliente, ativo: newStatus });
      
      toast({
        title: newStatus ? "Cliente ativado" : "Cliente desativado",
        description: `O status do cliente foi alterado com sucesso.`,
      });
    }
  };

  if (loading) {
    return (
      <div id="webcrumbs">
        <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
          <Header />
          <main className="container mx-auto py-6 px-4">
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">Carregando dados do cliente...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!cliente) {
    return (
      <div id="webcrumbs">
        <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
          <Header />
          <main className="container mx-auto py-6 px-4">
            <div className="flex flex-col items-center justify-center h-64">
              <p className="text-gray-500 mb-4">Cliente não encontrado</p>
              <Button onClick={() => navigate('/clientes')}>Voltar para lista de clientes</Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div id="webcrumbs">
      <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
        <Header />
        <main className="container mx-auto py-6 px-4">
          <div className="mb-6">
            <Link to="/clientes" className="text-gray-600 hover:text-[#0F3460] flex items-center mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Voltar para lista de clientes
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{cliente.nome}</h2>
                <p className="text-gray-600">Cliente desde {new Date(cliente.dataCadastro).toLocaleDateString('pt-BR')}</p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className={`${cliente.ativo ? 'hover:bg-red-50 hover:text-red-700' : 'hover:bg-green-50 hover:text-green-700'}`}
                  onClick={handleStatusToggle}
                >
                  {cliente.ativo ? 'Desativar' : 'Ativar'} Cliente
                </Button>
                <Link to={`/clientes/${cliente.id}/editar`}>
                  <Button>
                    <Pencil className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Informações do Cliente */}
            <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Informações do Cliente</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    cliente.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {cliente.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{cliente.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Telefone</p>
                  <p className="font-medium">{cliente.telefone}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">CPF</p>
                  <p className="font-medium">{cliente.cpf}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Endereço</p>
                  <p className="font-medium">{cliente.endereco}</p>
                </div>
                
                {cliente.observacoes && (
                  <div>
                    <p className="text-sm text-gray-500">Observações</p>
                    <p className="text-sm">{cliente.observacoes}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Veículos do Cliente */}
            <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Veículos do Cliente</h3>
                <Link to={`/veiculos/novo?cliente=${cliente.id}`}>
                  <Button size="sm" className="bg-[#0F3460] hover:bg-[#0F3460]/90">
                    <span className="material-symbols-outlined text-sm mr-1">directions_car</span>
                    Adicionar Veículo
                  </Button>
                </Link>
              </div>
              
              {cliente.veiculos.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Modelo</TableHead>
                      <TableHead>Placa</TableHead>
                      <TableHead className="hidden md:table-cell">Ano</TableHead>
                      <TableHead className="hidden md:table-cell">Cor</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cliente.veiculos.map((veiculo) => (
                      <TableRow key={veiculo.id}>
                        <TableCell className="font-medium">{veiculo.modelo}</TableCell>
                        <TableCell>{veiculo.placa}</TableCell>
                        <TableCell className="hidden md:table-cell">{veiculo.ano}</TableCell>
                        <TableCell className="hidden md:table-cell">{veiculo.cor}</TableCell>
                        <TableCell className="text-right">
                          <Link to={`/veiculos/${veiculo.id}`}>
                            <Button variant="ghost" size="sm">
                              Detalhes
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-gray-500 mb-4">Este cliente não possui veículos cadastrados</p>
                  <Link to={`/veiculos/novo?cliente=${cliente.id}`}>
                    <Button size="sm" className="bg-[#0F3460] hover:bg-[#0F3460]/90">
                      Adicionar Primeiro Veículo
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClienteDetalhe;
