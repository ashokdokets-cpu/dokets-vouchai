'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Briefcase, DollarSign, Star, CheckCircle, AlertCircle, TrendingUp, LayoutDashboard, User, Settings } from 'lucide-react';

export default function ProviderDashboard() {
  const { user, loading } = useAuth();
  const [contracts, setContracts] = useState<any[]>([]);
  const [tab, setTab] = useState('pending');
  const router = useRouter();

  useEffect(() => { if (!user && !loading) router.push('/login'); if (user) fetch('https://dokets-vouchai.onrender.com/api/contracts/user/' + user.id).then(r => r.json()).then(d => setContracts(Array.isArray(d) ? d : [])); }, [user, loading]);

  const handleAccept = async (id: string) => { await fetch('https://dokets-vouchai.onrender.com/api/contracts/' + id + '/accept', { method: 'POST' }); window.location.reload(); };
  const handleComplete = async (id: string) => { await fetch('https://dokets-vouchai.onrender.com/api/contracts/' + id + '/complete', { method: 'POST' }); await fetch('https://dokets-vouchai.onrender.com/api/payments/release', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contractId: id }) }); window.location.reload(); };

  if (loading || !user) return <div className="p-8 text-center">Loading...</div>;

  const pending = contracts.filter(c => c.status === 'PENDING_ACCEPTANCE');
  const active = contracts.filter(c => c.status === 'ACTIVE');
  const completed = contracts.filter(c => c.status === 'COMPLETED');
  const earnings = completed.reduce((s, c) => s + (c.amount || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-0 pt-16">
          <nav className="p-4 space-y-1">
            <Link href="/dashboard/provider" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium bg-green-50 text-green-700"><LayoutDashboard className="w-5 h-5" /> Dashboard</Link>
            <Link href="/payments" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"><DollarSign className="w-5 h-5" /> Earnings</Link>
            <Link href="/vouch-score" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"><Star className="w-5 h-5" /> Vouch Score</Link>
            <Link href="/profile" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"><User className="w-5 h-5" /> Profile</Link>
            <Link href="/settings" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"><Settings className="w-5 h-5" /> Settings</Link>
            <Link href="/applications" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"><Briefcase className="w-5 h-5" /> My Applications</Link>
            <Link href="/notifications" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"><Bell className="w-5 h-5" /> Notifications</Link>
          </nav>
        </aside>
        <div className="flex-1 lg:ml-64">
          <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="flex items-center justify-between px-6 py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">{user.name?.[0] || 'P'}</div>
                <div><div className="font-semibold text-sm text-gray-900">{user.name}</div><div className="text-xs text-gray-500">⭐ {user.vouchScore} • {user.vouchTier || 'NEW'}</div></div>
              </div>
              <span className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium">● Available</span>
            </div>
          </header>
          <div className="p-6">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {[{ icon: <AlertCircle className="w-5 h-5" />, label: 'Pending', value: pending.length, color: 'yellow' },{ icon: <Briefcase className="w-5 h-5" />, label: 'Active', value: active.length, color: 'blue' },{ icon: <CheckCircle className="w-5 h-5" />, label: 'Done', value: completed.length, color: 'green' },{ icon: <DollarSign className="w-5 h-5" />, label: 'Earned', value: '₹' + earnings.toLocaleString(), color: 'purple' },{ icon: <TrendingUp className="w-5 h-5" />, label: 'Score', value: user.vouchScore, color: 'orange' }].map((s, i) => (
                <motion.div key={i} whileHover={{ y: -2 }} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm"><div className={`w-8 h-8 bg-${s.color}-100 rounded-xl flex items-center justify-center mb-3`}><div className={`text-${s.color}-600`}>{s.icon}</div></div><div className="text-2xl font-bold text-gray-900">{s.value}</div><div className="text-sm text-gray-500">{s.label}</div></motion.div>
              ))}
            </div>
            <div className="flex gap-2 mb-6">
              {[{ key: 'pending', label: '🔔 Pending', count: pending.length },{ key: 'active', label: '🔵 Active', count: active.length },{ key: 'completed', label: '✅ Done', count: completed.length }].map(t => (
                <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${tab === t.key ? 'bg-green-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>{t.label} ({t.count})</button>
              ))}
            </div>
            <div className="space-y-3">
              {(tab === 'pending' ? pending : tab === 'active' ? active : completed).length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border"><p className="text-gray-500">No {tab} jobs</p></div>
              ) : (
                (tab === 'pending' ? pending : tab === 'active' ? active : completed).map((c: any) => (
                  <motion.div key={c.id} whileHover={{ y: -2 }} className={`bg-white p-5 rounded-2xl border shadow-sm border-l-4 ${tab === 'pending' ? 'border-l-yellow-400' : tab === 'active' ? 'border-l-blue-400' : 'border-l-green-400'}`}>
                    <div className="flex items-start justify-between">
                      <div><span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-500">{c.vouchId}</span><h3 className="font-semibold text-gray-900 mt-1">{c.title}</h3><div className="flex items-center gap-4 mt-2 text-sm"><span className="font-bold text-green-600">₹{c.amount?.toLocaleString()}</span><span className="text-gray-400">{new Date(c.deadline).toLocaleDateString()}</span></div></div>
                      <div className="flex flex-col gap-2 ml-4">
                        {tab === 'pending' && <button onClick={() => handleAccept(c.id)} className="bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700">Accept Job</button>}
                        {tab === 'active' && <button onClick={() => handleComplete(c.id)} className="bg-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-purple-700">Mark Done</button>}
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