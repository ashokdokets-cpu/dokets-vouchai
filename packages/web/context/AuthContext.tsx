'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string; phone: string; name: string; vouchScore: number;
  vouchTier: string; walletBalance: number; completedContracts: number;
}

interface AuthContextType {
  user: User | null; loading: boolean;
  sendOTP: (phone: string) => Promise<string>;
  verifyOTP: (phone: string, code: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('vouchai_user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }
    setLoading(false);
  }, []);

  const sendOTP = async (phone: string) => {
    const res = await fetch('https://dokets-vouchai.onrender.com/api/auth/send-otp', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });
    const data = await res.json();
    return data.success ? (data.otp || 'sent') : '';
  };

  const verifyOTP = async (phone: string, code: string) => {
    const res = await fetch('https://dokets-vouchai.onrender.com/api/auth/verify-otp', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, code })
    });
    const data = await res.json();
    if (data.success && data.user) {
      setUser(data.user);
      localStorage.setItem('vouchai_user', JSON.stringify(data.user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vouchai_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, sendOTP, verifyOTP, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);