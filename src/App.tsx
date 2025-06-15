
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import Landing from "./pages/Landing";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Clientes from "./pages/Clientes";
import ClienteNovo from "./pages/ClienteNovo";
import ClienteDetalhe from "./pages/ClienteDetalhe";
import ClienteEditar from "./pages/ClienteEditar";
import Veiculos from "./pages/Veiculos";
import Revisoes from "./pages/Revisoes";
import RevisaoNova from "./pages/RevisaoNova";
import RevisaoDetalhe from "./pages/RevisaoDetalhe";
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

// Veiculo Pages
import VeiculoNovo from "./pages/VeiculoNovo";
import VeiculoDetalhe from "./pages/VeiculoDetalhe";
import VeiculoEditar from "./pages/VeiculoEditar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<Landing />} />
            
            {/* Authentication Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/login" element={<Login />} />
            
            {/* Admin/Mechanic Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/clientes/novo" element={<ClienteNovo />} />
            <Route path="/clientes/:id" element={<ClienteDetalhe />} />
            <Route path="/clientes/:id/editar" element={<ClienteEditar />} />
            <Route path="/veiculos" element={<Veiculos />} />
            <Route path="/veiculos/novo" element={<VeiculoNovo />} />
            <Route path="/veiculos/:id" element={<VeiculoDetalhe />} />
            <Route path="/veiculos/:id/editar" element={<VeiculoEditar />} />
            <Route path="/revisoes" element={<Revisoes />} />
            <Route path="/revisoes/nova" element={<RevisaoNova />} />
            <Route path="/revisoes/:id" element={<RevisaoDetalhe />} />
            <Route path="/relatorios" element={<Relatorios />} />
            
            {/* Cliente Routes */}
            <Route path="/cliente/dashboard" element={<ClienteDashboard />} />
            <Route path="/cliente/veiculos" element={<ClienteVeiculos />} />
            <Route path="/cliente/veiculos/:id" element={<ClienteVeiculoDetalhe />} />
            <Route path="/cliente/revisoes" element={<ClienteRevisoes />} />
            <Route path="/cliente/revisoes/:id" element={<ClienteRevisaoDetalhe />} />
            <Route path="/cliente/recomendacoes" element={<ClienteRecomendacoes />} />
            <Route path="/cliente/recomendacoes/:id" element={<ClienteRecomendacaoDetalhe />} />
            <Route path="/cliente/perfil" element={<ClientePerfil />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
