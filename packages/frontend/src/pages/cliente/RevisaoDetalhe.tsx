
import React from 'react';
import ClienteHeader from '../../components/ClienteHeader';
import { Link, useParams } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";

const RevisaoDetalhe = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock data - in a real app, this would be fetched from an API
  const revisao = {
    id: Number(id),
    veiculo: {
      id: 1,
      modelo: 'Honda Civic',
      placa: 'ABC-1234',
      ano: 2019
    },
    tipoServico: 'Revisão Completa',
    data: '15/04/2023',
    horaInicio: '09:30',
    horaTermino: '11:45',
    quilometragem: 42500,
    status: 'Concluído',
    recomendacoes: 1,
    tecnicos: ['João Silva', 'Carlos Oliveira'],
    responsavel: 'João Silva',
    itensVerificados: 120,
    itensOk: 119,
    itensNaoOk: 1,
    observacoes: 'Veículo em bom estado geral. Substituído filtro de ar e óleo do motor.',
    categorias: [
      {
        nome: 'Motor e Sistema de Combustível',
        itens: [
          { nome: 'Óleo do motor', status: 'OK', observacao: 'Trocado' },
          { nome: 'Filtro de óleo', status: 'OK', observacao: 'Trocado' },
          { nome: 'Filtro de ar', status: 'OK', observacao: 'Trocado' },
          { nome: 'Filtro de combustível', status: 'OK', observacao: '' },
          { nome: 'Correias', status: 'OK', observacao: '' },
          { nome: 'Mangueiras e conexões', status: 'OK', observacao: '' },
          { nome: 'Sistema de arrefecimento', status: 'OK', observacao: '' },
        ]
      },
      {
        nome: 'Sistema de Freios',
        itens: [
          { nome: 'Pastilhas de freio dianteiras', status: 'Não OK', observacao: 'Desgaste avançado, necessita troca' },
          { nome: 'Pastilhas de freio traseiras', status: 'OK', observacao: '' },
          { nome: 'Discos de freio dianteiros', status: 'OK', observacao: '' },
          { nome: 'Discos de freio traseiros', status: 'OK', observacao: '' },
          { nome: 'Fluido de freio', status: 'OK', observacao: '' },
        ]
      },
      {
        nome: 'Suspensão e Direção',
        itens: [
          { nome: 'Amortecedores dianteiros', status: 'OK', observacao: '' },
          { nome: 'Amortecedores traseiros', status: 'OK', observacao: '' },
          { nome: 'Buchas da suspensão', status: 'OK', observacao: '' },
          { nome: 'Terminais de direção', status: 'OK', observacao: '' },
          { nome: 'Pivôs', status: 'OK', observacao: '' },
        ]
      },
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
                <Link to="/cliente/revisoes" className="text-[#0F3460] hover:text-[#FF5722]">
                  Revisões
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600">Detalhes da Revisão</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{revisao.tipoServico}</h2>
              <p className="text-gray-600">
                {revisao.veiculo.modelo} ({revisao.veiculo.placa}) • {revisao.data}
              </p>
            </div>
            {revisao.recomendacoes > 0 && (
              <div className="mt-4 md:mt-0">
                <Link 
                  to={`/cliente/recomendacoes/${revisao.id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md flex items-center space-x-2"
                >
                  <span className="material-symbols-outlined text-sm">warning</span>
                  <span>Ver Recomendações</span>
                </Link>
              </div>
            )}
          </div>

          {/* Revision Overview */}
          <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Informações da Revisão</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Veículo</h4>
                  <p className="font-medium">{revisao.veiculo.modelo} ({revisao.veiculo.placa})</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Tipo de Serviço</h4>
                  <p className="font-medium">{revisao.tipoServico}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                  <p className="font-medium">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {revisao.status}
                    </span>
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Data</h4>
                  <p className="font-medium">{revisao.data}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Horário</h4>
                  <p className="font-medium">{revisao.horaInicio} às {revisao.horaTermino}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Quilometragem</h4>
                  <p className="font-medium">{revisao.quilometragem} km</p>
                </div>
              </div>

              <Separator className="my-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Responsáveis</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Técnico Responsável</p>
                      <p className="text-sm font-medium">{revisao.responsavel}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Equipe Técnica</p>
                      <p className="text-sm font-medium">{revisao.tecnicos.join(', ')}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Resumo da Revisão</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">Itens Verificados</p>
                      <p className="text-sm font-medium">{revisao.itensVerificados}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">Itens OK</p>
                      <p className="text-sm font-medium text-green-600">{revisao.itensOk}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">Itens Não OK</p>
                      <p className="text-sm font-medium text-red-600">{revisao.itensNaoOk}</p>
                    </div>
                  </div>
                </div>
              </div>

              {revisao.observacoes && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Observações</h4>
                  <p className="text-sm p-3 bg-gray-50 rounded-md border border-gray-100">
                    {revisao.observacoes}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Checklist Details */}
          <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Checklist Detalhado</h3>
            </div>
            <div className="p-4">
              <div className="space-y-8">
                {revisao.categorias.map((categoria, index) => (
                  <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <h4 className="font-medium text-gray-800 mb-4">{categoria.nome}</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-full">
                        <thead>
                          <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <th className="p-2 w-1/2">Item</th>
                            <th className="p-2 w-1/4">Status</th>
                            <th className="p-2 w-1/4">Observação</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {categoria.itens.map((item, itemIndex) => (
                            <tr key={itemIndex} className="hover:bg-gray-50 transition-colors duration-150">
                              <td className="p-2 text-sm">{item.nome}</td>
                              <td className="p-2">
                                <span 
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    item.status === 'OK' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {item.status}
                                </span>
                              </td>
                              <td className="p-2 text-sm text-gray-600">{item.observacao}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
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

export default RevisaoDetalhe;
