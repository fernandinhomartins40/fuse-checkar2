
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Clientes from "./pages/Clientes";
import ClienteNovo from "./pages/ClienteNovo";
import ClienteDetalhe from "./pages/ClienteDetalhe";
import ClienteEditar from "./pages/ClienteEditar";
import Veiculos from "./pages/Veiculos";
import Revisoes from "./pages/Revisoes";
import Relatorios from "./pages/Relatorios";
import NotFound from "./pages/NotFound";

// Cliente Pages
import ClienteDashboard from "./pages/cliente/Dashboard";
import ClienteVeiculos from "./pages/cliente/Veiculos";
import ClienteVeiculoDetalhe from "./pages/cliente/VeiculoDetalhe";
import ClienteRevisoes from "./pages/cliente/Revisoes";
import ClienteRevisaoDetalhe from "./pages/cliente/RevisaoDetalhe";
import ClienteRecomendacoes from "./pages/cliente/Recomendacoes";
import ClienteRecomendacaoDetalhe from "./pages/cliente/RecomendacaoDetalhe";
import ClientePerfil from "./pages/cliente/Perfil";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          
          {/* Mechanic Routes */}
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/novo" element={<ClienteNovo />} />
          <Route path="/clientes/:id" element={<ClienteDetalhe />} />
          <Route path="/clientes/:id/editar" element={<ClienteEditar />} />
          <Route path="/veiculos" element={<Veiculos />} />
          <Route path="/revisoes" element={<Revisoes />} />
          <Route path="/relatorios" element={<Relatorios />} />
          
          {/* Cliente Routes - Not protected anymore */}
          <Route path="/cliente/dashboard" element={<ClienteDashboard />} />
          <Route path="/cliente/veiculos" element={<ClienteVeiculos />} />
          <Route path="/cliente/veiculos/:id" element={<ClienteVeiculoDetalhe />} />
          <Route path="/cliente/revisoes" element={<ClienteRevisoes />} />
          <Route path="/cliente/revisoes/:id" element={<ClienteRevisaoDetalhe />} />
          <Route path="/cliente/recomendacoes" element={<ClienteRecomendacoes />} />
          <Route path="/cliente/recomendacoes/:id" element={<ClienteRecomendacaoDetalhe />} />
          <Route path="/cliente/perfil" element={<ClientePerfil />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
