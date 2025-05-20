
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

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

// Auth Pages
import Login from "./pages/Login";
import Registro from "./pages/Registro";

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
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            
            {/* Mechanic Routes */}
            <Route path="/clientes" element={
              <ProtectedRoute requiredRole="mecanico">
                <Clientes />
              </ProtectedRoute>
            } />
            <Route path="/clientes/novo" element={
              <ProtectedRoute requiredRole="mecanico">
                <ClienteNovo />
              </ProtectedRoute>
            } />
            <Route path="/clientes/:id" element={
              <ProtectedRoute requiredRole="mecanico">
                <ClienteDetalhe />
              </ProtectedRoute>
            } />
            <Route path="/clientes/:id/editar" element={
              <ProtectedRoute requiredRole="mecanico">
                <ClienteEditar />
              </ProtectedRoute>
            } />
            <Route path="/veiculos" element={<Veiculos />} />
            <Route path="/revisoes" element={<Revisoes />} />
            <Route path="/relatorios" element={<Relatorios />} />
            
            {/* Cliente Routes - Protected */}
            <Route 
              path="/cliente/dashboard" 
              element={
                <ProtectedRoute requiredRole="cliente">
                  <ClienteDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cliente/veiculos" 
              element={
                <ProtectedRoute requiredRole="cliente">
                  <ClienteVeiculos />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cliente/veiculos/:id" 
              element={
                <ProtectedRoute requiredRole="cliente">
                  <ClienteVeiculoDetalhe />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cliente/revisoes" 
              element={
                <ProtectedRoute requiredRole="cliente">
                  <ClienteRevisoes />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cliente/revisoes/:id" 
              element={
                <ProtectedRoute requiredRole="cliente">
                  <ClienteRevisaoDetalhe />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cliente/recomendacoes" 
              element={
                <ProtectedRoute requiredRole="cliente">
                  <ClienteRecomendacoes />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cliente/recomendacoes/:id" 
              element={
                <ProtectedRoute requiredRole="cliente">
                  <ClienteRecomendacaoDetalhe />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cliente/perfil" 
              element={
                <ProtectedRoute requiredRole="cliente">
                  <ClientePerfil />
                </ProtectedRoute>
              } 
            />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
