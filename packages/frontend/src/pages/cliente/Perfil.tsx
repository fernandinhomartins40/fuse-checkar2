
import React from 'react';
import ClienteHeader from '../../components/ClienteHeader';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const perfilSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(10, { message: "Telefone inválido" }),
  address: z.string().min(5, { message: "Endereço deve ter pelo menos 5 caracteres" }),
  city: z.string().min(2, { message: "Cidade deve ter pelo menos 2 caracteres" }),
  state: z.string().min(2, { message: "Estado deve ter pelo menos 2 caracteres" }),
  zipCode: z.string().min(5, { message: "CEP inválido" }),
});

const senhaSchema = z.object({
  currentPassword: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
  newPassword: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
  confirmPassword: z.string()
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"],
});

const Perfil = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const perfilForm = useForm<z.infer<typeof perfilSchema>>({
    resolver: zodResolver(perfilSchema),
    defaultValues: {
      name: user?.name || 'João Silva',
      email: user?.email || 'cliente@exemplo.com',
      phone: '(11) 99999-9999',
      address: 'Rua Exemplo, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
    },
  });

  const senhaForm = useForm<z.infer<typeof senhaSchema>>({
    resolver: zodResolver(senhaSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSavePerfil = (data: z.infer<typeof perfilSchema>) => {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso!",
    });
  };

  const onChangePassword = (data: z.infer<typeof senhaSchema>) => {
    toast({
      title: "Senha alterada",
      description: "Sua senha foi alterada com sucesso!",
    });
    
    senhaForm.reset();
  };

  return (
    <div id="webcrumbs">
      <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
        <ClienteHeader />
        
        <main className="container mx-auto py-6 px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Meu Perfil</h2>
            <p className="text-gray-600">Gerencie suas informações pessoais e configurações de conta.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md mb-6">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Informações Pessoais</h3>
                </div>
                <div className="p-6">
                  <Form {...perfilForm}>
                    <form onSubmit={perfilForm.handleSubmit(onSavePerfil)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={perfilForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome Completo</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={perfilForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} disabled />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={perfilForm.control}
                          name="phone"
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
                      </div>

                      <Separator />
                      
                      <h4 className="text-md font-medium">Endereço</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={perfilForm.control}
                          name="address"
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
                          control={perfilForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cidade</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={perfilForm.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Estado</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={perfilForm.control}
                            name="zipCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CEP</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div className="pt-2 flex justify-end">
                        <Button type="submit" className="bg-[#0F3460] hover:bg-[#0F3460]/90">
                          Salvar Alterações
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Alterar Senha</h3>
                </div>
                <div className="p-6">
                  <Form {...senhaForm}>
                    <form onSubmit={senhaForm.handleSubmit(onChangePassword)} className="space-y-6">
                      <FormField
                        control={senhaForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha Atual</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={senhaForm.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nova Senha</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={senhaForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirmar Nova Senha</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="pt-2 flex justify-end">
                        <Button type="submit" className="bg-[#0F3460] hover:bg-[#0F3460]/90">
                          Alterar Senha
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md mb-6">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Minha Conta</h3>
                </div>
                <div className="p-6 text-center">
                  <div className="h-24 w-24 bg-[#0F3460] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-medium">
                    {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'JS'}
                  </div>
                  <h4 className="text-xl font-medium text-gray-800">{user?.name || 'João Silva'}</h4>
                  <p className="text-sm text-gray-500 mb-6">{user?.email || 'cliente@exemplo.com'}</p>
                  
                  <div className="space-y-2 text-sm mb-6">
                    <p className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Membro desde:</span>
                      <span className="font-medium">15/01/2023</span>
                    </p>
                    <p className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Veículos:</span>
                      <span className="font-medium">2</span>
                    </p>
                    <p className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Revisões:</span>
                      <span className="font-medium">5</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <span className="font-medium text-green-600">Ativo</span>
                    </p>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <span className="material-symbols-outlined mr-2">notifications</span>
                      Preferências de Notificação
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <span className="material-symbols-outlined mr-2">security</span>
                      Privacidade e Segurança
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50">
                      <span className="material-symbols-outlined mr-2">logout</span>
                      Sair da Conta
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Suporte</h3>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-600 mb-4">
                    Precisa de ajuda com sua conta ou têm dúvidas sobre os serviços?
                  </p>
                  <Button variant="outline" className="w-full mb-2">
                    <span className="material-symbols-outlined mr-2">help</span>
                    Perguntas Frequentes
                  </Button>
                  <Button className="w-full bg-[#0F3460] hover:bg-[#0F3460]/90">
                    <span className="material-symbols-outlined mr-2">support_agent</span>
                    Contatar Suporte
                  </Button>
                </div>
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

export default Perfil;
