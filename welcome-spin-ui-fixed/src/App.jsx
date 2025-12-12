import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BalanceProvider } from "@/contexts/BalanceContext";
import { AuthProvider } from "@/contexts/AuthContext";


import Index from "./pages/Index";
import Roulette from "./pages/Roulette";
import Slots from "./pages/Slots";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>     {/* <-- AQUI */}
        <BalanceProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/roulette" element={<Roulette />} />
              <Route path="/slots" element={<Slots />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>

        </BalanceProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;
