
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { RevisaoForm } from '../components/revisoes/RevisaoForm';
import { useRevisoesData } from '../hooks/useRevisoesData';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const RevisaoNova = () => {
  const { addRevisao } = useRevisoesData();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (revisaoData: any) => {
    try {
      const novaRevisao = addRevisao(revisaoData);
      
      toast({
        title: "Revisão criada com sucesso",
        description: "A revisão foi agendada e está pronta para ser executada.",
      });
      
      navigate(`/revisoes/${novaRevisao.id}`);
    } catch (error) {
      toast({
        title: "Erro ao criar revisão",
        description: "Ocorreu um erro ao tentar criar a revisão.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    navigate('/revisoes');
  };

  return (
    <div id="webcrumbs">
      <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
        <Header />
        <main className="container mx-auto py-6 px-4">
          <div className="mb-6">
            <Link to="/revisoes" className="text-gray-600 hover:text-[#0F3460] flex items-center mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Voltar para lista de revisões
            </Link>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Nova Revisão</h2>
            <p className="text-gray-600">Crie uma nova revisão para um veículo cliente.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <RevisaoForm onSubmit={handleSubmit} onCancel={handleCancel} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default RevisaoNova;
