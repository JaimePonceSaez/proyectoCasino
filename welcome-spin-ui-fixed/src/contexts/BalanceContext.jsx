import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

const BalanceContext = createContext();
const API = "http://localhost:4000/api/users";

export const BalanceProvider = ({ children }) => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);

  // Obtener saldo desde MongoDB al iniciar
  useEffect(() => {
    if (!user) return;

    const loadBalance = async () => {
      const res = await fetch(`${API}/balance/${user.username}`);
      const data = await res.json();

      if (data.success) setBalance(data.balance);
    };

    loadBalance();
  }, [user]);

  // Actualizar saldo en MongoDB
  const saveBalance = async (newBalance) => {
    await fetch(`${API}/balance/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        amount: newBalance,
      }),
    });
  };

  // Añadir dinero
  const addWinnings = (amount) => {
    const updated = balance + amount;
    setBalance(updated);
    saveBalance(updated);
    toast.success(`Has añadido €${amount}`);
  };

  // Quitar dinero
  const deductBet = (amount) => {
    if (balance < amount) {
      toast.error("Saldo insuficiente");
      return;
    }

    const updated = balance - amount;
    setBalance(updated);
    saveBalance(updated);
  };

  // Reiniciar saldo
  const resetBalance = () => {
    setBalance(1000);
    saveBalance(1000);
    toast.info("Saldo reiniciado");
  };

  return (
    <BalanceContext.Provider
      value={{ balance, addWinnings, deductBet, resetBalance }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => useContext(BalanceContext);
