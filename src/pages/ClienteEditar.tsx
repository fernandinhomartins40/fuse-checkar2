
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useClientesData } from '../hooks/useClientesData';
import { ArrowLeft } from 'lucide-react';

const clienteSchema = z.object({
  nome: z.string().min(3, {
    message: "Nome deve ter pelo menos 3 caracteres.",
  }),
  email: z.string().email({
    message: "Email inválido.",
  }),
  telefone: z.string().min(8, {
    message: "Telefone deve ter pelo menos 8 caracteres.",
  }),
  cpf: z.string().min(11, {
    message: "CPF inválido.",
  }),
  endereco: z.string().min(5, {
    message: "Endereço deve ter pelo menos 5 caracteres.",
  }),
  observacoes: z.string().optional(),
});

type FormValues = z.infer<typeof clienteSchema>;

const ClienteEditar = () => {
  const { id } = useParams<{ id: string }>();
  const { getClienteById, updateCliente } = useClientesData();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      cpf: "",
      endereco: "",
      observacoes: "",
    },
  });

  useEffect(() => {
    if (id) {
      const cliente = getClienteById(id);
      if (cliente) {
        form.reset({
          nome: cliente.nome,
          email: cliente.email,
          telefone: cliente.telefone,
          cpf: cliente.cpf,
          endereco: cliente.endereco,
          observacoes: cliente.observacoes || "",
        });
      } else {
        toast({
          title: "Cliente não encontrado",
          description: "O cliente que você está procurando não existe.",
          variant: "destructive",
        });
        navigate('/clientes');
      }
    }
  }, [id, getClienteById, form, navigate, toast]);

  const onSubmit = (data: FormValues) => {
    if (!id) return;
    
    try {
      updateCliente(id, data);
      
      toast({
        title: "Cliente atualizado com sucesso",
        description: `Os dados de ${data.nome} foram atualizados.`,
      });
      
      navigate(`/clientes/${id}`);
    } catch (error) {
      toast({
        title: "Erro ao atualizar cliente",
        description: "Ocorreu um erro ao tentar atualizar os dados do cliente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div id="webcrumbs">
      <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
        <Header />
        <main className="container mx-auto py-6 px-4">
          <div className="mb-6">
            <Link to={`/clientes/${id}`} className="text-gray-600 hover:text-[#0F3460] flex items-center mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Voltar para detalhes do cliente
            </Link>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Editar Cliente</h2>
            <p className="text-gray-600">Atualize os dados do cliente conforme necessário.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome completo</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="telefone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="endereco"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="observacoes"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Observações</FormLabel>
                        <FormControl>
                          <Textarea 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-end gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => navigate(`/clientes/${id}`)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-[#0F3460] hover:bg-[#0F3460]/90">
                    Salvar Alterações
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClienteEditar;
