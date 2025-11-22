import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClientes } from '@/services/api';
import type { Cliente, NovoCliente } from './useClientesData';

// Hook para listar todos os clientes
export const useClientes = () => {
  return useQuery({
    queryKey: ['clientes'],
    queryFn: async () => {
      const response = await apiClientes.listar();
      return response.data as Cliente[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

// Hook para buscar um cliente específico
export const useCliente = (id: number) => {
  return useQuery({
    queryKey: ['cliente', id],
    queryFn: async () => {
      const response = await apiClientes.buscarPorId(id);
      return response.data as Cliente;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook para criar um novo cliente
export const useCreateCliente = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (novoCliente: NovoCliente) => {
      const response = await apiClientes.criar(novoCliente);
      return response.data as Cliente;
    },
    onSuccess: () => {
      // Invalida a cache para recarregar a lista
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
    },
  });
};

// Hook para atualizar um cliente
export const useUpdateCliente = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, dados }: { id: number; dados: Partial<Cliente> }) => {
      const response = await apiClientes.atualizar(id, dados);
      return response.data as Cliente;
    },
    onSuccess: (_, variables) => {
      // Invalida a cache específica do cliente e a lista geral
      queryClient.invalidateQueries({ queryKey: ['cliente', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
    },
  });
};

// Hook para remover um cliente
export const useDeleteCliente = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClientes.remover(id);
      return id;
    },
    onSuccess: (id) => {
      // Remove da cache e invalida a lista
      queryClient.removeQueries({ queryKey: ['cliente', id] });
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
    },
  });
};

// Exemplo de uso:
//
// Em um componente:
// import { useClientes, useCreateCliente } from '@/hooks/useClientesApi';
//
// function ClientesList() {
//   const { data: clientes, isLoading, error } = useClientes();
//   const createCliente = useCreateCliente();
//
//   const handleCreate = async (dados: NovoCliente) => {
//     try {
//       await createCliente.mutateAsync(dados);
//       alert('Cliente criado com sucesso!');
//     } catch (error) {
//       alert('Erro ao criar cliente: ' + error.message);
//     }
//   };
//
//   if (isLoading) return <div>Carregando...</div>;
//   if (error) return <div>Erro: {error.message}</div>;
//
//   return (
//     <div>
//       {clientes?.map(cliente => (
//         <div key={cliente.id}>{cliente.nome}</div>
//       ))}
//     </div>
//   );
// }