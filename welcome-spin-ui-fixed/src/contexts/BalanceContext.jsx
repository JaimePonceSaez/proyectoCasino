import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const BalanceContext = createContext(undefined);

const INITIAL_BALANCE = 1000;
const STORAGE_KEY = 'casino-balance';

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parseFloat(stored) : INITIAL_BALANCE;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, balance.toString());
  }, [balance]);

  const addWinnings = (amount) => {
    setBalance(prev => prev + amount);
    toast.success(`¡Ganaste €${amount.toFixed(2)}!`, {
      description: `Nuevo saldo: €${(balance + amount).toFixed(2)}`,
    });
  };

  const deductBet = (amount) => {
    if (balance < amount) {
      toast.error('Saldo insuficiente', {
        description: 'No tienes suficiente dinero para esta apuesta',
      });
      return false;
    }
    setBalance(prev => prev - amount);
    return true;
  };

  const resetBalance = () => {
    setBalance(INITIAL_BALANCE);
    toast.info('Saldo reiniciado', {
      description: `Tu saldo ha sido restablecido a €${INITIAL_BALANCE}`,
    });
  };

  return (
    <BalanceContext.Provider value={{ balance, addWinnings, deductBet, resetBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error('useBalance must be used within BalanceProvider');
  }
  return context;
};
