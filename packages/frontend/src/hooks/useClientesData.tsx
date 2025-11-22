
import { useState, useEffect } from 'react';

// Types for client data
export type Veiculo = {
  id: string;
  modelo: string;
  placa: string;
  ano: number;
  cor: string;
};

export type Cliente = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: string;
  dataCadastro: string;
  ativo: boolean;
  veiculos: Veiculo[];
  observacoes: string;
};

// Type for adding a new client (without ID which is generated)
export type NovoCliente = Omit<Cliente, 'id'>;

// Mock data
const clientesMock: Cliente[] = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao.silva@exemplo.com',
    telefone: '(11) 98765-4321',
    cpf: '123.456.789-00',
    endereco: 'Av. Paulista, 1000, São Paulo - SP',
    dataCadastro: '2023-01-15',
    ativo: true,
    veiculos: [
      {
        id: '101',
        modelo: 'Honda Civic',
        placa: 'ABC-1234',
        ano: 2019,
        cor: 'Prata'
      },
      {
        id: '102',
        modelo: 'Toyota Corolla',
        placa: 'DEF-5678',
        ano: 2021,
        cor: 'Preto'
      }
    ],
    observacoes: 'Cliente preferencial'
  },
  {
    id: '2',
    nome: 'Maria Souza',
    email: 'maria.souza@exemplo.com',
    telefone: '(11) 91234-5678',
    cpf: '987.654.321-00',
    endereco: 'Rua Augusta, 500, São Paulo - SP',
    dataCadastro: '2023-02-20',
    ativo: true,
    veiculos: [
      {
        id: '103',
        modelo: 'Jeep Compass',
        placa: 'GHI-9012',
        ano: 2022,
        cor: 'Branco'
      }
    ],
    observacoes: ''
  },
  {
    id: '3',
    nome: 'Pedro Santos',
    email: 'pedro.santos@exemplo.com',
    telefone: '(11) 97654-3210',
    cpf: '456.789.123-00',
    endereco: 'Rua Oscar Freire, 200, São Paulo - SP',
    dataCadastro: '2023-03-10',
    ativo: false,
    veiculos: [],
    observacoes: ''
  },
  {
    id: '4',
    nome: 'Ana Oliveira',
    email: 'ana.oliveira@exemplo.com',
    telefone: '(11) 94321-8765',
    cpf: '321.654.987-00',
    endereco: 'Av. Rebouças, 300, São Paulo - SP',
    dataCadastro: '2023-04-05',
    ativo: true,
    veiculos: [
      {
        id: '104',
        modelo: 'Fiat Pulse',
        placa: 'JKL-3456',
        ano: 2022,
        cor: 'Vermelho'
      }
    ],
    observacoes: ''
  },
  {
    id: '5',
    nome: 'Carlos Pereira',
    email: 'carlos.pereira@exemplo.com',
    telefone: '(11) 98765-1234',
    cpf: '789.123.456-00',
    endereco: 'Rua Teodoro Sampaio, 150, São Paulo - SP',
    dataCadastro: '2023-05-12',
    ativo: true,
    veiculos: [
      {
        id: '105',
        modelo: 'Volkswagen Gol',
        placa: 'MNO-7890',
        ano: 2018,
        cor: 'Azul'
      }
    ],
    observacoes: ''
  },
  {
    id: '6',
    nome: 'Fernanda Lima',
    email: 'fernanda.lima@exemplo.com',
    telefone: '(11) 95678-9012',
    cpf: '234.567.890-00',
    endereco: 'Av. Brigadeiro Faria Lima, 3500, São Paulo - SP',
    dataCadastro: '2023-06-18',
    ativo: true,
    veiculos: [
      {
        id: '106',
        modelo: 'Hyundai HB20',
        placa: 'PQR-1234',
        ano: 2020,
        cor: 'Prata'
      }
    ],
    observacoes: ''
  },
  {
    id: '7',
    nome: 'Roberto Alves',
    email: 'roberto.alves@exemplo.com',
    telefone: '(11) 92345-6789',
    cpf: '890.123.456-00',
    endereco: 'Rua Haddock Lobo, 400, São Paulo - SP',
    dataCadastro: '2023-07-25',
    ativo: false,
    veiculos: [
      {
        id: '107',
        modelo: 'Nissan Kicks',
        placa: 'STU-5678',
        ano: 2021,
        cor: 'Branco'
      }
    ],
    observacoes: 'Prefere atendimento aos sábados'
  },
  {
    id: '8',
    nome: 'Juliana Costa',
    email: 'juliana.costa@exemplo.com',
    telefone: '(11) 96789-0123',
    cpf: '567.890.123-00',
    endereco: 'Av. Santo Amaro, 1000, São Paulo - SP',
    dataCadastro: '2023-08-05',
    ativo: true,
    veiculos: [
      {
        id: '108',
        modelo: 'Chevrolet Onix',
        placa: 'VWX-9012',
        ano: 2022,
        cor: 'Preto'
      }
    ],
    observacoes: ''
  },
  {
    id: '9',
    nome: 'Marcos Ribeiro',
    email: 'marcos.ribeiro@exemplo.com',
    telefone: '(11) 93456-7890',
    cpf: '678.901.234-00',
    endereco: 'Rua Bela Cintra, 200, São Paulo - SP',
    dataCadastro: '2023-09-14',
    ativo: true,
    veiculos: [
      {
        id: '109',
        modelo: 'Renault Kwid',
        placa: 'YZA-3456',
        ano: 2021,
        cor: 'Vermelho'
      }
    ],
    observacoes: ''
  }
];

// Hook for client data management
export const useClientesData = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  
  // Load initial data
  useEffect(() => {
    const savedClientes = localStorage.getItem('checar_clientes');
    if (savedClientes) {
      setClientes(JSON.parse(savedClientes));
    } else {
      setClientes(clientesMock);
      localStorage.setItem('checar_clientes', JSON.stringify(clientesMock));
    }
  }, []);

  // Save changes to localStorage
  const saveClientes = (updatedClientes: Cliente[]) => {
    setClientes(updatedClientes);
    localStorage.setItem('checar_clientes', JSON.stringify(updatedClientes));
  };

  // Get single client by ID
  const getClienteById = (id: string) => {
    return clientes.find(cliente => cliente.id === id);
  };

  // Add new client
  const addCliente = (cliente: NovoCliente): Cliente => {
    const newCliente = {
      ...cliente,
      id: `${Date.now()}`,
    } as Cliente;
    
    saveClientes([...clientes, newCliente]);
    return newCliente;
  };

  // Update client
  const updateCliente = (id: string, updates: Partial<Cliente>) => {
    const updatedClientes = clientes.map(cliente => 
      cliente.id === id ? { ...cliente, ...updates } : cliente
    );
    
    saveClientes(updatedClientes);
  };

  // Delete client
  const deleteCliente = (id: string) => {
    const updatedClientes = clientes.filter(cliente => cliente.id !== id);
    saveClientes(updatedClientes);
  };

  return { 
    clientes, 
    getClienteById, 
    addCliente, 
    updateCliente, 
    deleteCliente 
  };
};
