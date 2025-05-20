
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
});

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    // Mock authentication - in a real app, this would call an API
    // For demo purposes, we're just checking for a specific email/password
    if (data.email === "cliente@exemplo.com" && data.password === "123456") {
      // Store user info in localStorage (in a real app, use proper auth tokens)
      localStorage.setItem("clienteAuth", JSON.stringify({
        isAuthenticated: true,
        user: {
          id: "1",
          name: "João Silva",
          email: data.email,
          role: "cliente"
        }
      }));
      
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo de volta!",
      });
      
      navigate("/cliente/dashboard");
    } else {
      toast({
        title: "Erro ao fazer login",
        description: "Email ou senha incorretos",
        variant: "destructive",
      });
    }
  };

  return (
    <div id="webcrumbs">
      <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter flex flex-col">
        <header className="bg-[#0F3460] text-white p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-3xl">directions_car</span>
              <h1 className="text-2xl font-bold tracking-tight">CHECAR</h1>
            </Link>
          </div>
        </header>
        
        <main className="container mx-auto py-10 px-4 flex-1 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Área do Cliente</h2>
              <p className="text-gray-600 mt-2">Faça login para acessar sua conta</p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-[#0F3460] hover:bg-[#0F3460]/90">
                  Entrar
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{" "}
                <Link to="/registro" className="text-[#0F3460] hover:text-[#FF5722]">
                  Registre-se
                </Link>
              </p>
              <p className="text-sm text-gray-500 mt-4">
                * Para demo: use cliente@exemplo.com / 123456
              </p>
            </div>
          </div>
        </main>
        
        <footer className="mt-auto text-center py-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">© 2023 CHECAR - Sistema de Revisão para Auto Centers</p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
