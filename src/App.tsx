import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Secretaria from "./pages/Secretaria";
import Ministerios from "./pages/Ministerios";
import Celulas from "./pages/Celulas";
import Ensino from "./pages/Ensino";
import Financeiro from "./pages/Financeiro";
import Eventos from "./pages/Eventos";
import MeuApp from "./pages/MeuApp";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/secretaria" element={<Secretaria />} />
          <Route path="/ministerios" element={<Ministerios />} />
          <Route path="/celulas" element={<Celulas />} />
          <Route path="/ensino" element={<Ensino />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/meu-app" element={<MeuApp />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
