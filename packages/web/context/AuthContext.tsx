'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  phone: string;
  name: string;
  vouchScore: number;
  vouchTier: string;
  walletBalance: number;
  completedContracts: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (phone: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('vouchai_user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const login = async (phone: string) => {
    setLoading(true);
    try {
      const res = await fetch('https://dokets-vouchai.onrender.com/api/users/phone/' + phone);
      let data = await res.json();
      if (!data.id) {
        const createRes = await fetch('https://dokets-vouchai.onrender.com/api/users/register', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, name: 'User', country: 'IN', language: 'en' })
        });
        data = (await createRes.json()).user;
      }
      setUser(data);
      localStorage.setItem('vouchai_user', JSON.stringify(data));
    } catch (e) {
      alert('Login failed. Check API.');
    }
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vouchai_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);