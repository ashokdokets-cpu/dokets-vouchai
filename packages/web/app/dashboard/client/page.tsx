'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  Plus, CheckCircle, DollarSign, Star, 
  Briefcase, ChevronRight, TrendingUp,
  Shield, LayoutDashboard, User, Settings, LogOut, Bell
} from 'lucide-react';

export default function ClientDashboard() {
  const { user, loading, logout } = useAuth();
  const [contracts, setContracts] = useState<any[]>([]);
  const [payments, setPayments] = useState<Record<string, any>>({});
  const [filter, setFilter] = useState('all');
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) router.push('/login');
    if (user) {
      fetch('https://dokets-vouchai.onrender.com/api/contracts/user/' + user.id)
        .then(r => r.json()).then(d => setContracts(Array.isArray(d) ? d : []));
    }
  }, [user, loading]);

  if (loading || !user) return <div className="p-8 text-center">Loading...</div>;

  const activeContracts = contracts.filter(c => c.status === 'ACTIVE' || c.status === 'PENDING_ACCEPTANCE');
  const completedContracts = contracts.filter(c => c.status === 'COMPLETED');
  const totalSpent = contracts.reduce((s, c) => s + (c.totalPaid || c.amount || 0), 0);
const handleReleasePayment = async (paymentId: string) => {
  if (!confirm('Release payment to provider? This cannot be undone.')) return;
  const res = await fetch('https://dokets-vouchai.onrender.com/api/razorpay/trigger-payout', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentId, clientId: user.id })
  });
  const data = await res.json();
  if (data.success) { alert('✅ Payment released!'); window.location.reload(); }
  else { alert('❌ ' + (data.error || 'Failed')); }
};

const fetchPaymentStatus = async (contractId: string) => {
  const res = await fetch('https://dokets-vouchai.onrender.com/api/payments/contract/' + contractId);
  const data = await res.json();
  if (data.length > 0) setPayments(prev => ({ ...prev, [contractId]: data[data.length - 1] }));
};
  const filtered = filter === 'active' ? activeContracts : filter === 'completed' ? completedContracts : contracts;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="hidden md:flex flex-col w-56 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-0 pt-16">
          <nav className="p-4 space-y-1">
            <Link href="/dashboard/client" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium bg-blue-50 text-blue-700"><LayoutDashboard className="w-5 h-5" /> Dashboard</Link>
            <Link href="/payments" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"><DollarSign className="w-5 h-5" /> Payments</Link>
            <Link href="/vouch-score" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"><Star className="w-5 h-5" /> Vouch Score</Link>
            <Link href="/profile" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"><User className="w-5 h-5" /> Profile</Link>
            <Link href="/settings" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"><Settings className="w-5 h-5" /> Settings</Link>
            <Link href="/notifications" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"><Bell className="w-5 h-5" /> Notifications</Link>
           <button onClick={() => { logout(); router.push('/login'); }} 
           className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 mt-4 border-t pt-4">
           <LogOut className="w-5 h-5" /> Logout
          </button>
          </nav>
        </aside>

        <div className="flex-1 lg:ml-64">
          <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="flex items-center justify-between px-6 py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">{user.name?.[0] || 'C'}</div>
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { icon: <Briefcase className="w-5 h-5" />, label: 'Active Contracts', value: activeContracts.length, color: 'blue' },
                { icon: <CheckCircle className="w-5 h-5" />, label: 'Completed', value: completedContracts.length, color: 'green' },
                { icon: <DollarSign className="w-5 h-5" />, label: 'Total Spent', value: '₹' + totalSpent.toLocaleString(), color: 'purple' },
                { icon: <TrendingUp className="w-5 h-5" />, label: 'Vouch Score', value: user.vouchScore, color: 'orange' },
              ].map((stat, i) => (
                <motion.div key={i} whileHover={{ y: -2 }} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                  <div className={`w-8 h-8 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-3`}><div className={`text-${stat.color}-600`}>{stat.icon}</div></div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-6">
              {['all', 'active', 'completed'].map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${filter === f ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
                  {f} ({f === 'all' ? contracts.length : f === 'active' ? activeContracts.length : completedContracts.length})
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filtered.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4"><Briefcase className="w-8 h-8 text-gray-400" /></div>
                  <h3 className="text-lg font-semibold text-gray-900">No contracts yet</h3>
                  <p className="text-gray-500 mt-1">Create your first contract to get started</p>
                  <Link href="/contracts/create" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mt-4">Create Contract →</Link>
                </div>
              ) : (
                filtered.map((contract: any) => (
                  <motion.div key={contract.id} whileHover={{ y: -2 }} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`w-2 h-2 rounded-full ${contract.status === 'COMPLETED' ? 'bg-green-500' : contract.status === 'ACTIVE' ? 'bg-blue-500' : 'bg-yellow-500'}`}></span>
                          <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{contract.vouchId}</span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${contract.status === 'COMPLETED' ? 'bg-green-50 text-green-700' : contract.status === 'ACTIVE' ? 'bg-blue-50 text-blue-700' : 'bg-yellow-50 text-yellow-700'}`}>{contract.status.replace('_', ' ')}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-lg">{contract.title}</h3>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-1">{contract.description}</p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                          <span className="font-semibold text-gray-900">₹{contract.amount?.toLocaleString()}</span>
                          <span>📅 {new Date(contract.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          {contract.provider && <span>🔧 {contract.provider.name}</span>}
                        </div>
                          {/* Add inside the contract card, after the status badge */}
{payments[contract.id]?.status === 'HELD' && contract.clientId === user.id && (
  <button
    onClick={() => handleReleasePayment(payments[contract.id].id)}
    className="mt-3 bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition-all shadow-sm"
  >
    💰 Release Payment
  </button>
)}
                      </div>
                      <Link href={`/contracts/${contract.id}`}><ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0" /></Link>
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