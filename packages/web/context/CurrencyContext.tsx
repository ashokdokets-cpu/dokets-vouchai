'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CurrencyContextType {
  currency: string;
  setCurrency: (c: string) => void;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'USD',
  setCurrency: () => {},
  symbol: '$'
});

const SYMBOLS: Record<string, string> = {
  INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥',
  AUD: 'A$', CAD: 'C$', SGD: 'S$', AED: 'د.إ', SAR: '﷼',
  BRL: 'R$', MXN: 'Mex$', NGN: '₦', KES: 'KSh', ZAR: 'R',
  EGP: 'E£', CNY: '¥', KRW: '₩', IDR: 'Rp', PHP: '₱',
  VND: '₫', THB: '฿', NZD: 'NZ$', ARS: 'AR$'
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    const saved = localStorage.getItem('vouchai_currency');
    if (saved) {
      setCurrency(saved);
    } else {
      // Detect from browser
      const lang = navigator.language || 'en-US';
      const country = lang.split('-')[1] || 'US';
      const map: Record<string, string> = { IN: 'INR', US: 'USD', GB: 'GBP', BR: 'BRL', NG: 'NGN', AE: 'AED', JP: 'JPY' };
      setCurrency(map[country] || 'USD');
    }
  }, []);

  const handleSetCurrency = (c: string) => {
    setCurrency(c);
    localStorage.setItem('vouchai_currency', c);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency, symbol: SYMBOLS[currency] || '$' }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);