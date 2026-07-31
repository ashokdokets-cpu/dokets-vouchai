'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, DollarSign, Star, TrendingUp, Plus } from 'lucide-react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [contracts, setContracts] = useState<any[]>([]);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const loadOrCreateUser = async () => {
    if (!phone) return toast.error('Enter phone number');
    setLoading(true);
    try {
      // Try to get existing user
      let res = await fetch('http://localhost:3001/api/users/phone/' + phone);
      let data = await res.json();
      
      // If user doesn't exist, create one
      if (!data.id) {
        const createRes = await fetch('http://localhost:3001/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, name: name || 'User', country: 'IN', language: 'en' })
        });
        data = (await createRes.json()).user;
        toast.success('Account created!');
      } else {
        toast.success('Welcome back, ' + data.name + '!');
      }
      
      setUser(data);
      
      // Load contracts
      const cRes = await fetch('http://localhost:3001/api/contracts/user/' + data.id);
      const cData = await cRes.json();
      setContracts(Array.isArray(cData) ? cData : []);
    } catch (e) {
      toast.error('Error. Make sure API is running on port 3001');
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Toaster position="top-center" />
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-2">📋 Open Dashboard</h1>
          <p className="text-gray-600 text-center mb-6">Enter your details</p>
          <input type="text" placeholder="Your Name" value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl mb-3 focus:ring-2 focus:ring-blue-500 outline-none" />
          <input type="text" placeholder="+919100014859" value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl mb-4 focus:ring-2 focus:ring-blue-500 outline-none" />
          <button onClick={loadOrCreateUser} disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Loading...' : '📋 Open Dashboard'}
          </button>
          <p className="text-center mt-4 text-sm text-gray-500">
            <Link href="/contract/create" className="text-blue-600 hover:underline">Create New Contract →</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Welcome, {user.name}! 👋</h1>
              <p className="text-blue-100 mt-1">Vouch Score: {user.vouchScore}/100 · Tier: {user.vouchTier}</p>
            </div>
            <Link href="/contract/create">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 flex items-center gap-2">
                <Plus className="w-5 h-5" /> New Contract
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <Briefcase />, label: 'Contracts', value: user.completedContracts, color: 'blue' },
            { icon: <DollarSign />, label: 'Wallet', value: '₹' + user.walletBalance, color: 'green' },
            { icon: <Star />, label: 'Vouch Score', value: user.vouchScore, color: 'purple' },
            { icon: <TrendingUp />, label: 'Tier', value: user.vouchTier, color: 'orange' },
          ].map((stat, i) => (
            <motion.div key={i} whileHover={{ y: -3 }} className="bg-white p-5 rounded-xl shadow-sm border">
              <div className="text-blue-600 mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-4">Your Contracts</h2>
        {contracts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border">
            <p className="text-gray-500 text-lg">No contracts yet</p>
            <Link href="/contract/create" className="text-blue-600 hover:underline mt-2 inline-block">
              Create your first contract →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {contracts.map((c: any) => (
              <motion.div key={c.id} whileHover={{ y: -2 }} className="bg-white p-5 rounded-xl shadow-sm border">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono text-gray-400">{c.vouchId}</span>
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                      c.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                      c.status === 'ACTIVE' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>{c.status}</span>
                    <h3 className="font-semibold text-lg mt-1">{c.title}</h3>
                    <p className="text-gray-600 text-sm">{c.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">₹{c.amount?.toLocaleString()}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}