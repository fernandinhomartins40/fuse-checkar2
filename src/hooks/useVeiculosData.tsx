
import { useState, useEffect } from 'react';
import { useClientesData, Veiculo as VeiculoCliente } from './useClientesData';

// Estender o tipo Veiculo para incluir dados do cliente
export interface VeiculoCompleto extends VeiculoCliente {
  clienteNome: string;
  clienteEmail: string;
  clienteTelefone: string;
  clienteAtivo: boolean;
}

export interface NovoVeiculo {
  clienteId: string;
  modelo: string;
  placa: string;
  ano: number;
  cor: string;
}

export const useVeiculosData = () => {
  const { clientes, updateCliente } = useClientesData();
  const [veiculos, setVeiculos] = useState<VeiculoCompleto[]>([]);

  // Atualizar lista de veículos quando clientes mudarem
  useEffect(() => {
    const todosVeiculos: VeiculoCompleto[] = [];
    
    clientes.forEach(cliente => {
      cliente.veiculos.forEach(veiculo => {
        todosVeiculos.push({
          ...veiculo,
          clienteNome: cliente.nome,
          clienteEmail: cliente.email,
          clienteTelefone: cliente.telefone,
          clienteAtivo: cliente.ativo,
        });
      });
    });
    
    setVeiculos(todosVeiculos);
  }, [clientes]);

  // Obter veículo por ID
  const getVeiculoById = (id: string): VeiculoCompleto | undefined => {
    return veiculos.find(veiculo => veiculo.id === id);
  };

  // Obter veículos por cliente
  const getVeiculosByCliente = (clienteId: string): VeiculoCompleto[] => {
    return veiculos.filter(veiculo => {
      const cliente = clientes.find(c => c.id === clienteId);
      return cliente?.veiculos.some(v => v.id === veiculo.id);
    });
  };

  // Adicionar novo veículo
  const addVeiculo = (novoVeiculo: NovoVeiculo): VeiculoCompleto => {
    const cliente = clientes.find(c => c.id === novoVeiculo.clienteId);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    const veiculo: VeiculoCliente = {
      id: `${Date.now()}`,
      modelo: novoVeiculo.modelo,
      placa: novoVeiculo.placa,
      ano: novoVeiculo.ano,
      cor: novoVeiculo.cor,
    };

    const veiculosAtualizados = [...cliente.veiculos, veiculo];
    updateCliente(cliente.id, { veiculos: veiculosAtualizados });

    return {
      ...veiculo,
      clienteNome: cliente.nome,
      clienteEmail: cliente.email,
      clienteTelefone: cliente.telefone,
      clienteAtivo: cliente.ativo,
    };
  };

  // Atualizar veículo
  const updateVeiculo = (veiculoId: string, updates: Partial<VeiculoCliente>) => {
    const veiculo = getVeiculoById(veiculoId);
    if (!veiculo) {
      throw new Error('Veículo não encontrado');
    }

    const cliente = clientes.find(c => 
      c.veiculos.some(v => v.id === veiculoId)
    );
    
    if (!cliente) {
      throw new Error('Cliente do veículo não encontrado');
    }

    const veiculosAtualizados = cliente.veiculos.map(v =>
      v.id === veiculoId ? { ...v, ...updates } : v
    );

    updateCliente(cliente.id, { veiculos: veiculosAtualizados });
  };

  // Remover veículo
  const deleteVeiculo = (veiculoId: string) => {
    const cliente = clientes.find(c => 
      c.veiculos.some(v => v.id === veiculoId)
    );
    
    if (!cliente) {
      throw new Error('Cliente do veículo não encontrado');
    }

    const veiculosAtualizados = cliente.veiculos.filter(v => v.id !== veiculoId);
    updateCliente(cliente.id, { veiculos: veiculosAtualizados });
  };

  // Obter estatísticas
  const getEstatisticas = () => {
    const total = veiculos.length;
    const ativos = veiculos.filter(v => v.clienteAtivo).length;
    const inativos = total - ativos;
    
    // Agrupar por modelo
    const modelosCount = veiculos.reduce((acc, veiculo) => {
      acc[veiculo.modelo] = (acc[veiculo.modelo] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const modeloMaisComum = Object.entries(modelosCount)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

    return {
      total,
      ativos,
      inativos,
      modeloMaisComum,
    };
  };

  return {
    veiculos,
    getVeiculoById,
    getVeiculosByCliente,
    addVeiculo,
    updateVeiculo,
    deleteVeiculo,
    getEstatisticas,
  };
};
