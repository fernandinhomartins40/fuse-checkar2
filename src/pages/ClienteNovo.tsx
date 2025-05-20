
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { ClienteForm, ClienteFormValues } from '../components/clientes/ClienteForm';
import { useToast } from "@/hooks/use-toast";
import { useClientesData } from '../hooks/useClientesData';
import { ArrowLeft } from 'lucide-react';

const ClienteNovo = () => {
  const { addCliente } = useClientesData();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (data: ClienteFormValues) => {
    try {
      // Create a new client with all required fields
      const newCliente = addCliente({
        ...data,
        dataCadastro: new Date().toISOString().split('T')[0],
        ativo: true,
        veiculos: [], 
        // Make sure observacoes is defined even if empty
        observacoes: data.observacoes || "",
      });
      
      toast({
        title: "Cliente cadastrado com sucesso",
        description: `${data.nome} foi adicionado à sua base de clientes.`,
      });
      
      navigate(`/clientes/${newCliente.id}`);
    } catch (error) {
      toast({
        title: "Erro ao cadastrar cliente",
        description: "Ocorreu um erro ao tentar cadastrar o cliente.",
        variant: "destructive",
      });
    }
  };

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
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Cadastrar Novo Cliente</h2>
            <p className="text-gray-600">Preencha os dados do cliente para cadastrá-lo no sistema.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <ClienteForm onSubmit={handleSubmit} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClienteNovo;
