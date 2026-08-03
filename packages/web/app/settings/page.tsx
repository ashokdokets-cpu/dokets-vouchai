'use client';

import { useState } from 'react';
import { Globe, Bell, Lock, Moon, DollarSign } from 'lucide-react';

export default function SettingsPage() {
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('INR');
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">⚙️ Settings</h1>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold">Language</h2>
            </div>
            <select value={language} onChange={e => setLanguage(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="en">English</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="bn">বাংলা (Bengali)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="es">Español</option>
              <option value="pt">Português</option>
            </select>
          </div>

          <div className="bg-white rounded-2xl p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-5 h-5 text-green-600" />
              <h2 className="font-semibold">Currency</h2>
            </div>
            <select value={form.currency} onChange={e => setForm({...form, currency: e.target.value})}
  className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm">
  <option value="INR">₹ INR</option>
  <option value="USD">$ USD</option>
  <option value="EUR">€ EUR</option>
  <option value="GBP">£ GBP</option>
  <option value="JPY">¥ JPY</option>
  <option value="AUD">A$ AUD</option>
  <option value="CAD">C$ CAD</option>
  <option value="SGD">S$ SGD</option>
  <option value="AED">د.إ AED</option>
  <option value="SAR">﷼ SAR</option>
  <option value="BRL">R$ BRL</option>
  <option value="MXN">Mex$ MXN</option>
  <option value="NGN">₦ NGN</option>
  <option value="KES">KSh KES</option>
  <option value="ZAR">R ZAR</option>
  <option value="EGP">E£ EGP</option>
  <option value="CNY">¥ CNY</option>
  <option value="KRW">₩ KRW</option>
  <option value="IDR">Rp IDR</option>
  <option value="PHP">₱ PHP</option>
  <option value="VND">₫ VND</option>
  <option value="THB">฿ THB</option>
  <option value="NZD">NZ$ NZD</option>
  <option value="ARS">AR$ ARS</option>
</select>
          </div>

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

          <div className="bg-white rounded-2xl p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5 text-purple-600" />
              <h2 className="font-semibold">Privacy</h2>
            </div>
            <p className="text-sm text-gray-500">Your data is encrypted and secure. VouchAI never shares your personal information.</p>
          </div>

          <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold hover:bg-blue-700 transition-all">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}