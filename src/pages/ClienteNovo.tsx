
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

const ClienteNovo = () => {
  const { addCliente } = useClientesData();
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

  const onSubmit = (data: FormValues) => {
    try {
      const newCliente = addCliente({
        ...data,
        ativo: true,
        veiculos: [],
      });
      
      toast({
        title: "Cliente cadastrado com sucesso",
        description: `${data.nome} foi adicionado à sua base de clientes.`,
      });
      
      navigate(`/clientes/${newCliente.id}`);
    } catch (error) {
      toast({
        title: "Erro ao cadastrar cliente",
        description: "Ocorreu um erro ao tentar cadastrar o cliente.",
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
            <Link to="/clientes" className="text-gray-600 hover:text-[#0F3460] flex items-center mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Voltar para lista de clientes
            </Link>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Cadastrar Novo Cliente</h2>
            <p className="text-gray-600">Preencha os dados do cliente para cadastrá-lo no sistema.</p>
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
                          <Input placeholder="João da Silva" {...field} />
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
                          <Input type="email" placeholder="cliente@exemplo.com" {...field} />
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
                          <Input placeholder="(11) 98765-4321" {...field} />
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
                          <Input placeholder="123.456.789-00" {...field} />
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
                          <Input placeholder="Av. Paulista, 1000, São Paulo - SP" {...field} />
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
                            placeholder="Informações adicionais sobre o cliente..."
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
                  <Button type="button" variant="outline" onClick={() => navigate('/clientes')}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-[#0F3460] hover:bg-[#0F3460]/90">
                    Cadastrar Cliente
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

export default ClienteNovo;
