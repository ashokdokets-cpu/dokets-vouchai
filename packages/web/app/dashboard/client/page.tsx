'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Briefcase, DollarSign, Star, TrendingUp, Plus, 
  Clock, CheckCircle, AlertCircle, ChevronRight,
  Search, Filter, LayoutDashboard, LogOut, User,
  MessageCircle, Settings, Bell
} from 'lucide-react';

export default function ClientDashboard() {
  const [user, setUser] = useState<any>(null);
  const [contracts, setContracts] = useState<any[]>([]);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState('all');

  const loadDashboard = async (phoneNumber: string) => {
    setLoading(true);
    try {
      const res = await fetch('https://dokets-vouchai.onrender.com/api/users/phone/' + phoneNumber);
      const data = await res.json();
      if (data.id) {
        setUser(data);
        const cRes = await fetch('https://dokets-vouchai.onrender.com/api/contracts/user/' + data.id);
        const cData = await cRes.json();
        setContracts(Array.isArray(cData) ? cData : []);
      }
    } catch (e) {
      // If user doesn't exist, create one
      const createRes = await fetch('https://dokets-vouchai.onrender.com/api/users/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneNumber, name: 'User', country: 'IN', language: 'en' })
      });
      const newUser = (await createRes.json()).user;
      setUser(newUser);
      setContracts([]);
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">👤</div>
            <h1 className="text-3xl font-bold">Client Dashboard</h1>
            <p className="text-gray-600 mt-2">Enter your phone to continue</p>
          </div>
          <input type="text" placeholder="+919876543210" value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl mb-4 focus:ring-2 focus:ring-blue-500 outline-none text-lg" />
          <button onClick={() => loadDashboard(phone)} disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Loading...' : '📋 Open Dashboard'}
          </button>
        </div>
      </div>
    );
  }

  const activeContracts = contracts.filter(c => c.status === 'ACTIVE' || c.status === 'PENDING_ACCEPTANCE');
  const completedContracts = contracts.filter(c => c.status === 'COMPLETED');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {user.name?.[0] || 'U'}
            </div>
            <div>
              <div className="font-semibold">{user.name}</div>
              <div className="text-xs text-gray-500">⭐ {user.vouchScore}/100</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/contracts/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-1">
              <Plus className="w-4 h-4" /> New Contract
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <Briefcase />, label: 'Active Contracts', value: activeContracts.length, color: 'blue' },
            { icon: <CheckCircle />, label: 'Completed', value: completedContracts.length, color: 'green' },
            { icon: <DollarSign />, label: 'Total Spent', value: '₹' + contracts.reduce((s, c) => s + (c.totalPaid || 0), 0).toLocaleString(), color: 'purple' },
            { icon: <Star />, label: 'Vouch Score', value: user.vouchScore, color: 'orange' },
          ].map((stat, i) => (
            <motion.div key={i} whileHover={{ y: -3 }} className="bg-white p-5 rounded-xl shadow-sm border">
              <div className={`text-${stat.color}-600 mb-2`}>{stat.icon}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {['all', 'active', 'completed'].map(filter => (
            <button key={filter} onClick={() => setActiveView(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                activeView === filter ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border'
              }`}>
              {filter} ({filter === 'all' ? contracts.length : filter === 'active' ? activeContracts.length : completedContracts.length})
            </button>
          ))}
        </div>

        {/* Contracts */}
        <div className="space-y-4">
          {(activeView === 'all' ? contracts : activeView === 'active' ? activeContracts : completedContracts).map((contract: any) => (
            <motion.div key={contract.id} whileHover={{ y: -2 }} className="bg-white p-5 rounded-xl shadow-sm border hover:border-blue-200 transition-all">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{contract.vouchId}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      contract.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                      contract.status === 'ACTIVE' ? 'bg-blue-100 text-blue-800' :
                      contract.status === 'PENDING_ACCEPTANCE' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {contract.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg">{contract.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{contract.description?.substring(0, 100)}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span>💰 ₹{contract.amount?.toLocaleString()}</span>
                    <span>📅 {new Date(contract.deadline).toLocaleDateString()}</span>
                    {contract.provider && <span>🔧 {contract.provider.name}</span>}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </motion.div>
          ))}
          {contracts.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl border">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-gray-500 text-lg">No contracts yet</p>
              <Link href="/contracts/create" className="text-blue-600 hover:underline mt-2 inline-block font-medium">
                Create your first contract →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}