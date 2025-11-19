
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { VeiculoForm, VeiculoFormValues } from '../components/veiculos/VeiculoForm';
import { useVeiculosData } from '../hooks/useVeiculosData';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const VeiculoEditar = () => {
  const { id } = useParams<{ id: string }>();
  const { getVeiculoById, updateVeiculo } = useVeiculosData();
  const navigate = useNavigate();
  const { toast } = useToast();

  const veiculo = id ? getVeiculoById(id) : null;

  if (!veiculo) {
    return (
      <div id="webcrumbs">
        <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
          <Header />
          <main className="container mx-auto py-6 px-4">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Veículo não encontrado</h2>
              <p className="text-gray-600 mb-4">O veículo que você está tentando editar não existe.</p>
              <Link to="/veiculos">
                <button className="bg-[#0F3460] text-white px-4 py-2 rounded-lg hover:bg-[#0F3460]/90 transition-colors">
                  Voltar para lista de veículos
                </button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const handleSubmit = (data: VeiculoFormValues) => {
    try {
      updateVeiculo(veiculo.id, {
        modelo: data.modelo,
        placa: data.placa,
        ano: data.ano,
        cor: data.cor,
      });
      
      toast({
        title: "Veículo atualizado com sucesso",
        description: `As informações do ${data.modelo} foram atualizadas.`,
      });
      
      navigate(`/veiculos/${veiculo.id}`);
    } catch (error) {
      toast({
        title: "Erro ao atualizar veículo",
        description: "Ocorreu um erro ao tentar atualizar o veículo.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    navigate(`/veiculos/${veiculo.id}`);
  };

  const initialData = {
    clienteId: veiculo.clienteNome, // For display only, will be disabled
    modelo: veiculo.modelo,
    placa: veiculo.placa,
    ano: veiculo.ano,
    cor: veiculo.cor,
  };

  return (
    <div id="webcrumbs">
      <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
        <Header />
        <main className="container mx-auto py-6 px-4">
          <div className="mb-6">
            <Link to={`/veiculos/${veiculo.id}`} className="text-gray-600 hover:text-[#0F3460] flex items-center mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Voltar para detalhes do veículo
            </Link>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Editar Veículo</h2>
            <p className="text-gray-600">Atualize as informações do veículo {veiculo.modelo}.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Informação do cliente (não editável) */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Cliente Proprietário</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Nome:</span>
                  <span className="ml-2 font-medium">{veiculo.clienteNome}</span>
                </div>
                <div>
                  <span className="text-gray-500">Email:</span>
                  <span className="ml-2 font-medium">{veiculo.clienteEmail}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Para alterar o proprietário do veículo, entre em contato com o administrador.
              </p>
            </div>

            <VeiculoForm 
              onSubmit={handleSubmit} 
              onCancel={handleCancel}
              initialData={initialData}
              isEditing={true}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default VeiculoEditar;
