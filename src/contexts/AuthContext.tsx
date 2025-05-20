
import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'cliente' | 'mecanico';
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in on component mount
    const clienteAuth = localStorage.getItem('clienteAuth');
    if (clienteAuth) {
      const authData = JSON.parse(clienteAuth);
      if (authData.isAuthenticated && authData.user) {
        setUser(authData.user);
        setIsAuthenticated(true);
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('clienteAuth', JSON.stringify({
      isAuthenticated: true,
      user: userData
    }));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('clienteAuth');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
