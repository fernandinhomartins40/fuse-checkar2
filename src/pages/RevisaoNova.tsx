
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { RevisaoForm } from '../components/revisoes/RevisaoForm';
import { useRevisoesData } from '../hooks/useRevisoesData';
import { Revisao } from '../types/revisoes';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RevisaoNova = () => {
  const { addRevisao } = useRevisoesData();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (revisaoData: Omit<Revisao, 'id'>) => {
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
    <Layout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link to="/revisoes">
              <Button variant="ghost" className="mb-4 p-0 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Voltar para revisões
              </Button>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Nova Revisão</h1>
            <p className="text-muted-foreground mt-1">Crie uma nova revisão para um veículo cliente.</p>
          </div>
        </div>
        
        <div className="bg-card rounded-lg border shadow-sm p-4 md:p-6">
          <RevisaoForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </div>
      </div>
    </Layout>
  );
};

export default RevisaoNova;
