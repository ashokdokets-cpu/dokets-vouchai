'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Plus, Clock, CheckCircle, DollarSign, Star, 
  Briefcase, ChevronRight, Search, Filter, ArrowUpRight,
  Shield, LayoutDashboard, User, Settings, LogOut,
  TrendingUp, AlertCircle
} from 'lucide-react';

export default function ClientDashboard() {
  const [user, setUser] = useState<any>(null);
  const [contracts, setContracts] = useState<any[]>([]);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

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
    } catch {
      const createRes = await fetch('https://dokets-vouchai.onrender.com/api/users/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneNumber, name: 'Client', country: 'IN', language: 'en' })
      });
      const newUser = (await createRes.json()).user;
      setUser(newUser);
      setContracts([]);
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Client Dashboard</h1>
            <p className="text-gray-500 mt-2">Enter your phone to get started</p>
          </div>
          <input type="text" placeholder="+91 98765 43210" value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg transition-all" />
          <button onClick={() => loadDashboard(phone)} disabled={loading}
            className="w-full bg-blue-600 text-white py-3.5 rounded-2xl font-semibold text-base hover:bg-blue-700 disabled:opacity-50 transition-all mt-4 shadow-sm">
            {loading ? 'Loading...' : 'Open Dashboard'}
          </button>
        </motion.div>
      </div>
    );
  }

  const activeContracts = contracts.filter(c => c.status === 'ACTIVE' || c.status === 'PENDING_ACCEPTANCE');
  const completedContracts = contracts.filter(c => c.status === 'COMPLETED');
  const totalSpent = contracts.reduce((s, c) => s + (c.totalPaid || c.amount || 0), 0);
  const filtered = filter === 'active' ? activeContracts : filter === 'completed' ? completedContracts : contracts;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SIDEBAR + MAIN */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-0 pt-16">
          <nav className="p-4 space-y-1">
            {[
              { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', active: true },
              { icon: <Briefcase className="w-5 h-5" />, label: 'My Contracts' },
              { icon: <DollarSign className="w-5 h-5" />, label: 'Payments' },
              { icon: <Star className="w-5 h-5" />, label: 'Vouch Score' },
              { icon: <User className="w-5 h-5" />, label: 'Profile' },
              { icon: <Settings className="w-5 h-5" />, label: 'Settings' },
            ].map((item, i) => (
              <button key={i} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                item.active ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}>
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          {/* Top Bar */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="flex items-center justify-between px-6 py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                  {user.name?.[0] || 'C'}
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500">⭐ {user.vouchScore} Vouch Score</div>
                </div>
              </div>
              <Link href="/contracts/create" className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-sm">
                <Plus className="w-4 h-4" /> New Contract
              </Link>
            </div>
          </header>

          <div className="p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { icon: <Briefcase className="w-5 h-5" />, label: 'Active Contracts', value: activeContracts.length, color: 'blue' },
                { icon: <CheckCircle className="w-5 h-5" />, label: 'Completed', value: completedContracts.length, color: 'green' },
                { icon: <DollarSign className="w-5 h-5" />, label: 'Total Spent', value: '₹' + totalSpent.toLocaleString(), color: 'purple' },
                { icon: <TrendingUp className="w-5 h-5" />, label: 'Vouch Score', value: user.vouchScore, color: 'orange' },
              ].map((stat, i) => (
                <motion.div key={i} whileHover={{ y: -2 }} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                  <div className={`w-8 h-8 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-3`}>
                    <div className={`text-${stat.color}-600`}>{stat.icon}</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 mb-6">
              {['all', 'active', 'completed'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                    filter === f ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}>
                  {f} ({f === 'all' ? contracts.length : f === 'active' ? activeContracts.length : completedContracts.length})
                </button>
              ))}
            </div>

            {/* Contract List */}
            <div className="space-y-3">
              {filtered.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">No contracts yet</h3>
                  <p className="text-gray-500 mt-1">Create your first contract to get started</p>
                  <Link href="/contracts/create" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mt-4">
                    Create Contract <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                filtered.map((contract: any) => (
                  <motion.div key={contract.id} whileHover={{ y: -2 }}
                    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`w-2 h-2 rounded-full ${
                            contract.status === 'COMPLETED' ? 'bg-green-500' :
                            contract.status === 'ACTIVE' ? 'bg-blue-500' : 'bg-yellow-500'
                          }`}></span>
                          <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{contract.vouchId}</span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            contract.status === 'COMPLETED' ? 'bg-green-50 text-green-700' :
                            contract.status === 'ACTIVE' ? 'bg-blue-50 text-blue-700' : 'bg-yellow-50 text-yellow-700'
                          }`}>{contract.status.replace('_', ' ')}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-lg">{contract.title}</h3>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-1">{contract.description}</p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                          <span className="font-semibold text-gray-900">₹{contract.amount?.toLocaleString()}</span>
                          <span>📅 {new Date(contract.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          {contract.provider && <span>🔧 {contract.provider.name}</span>}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}