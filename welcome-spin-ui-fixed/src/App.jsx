import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BalanceProvider } from "@/contexts/BalanceContext";

import Index from "./pages/Index";
import Roulette from "./pages/Roulette";
import Slots from "./pages/Slots";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        {/* 🔥 AHORA EL PROVIDER ENVUELVE TODA LA APP */}
        <BalanceProvider>
          <Toaster />
          <Sonner />

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/roulette" element={<Roulette />} />
            <Route path="/slots" element={<Slots />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </BalanceProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
