import { useState, useEffect } from 'react';
import { Revisao, Cliente, Veiculo } from '../types/revisoes';
import { checklistTemplate } from '../data/checklistTemplate';

// Mock data para demonstração
const mockClientes: Cliente[] = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao@email.com',
    telefone: '(11) 98765-4321',
    cpf: '123.456.789-00'
  },
  {
    id: '2',
    nome: 'Maria Santos',
    email: 'maria@email.com',
    telefone: '(11) 87654-3210',
    cpf: '987.654.321-00'
  }
];

const mockVeiculos: Veiculo[] = [
  {
    id: '1',
    clienteId: '1',
    marca: 'Honda',
    modelo: 'Civic',
    ano: 2018,
    placa: 'ABC-1234',
    chassi: '1HGBH41JXMN109186',
    cor: 'Prata',
    quilometragem: 45000
  },
  {
    id: '2',
    clienteId: '2',
    marca: 'Jeep',
    modelo: 'Compass',
    ano: 2020,
    placa: 'DEF-5678',
    chassi: '1C4NJDEB2KD123456',
    cor: 'Branco',
    quilometragem: 18000
  },
  {
    id: '101',
    clienteId: '1',
    marca: 'Honda',
    modelo: 'Civic',
    ano: 2019,
    placa: 'ABC-1234',
    chassi: '1HGBH41JXMN109187',
    cor: 'Prata',
    quilometragem: 45000
  },
  {
    id: '102',
    clienteId: '1',
    marca: 'Toyota',
    modelo: 'Corolla',
    ano: 2021,
    placa: 'DEF-5678',
    chassi: '1HGBH41JXMN109188',
    cor: 'Preto',
    quilometragem: 25000
  },
  {
    id: '103',
    clienteId: '2',
    marca: 'Jeep',
    modelo: 'Compass',
    ano: 2022,
    placa: 'GHI-9012',
    chassi: '1HGBH41JXMN109189',
    cor: 'Branco',
    quilometragem: 12000
  }
];

const mockRevisoes: Revisao[] = [
  {
    id: '1',
    clienteId: '1',
    veiculoId: '1',
    tipoServico: 'Revisão Completa',
    data: '2023-11-15',
    quilometragem: 45000,
    status: 'concluido',
    tecnicos: ['João Silva', 'Carlos Oliveira'],
    checklist: checklistTemplate.map(categoria => ({
      ...categoria,
      itens: categoria.itens.map(item => ({
        ...item,
        status: Math.random() > 0.1 ? 'ok' : 'nao_ok' as any
      }))
    })),
    observacoes: 'Revisão completa realizada conforme programação.',
    recomendacoes: [
      {
        id: '1',
        item: 'Pastilhas de freio',
        descricao: 'Pastilhas de freio com 30% de desgaste, recomenda-se troca em 5.000 km',
        prioridade: 'media',
        custoEstimado: 350,
        prazoRecomendado: '30 dias',
        status: 'pendente'
      }
    ],
    custoEstimado: 450,
    tempoEstimado: 120,
    proximaRevisao: {
      data: '2024-05-15',
      quilometragem: 55000,
      tipo: 'Revisão Programada'
    }
  }
];

export const useRevisoesData = () => {
  const [revisoes, setRevisoes] = useState<Revisao[]>(mockRevisoes);
  const [clientes] = useState<Cliente[]>(mockClientes);
  const [veiculos] = useState<Veiculo[]>(mockVeiculos);

  const addRevisao = (novaRevisao: Omit<Revisao, 'id'>) => {
    const revisao: Revisao = {
      ...novaRevisao,
      id: Date.now().toString(),
    };
    setRevisoes(prev => [...prev, revisao]);
    return revisao;
  };

  const updateRevisao = (id: string, dadosAtualizados: Partial<Revisao>) => {
    setRevisoes(prev =>
      prev.map(revisao =>
        revisao.id === id ? { ...revisao, ...dadosAtualizados } : revisao
      )
    );
  };

  const getRevisaoById = (id: string) => {
    return revisoes.find(revisao => revisao.id === id);
  };

  const getClienteById = (id: string) => {
    return clientes.find(cliente => cliente.id === id);
  };

  const getVeiculoById = (id: string) => {
    return veiculos.find(veiculo => veiculo.id === id);
  };

  const getRevisoesByCliente = (clienteId: string) => {
    return revisoes.filter(revisao => revisao.clienteId === clienteId);
  };

  const getRevisoesByVeiculo = (veiculoId: string) => {
    return revisoes.filter(revisao => revisao.veiculoId === veiculoId);
  };

  const getVeiculosByClienteId = (clienteId: string) => {
    return veiculos.filter(veiculo => veiculo.clienteId === clienteId);
  };

  return {
    revisoes,
    clientes,
    veiculos,
    addRevisao,
    updateRevisao,
    getRevisaoById,
    getClienteById,
    getVeiculoById,
    getRevisoesByCliente,
    getRevisoesByVeiculo,
    getVeiculosByClienteId,
  };
};
