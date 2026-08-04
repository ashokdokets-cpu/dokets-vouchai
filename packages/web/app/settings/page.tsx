'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Globe, Bell, Lock, Moon, DollarSign, CheckCircle } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা (Bengali)', flag: '🇧🇩' },
  { code: 'te', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी (Marathi)', flag: '🇮🇳' },
  { code: 'es', name: 'Español (Spanish)', flag: '🇪🇸' },
  { code: 'fr', name: 'Français (French)', flag: '🇫🇷' },
  { code: 'pt', name: 'Português (Portuguese)', flag: '🇧🇷' },
  { code: 'ar', name: 'العربية (Arabic)', flag: '🇸🇦' },
  { code: 'ja', name: '日本語 (Japanese)', flag: '🇯🇵' },
  { code: 'ko', name: '한국어 (Korean)', flag: '🇰🇷' },
  { code: 'zh', name: '中文 (Chinese)', flag: '🇨🇳' },
  { code: 'de', name: 'Deutsch (German)', flag: '🇩🇪' },
];

const CURRENCIES = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'MXN', symbol: 'Mex$', name: 'Mexican Peso' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'KRW', symbol: '₩', name: 'Korean Won' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
  { code: 'ARS', symbol: 'AR$', name: 'Argentine Peso' },
];

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('INR');
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user && !loading) router.push('/login');
    if (user) {
      setLanguage(user.language || 'en');
      setCurrency(user.walletCurrency || 'INR');
    }
  }, [user, loading]);

  const handleSave = async () => {
    try {
      await fetch('https://dokets-vouchai.onrender.com/api/users/' + user.id, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, walletCurrency: currency })
      });
      // Update local storage
      const saved = localStorage.getItem('vouchai_user');
      if (saved) {
        const u = JSON.parse(saved);
        u.language = language;
        u.walletCurrency = currency;
        localStorage.setItem('vouchai_user', JSON.stringify(u));
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      alert('Failed to save settings');
    }
  };

  if (loading || !user) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">⚙️ Settings</h1>

        <div className="space-y-4">
          {/* Language */}
          <div className="bg-white rounded-2xl p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold">Language</h2>
            </div>
            <select value={language} onChange={e => setLanguage(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
              ))}
            </select>
          </div>

          {/* Currency */}
          <div className="bg-white rounded-2xl p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-5 h-5 text-green-600" />
              <h2 className="font-semibold">Currency</h2>
            </div>
            <select value={currency} onChange={e => setCurrency(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>{c.symbol} {c.code} - {c.name}</option>
              ))}
            </select>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5 text-orange-600" />
              <h2 className="font-semibold">Notifications</h2>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">WhatsApp notifications</span>
              <button onClick={() => setNotifications(!notifications)}
                className={`w-12 h-7 rounded-full transition-all ${notifications ? 'bg-blue-600' : 'bg-gray-300'}`}>
                <div className={`w-5 h-5 bg-white rounded-full m-1 transition-all ${notifications ? 'ml-6' : ''}`} />
              </button>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-white rounded-2xl p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5 text-purple-600" />
              <h2 className="font-semibold">Privacy</h2>
            </div>
            <p className="text-sm text-gray-500">Your data is encrypted and secure. Dokets VouchAI never shares your personal information with third parties.</p>
            <div className="mt-3 text-xs text-gray-400">
              <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
              <span className="mx-2">·</span>
              <a href="/terms" className="text-blue-600 hover:underline">Terms & Conditions</a>
            </div>
          </div>

          {/* Save Button */}
          <button onClick={handleSave}
            className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all ${
              saved ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}>
            {saved ? <span className="flex items-center justify-center gap-2"><CheckCircle className="w-5 h-5" /> Settings Saved!</span> : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}