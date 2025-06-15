
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { VeiculoForm, VeiculoFormValues } from '../components/veiculos/VeiculoForm';
import { useVeiculosData } from '../hooks/useVeiculosData';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const VeiculoNovo = () => {
  const { addVeiculo } = useVeiculosData();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (data: VeiculoFormValues) => {
    try {
      const novoVeiculo = addVeiculo({
        clienteId: data.clienteId,
        modelo: data.modelo,
        placa: data.placa,
        ano: data.ano,
        cor: data.cor,
      });
      
      toast({
        title: "Veículo cadastrado com sucesso",
        description: `${data.modelo} foi adicionado à base de dados.`,
      });
      
      navigate(`/veiculos/${novoVeiculo.id}`);
    } catch (error) {
      toast({
        title: "Erro ao cadastrar veículo",
        description: "Ocorreu um erro ao tentar cadastrar o veículo.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    navigate('/veiculos');
  };

  return (
    <div id="webcrumbs">
      <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
        <Header />
        <main className="container mx-auto py-6 px-4">
          <div className="mb-6">
            <Link to="/veiculos" className="text-gray-600 hover:text-[#0F3460] flex items-center mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Voltar para lista de veículos
            </Link>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Cadastrar Novo Veículo</h2>
            <p className="text-gray-600">Preencha os dados do veículo para cadastrá-lo no sistema.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <VeiculoForm onSubmit={handleSubmit} onCancel={handleCancel} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default VeiculoNovo;
