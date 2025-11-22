
import React from 'react';
import ClienteHeader from '../../components/ClienteHeader';
import { Link, useParams } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const RecomendacaoDetalhe = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock data - in a real app, this would be fetched from an API
  const recomendacao = {
    id: 1,
    revisao: {
      id: 1,
      data: '15/04/2023',
      tipoServico: 'Revisão Completa'
    },
    veiculo: {
      id: 1,
      modelo: 'Honda Civic',
      placa: 'ABC-1234',
      ano: 2019
    },
    item: 'Pastilhas de freio dianteiras',
    categoria: 'Sistema de Freios',
    prioridade: 'Alta',
    descricao: 'Substituição necessária devido ao desgaste avançado, abaixo do limite mínimo seguro.',
    diagnostico: 'Durante a inspeção, foi constatado que as pastilhas de freio dianteiras apresentam desgaste superior a 90%, estando abaixo do limite mínimo de segurança recomendado pelo fabricante. Isso pode comprometer a eficiência da frenagem do veículo, aumentando a distância de parada e podendo causar ruídos durante a frenagem.',
    recomendacao: 'Recomendamos a substituição das pastilhas de freio dianteiras com urgência para garantir a segurança do veículo. Também é aconselhável verificar os discos de freio quanto a possíveis danos ou desgastes irregulares durante a substituição.',
    riscos: 'Não atender esta recomendação pode comprometer a segurança do veículo, aumentar a distância de frenagem e, em casos extremos, causar falha no sistema de freios. Pode também levar a danos nos discos de freio, aumentando o custo de reparo futuro.',
    prazo: '30 dias',
    priorizado: '15 dias',
    status: 'Pendente',
    custo: 'R$ 280,00 a R$ 350,00',
    tempo: 'Aproximadamente 1 hora',
    tecnico: 'João Silva',
    data: '15/04/2023',
    imagens: [
      { url: 'https://via.placeholder.com/300x200', descricao: 'Pastilha com desgaste avançado' },
      { url: 'https://via.placeholder.com/300x200', descricao: 'Comparativo com pastilha nova' },
    ]
  };

  return (
    <div id="webcrumbs">
      <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
        <ClienteHeader />
        
        <main className="container mx-auto py-6 px-4">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Link to="/cliente/recomendacoes" className="text-[#0F3460] hover:text-[#FF5722]">
                  Recomendações
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600">Detalhes da Recomendação</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{recomendacao.item}</h2>
              <p className="text-gray-600">
                {recomendacao.veiculo.modelo} ({recomendacao.veiculo.placa}) • {recomendacao.revisao.data}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link 
                to={`/cliente/agendar?recomendacao=${recomendacao.id}`}
                className="bg-[#0F3460] hover:bg-[#0F3460]/90 text-white py-2 px-4 rounded-md flex items-center space-x-2"
              >
                <span className="material-symbols-outlined text-sm">calendar_add_on</span>
                <span>Agendar Serviço</span>
              </Link>
            </div>
          </div>

          {/* Recommendation Details */}
          <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Detalhes da Recomendação</h3>
              <span 
                className={`px-3 py-1 text-xs rounded-full ${
                  recomendacao.prioridade === 'Alta' 
                    ? 'bg-red-200 text-red-800' 
                    : recomendacao.prioridade === 'Média'
                      ? 'bg-yellow-200 text-yellow-800'
                      : 'bg-blue-200 text-blue-800'
                }`}
              >
                Prioridade {recomendacao.prioridade}
              </span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Veículo</h4>
                  <p className="font-medium">
                    <Link to={`/cliente/veiculos/${recomendacao.veiculo.id}`} className="text-[#0F3460] hover:text-[#FF5722]">
                      {recomendacao.veiculo.modelo} ({recomendacao.veiculo.placa})
                    </Link>
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Categoria</h4>
                  <p className="font-medium">{recomendacao.categoria}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                  <p className="font-medium">
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                      {recomendacao.status}
                    </span>
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Prazo Recomendado</h4>
                  <p className="font-medium">{recomendacao.prazo}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Prazo Priorizado</h4>
                  <p className="font-medium">{recomendacao.priorizado}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Custo Estimado</h4>
                  <p className="font-medium">{recomendacao.custo}</p>
                </div>
              </div>

              <Separator className="my-6" />
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Descrição</h4>
                  <p className="text-sm p-3 bg-gray-50 rounded-md border border-gray-100">
                    {recomendacao.descricao}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Diagnóstico</h4>
                  <p className="text-sm p-3 bg-gray-50 rounded-md border border-gray-100">
                    {recomendacao.diagnostico}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Recomendação Técnica</h4>
                  <p className="text-sm p-3 bg-gray-50 rounded-md border border-gray-100">
                    {recomendacao.recomendacao}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Riscos de Não Atendimento</h4>
                  <p className="text-sm p-3 bg-red-50 rounded-md border border-red-100 text-red-800">
                    {recomendacao.riscos}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Informações Adicionais</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Tempo Estimado de Serviço</p>
                      <p className="text-sm font-medium">{recomendacao.tempo}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Técnico Responsável</p>
                      <p className="text-sm font-medium">{recomendacao.tecnico}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Data do Diagnóstico</p>
                      <p className="text-sm font-medium">{recomendacao.data}</p>
                    </div>
                  </div>
                </div>
                
                {recomendacao.imagens && recomendacao.imagens.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Imagens de Referência</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {recomendacao.imagens.map((imagem, index) => (
                        <div key={index} className="overflow-hidden rounded-md border border-gray-200">
                          <img 
                            src={imagem.url} 
                            alt={imagem.descricao} 
                            className="w-full h-40 object-cover"
                          />
                          <p className="text-xs p-2 bg-gray-50 text-gray-600">{imagem.descricao}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/cliente/revisoes/1">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <span className="material-symbols-outlined text-sm mr-2">visibility</span>
                    Ver Revisão Completa
                  </Button>
                </Link>
                <Link to={`/cliente/agendar?recomendacao=${recomendacao.id}`}>
                  <Button className="w-full sm:w-auto bg-[#0F3460] hover:bg-[#0F3460]/90">
                    <span className="material-symbols-outlined text-sm mr-2">calendar_add_on</span>
                    Agendar Serviço
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <footer className="mt-8 text-center py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">© 2023 CHECAR - Sistema de Revisão para Auto Centers</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default RecomendacaoDetalhe;
