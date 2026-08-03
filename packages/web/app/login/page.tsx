'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Shield, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const { login, loading } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    await login(phone);
    router.push('/dashboard/client');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Welcome to VouchAI</h1>
          <p className="text-gray-500 mt-2">Enter your phone number to continue</p>
        </div>
        <input type="text" placeholder="+91 98765 43210" value={phone}
          onChange={e => setPhone(e.target.value)}
          className="w-full px-4 py-4 bg-gray-50 border rounded-2xl text-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4" />
        <button onClick={handleLogin} disabled={loading || !phone}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2">
          {loading ? 'Loading...' : <>Continue <ArrowRight className="w-4 h-4" /></>}
        </button>
        <p className="text-center text-sm text-gray-400 mt-4">No password needed. Just your phone.</p>
      </div>
    </div>
  );
}