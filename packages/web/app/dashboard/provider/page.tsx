'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Briefcase, DollarSign, Star, CheckCircle, Clock,
  AlertCircle, Camera, TrendingUp, ChevronRight, Shield,
  LayoutDashboard, User, Settings, MessageCircle
} from 'lucide-react';

export default function ProviderDashboard() {
  const [user, setUser] = useState<any>(null);
  const [contracts, setContracts] = useState<any[]>([]);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('pending');

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
        body: JSON.stringify({ phone: phoneNumber, name: 'Provider', country: 'IN', language: 'en' })
      });
      setUser((await createRes.json()).user);
      setContracts([]);
    }
    setLoading(false);
  };

  const handleAccept = async (id: string) => {
    await fetch('https://dokets-vouchai.onrender.com/api/contracts/' + id + '/accept', { method: 'POST' });
    loadDashboard(phone);
  };

  const handleComplete = async (id: string) => {
    await fetch('https://dokets-vouchai.onrender.com/api/contracts/' + id + '/complete', { method: 'POST' });
    await fetch('https://dokets-vouchai.onrender.com/api/payments/release', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contractId: id })
    });
    loadDashboard(phone);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Provider Dashboard</h1>
            <p className="text-gray-500 mt-2">Find work, build trust, get paid</p>
          </div>
          <input type="text" placeholder="+91 98765 43210" value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none text-lg transition-all" />
          <button onClick={() => loadDashboard(phone)} disabled={loading}
            className="w-full bg-green-600 text-white py-3.5 rounded-2xl font-semibold text-base hover:bg-green-700 disabled:opacity-50 transition-all mt-4 shadow-sm">
            {loading ? 'Loading...' : 'Open Dashboard'}
          </button>
        </motion.div>
      </div>
    );
  }

  const pending = contracts.filter(c => c.status === 'PENDING_ACCEPTANCE');
  const active = contracts.filter(c => c.status === 'ACTIVE');
  const completed = contracts.filter(c => c.status === 'COMPLETED');
  const earnings = completed.reduce((s, c) => s + (c.amount || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-0 pt-16">
          <nav className="p-4 space-y-1">
  <Link href="/dashboard/provider" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium bg-green-50 text-green-700">
    <LayoutDashboard className="w-5 h-5" /> Dashboard
  </Link>
  <Link href="/dashboard/provider" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
    <Briefcase className="w-5 h-5" /> My Jobs
  </Link>
  <Link href="/payments" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
    <DollarSign className="w-5 h-5" /> Earnings
  </Link>
  <Link href="/vouch-score" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
    <Star className="w-5 h-5" /> Vouch Score
  </Link>
  <Link href="/profile" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
    <User className="w-5 h-5" /> Profile
  </Link>
  <Link href="/settings" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
    <Settings className="w-5 h-5" /> Settings
  </Link>
</nav>
        </aside>

        {/* Main */}
        <div className="flex-1 lg:ml-64">
          <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="flex items-center justify-between px-6 py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                  {user.name?.[0] || 'P'}
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500">⭐ {user.vouchScore} • {user.vouchTier || 'NEW'}</div>
                </div>
              </div>
              <span className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium">● Available</span>
            </div>
          </header>

          <div className="p-6">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {[
                { icon: <AlertCircle className="w-5 h-5" />, label: 'Pending', value: pending.length, color: 'yellow' },
                { icon: <Briefcase className="w-5 h-5" />, label: 'Active', value: active.length, color: 'blue' },
                { icon: <CheckCircle className="w-5 h-5" />, label: 'Done', value: completed.length, color: 'green' },
                { icon: <DollarSign className="w-5 h-5" />, label: 'Earned', value: '₹' + earnings.toLocaleString(), color: 'purple' },
                { icon: <TrendingUp className="w-5 h-5" />, label: 'Score', value: user.vouchScore, color: 'orange' },
              ].map((s, i) => (
                <motion.div key={i} whileHover={{ y: -2 }} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                  <div className={`w-8 h-8 bg-${s.color}-100 rounded-xl flex items-center justify-center mb-3`}>
                    <div className={`text-${s.color}-600`}>{s.icon}</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                  <div className="text-sm text-gray-500">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {[
                { key: 'pending', label: '🔔 Pending', count: pending.length },
                { key: 'active', label: '🔵 Active', count: active.length },
                { key: 'completed', label: '✅ Done', count: completed.length },
              ].map(t => (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    tab === t.key ? 'bg-green-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}>{t.label} ({t.count})</button>
              ))}
            </div>

            {/* Jobs */}
            <div className="space-y-3">
              {(tab === 'pending' ? pending : tab === 'active' ? active : completed).length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No {tab} jobs</p>
                </div>
              ) : (
                (tab === 'pending' ? pending : tab === 'active' ? active : completed).map((c: any) => (
                  <motion.div key={c.id} whileHover={{ y: -2 }}
                    className={`bg-white p-5 rounded-2xl border shadow-sm ${
                      tab === 'pending' ? 'border-l-4 border-l-yellow-400' :
                      tab === 'active' ? 'border-l-4 border-l-blue-400' : 'border-l-4 border-l-green-400'
                    }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-500">{c.vouchId}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900">{c.title}</h3>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-1">{c.description}</p>
                        <div className="flex items-center gap-4 mt-3 text-sm">
                          <span className="font-bold text-green-600">₹{c.amount?.toLocaleString()}</span>
                          <span className="text-gray-400">{new Date(c.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        {tab === 'pending' && (
                          <button onClick={() => handleAccept(c.id)} className="bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-all shadow-sm">Accept Job</button>
                        )}
                        {tab === 'active' && (
                          <button onClick={() => handleComplete(c.id)} className="bg-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-purple-700 transition-all shadow-sm">Mark Done</button>
                        )}
                      </div>
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