import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Usuario automático
  const defaultUser = {
    username: "dam",
    email: "dam@casino.com"
  };

  // Siempre estará logueado
  const [user, setUser] = useState(defaultUser);

  const login = () => setUser(defaultUser);

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
