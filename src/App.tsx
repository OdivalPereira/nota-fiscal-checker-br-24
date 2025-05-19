
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Relatorios from "./pages/Relatorios";
import Analise from "./pages/Analise";
import NotFound from "./pages/NotFound";
import DashboardContabil from "./pages/DashboardContabil";
import DashboardFiscal from "./pages/DashboardFiscal";
import DashboardDP from "./pages/DashboardDP";
import MonitorSistema from "./pages/MonitorSistema";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contabil" element={<DashboardContabil />} />
          <Route path="/fiscal" element={<DashboardFiscal />} />
          <Route path="/dp" element={<DashboardDP />} />
          <Route path="/monitor" element={<MonitorSistema />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/analise" element={<Analise />} />
          <Route path="/analise/:id" element={<Analise />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
