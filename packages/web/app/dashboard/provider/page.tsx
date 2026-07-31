'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Briefcase, DollarSign, Star, TrendingUp, CheckCircle, 
  Clock, Camera, MessageCircle, Users, ChevronRight,
  AlertCircle, ThumbsUp
} from 'lucide-react';

export default function ProviderDashboard() {
  const [user, setUser] = useState<any>(null);
  const [contracts, setContracts] = useState<any[]>([]);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');

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
      const createRes = await fetch('https://dokets-vouchai.onrender.com/api/users/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneNumber, name: 'Provider', country: 'IN', language: 'en' })
      });
      const newUser = (await createRes.json()).user;
      setUser(newUser);
      setContracts([]);
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">🔧</div>
            <h1 className="text-3xl font-bold">Provider Dashboard</h1>
            <p className="text-gray-600 mt-2">Find work, build trust, get paid</p>
          </div>
          <input type="text" placeholder="+919876543210" value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl mb-4 focus:ring-2 focus:ring-green-500 outline-none text-lg" />
          <button onClick={() => loadDashboard(phone)} disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-green-700 disabled:opacity-50">
            {loading ? 'Loading...' : '🔧 Open Dashboard'}
          </button>
        </div>
      </div>
    );
  }

  const pendingContracts = contracts.filter(c => c.status === 'PENDING_ACCEPTANCE');
  const activeContracts = contracts.filter(c => c.status === 'ACTIVE');
  const completedContracts = contracts.filter(c => c.status === 'COMPLETED');
  const totalEarnings = completedContracts.reduce((s, c) => s + (c.amount || 0), 0);

  const handleAccept = async (contractId: string) => {
    await fetch('https://dokets-vouchai.onrender.com/api/contracts/' + contractId + '/accept', { method: 'POST' });
    loadDashboard(phone);
  };

  const handleComplete = async (contractId: string) => {
    await fetch('https://dokets-vouchai.onrender.com/api/contracts/' + contractId + '/complete', { method: 'POST' });
    await fetch('https://dokets-vouchai.onrender.com/api/payments/release', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contractId })
    });
    loadDashboard(phone);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
              {user.name?.[0] || 'P'}
            </div>
            <div>
              <div className="font-semibold">{user.name}</div>
              <div className="text-xs text-gray-500">⭐ {user.vouchScore}/100 · {user.vouchTier}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
              Available for Work
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { icon: <AlertCircle />, label: 'Pending Jobs', value: pendingContracts.length, color: 'yellow' },
            { icon: <Briefcase />, label: 'Active Jobs', value: activeContracts.length, color: 'blue' },
            { icon: <CheckCircle />, label: 'Completed', value: completedContracts.length, color: 'green' },
            { icon: <DollarSign />, label: 'Total Earned', value: '₹' + totalEarnings.toLocaleString(), color: 'purple' },
            { icon: <Star />, label: 'Vouch Score', value: user.vouchScore, color: 'orange' },
          ].map((stat, i) => (
            <motion.div key={i} whileHover={{ y: -3 }} className="bg-white p-5 rounded-xl shadow-sm border">
              <div className={`text-${stat.color}-600 mb-2`}>{stat.icon}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'pending', label: '🔔 Pending', count: pendingContracts.length },
            { key: 'active', label: '🔵 Active', count: activeContracts.length },
            { key: 'completed', label: '✅ Completed', count: completedContracts.length },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border'
              }`}>
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Contract Cards */}
        <div className="space-y-4">
          {(activeTab === 'pending' ? pendingContracts : activeTab === 'active' ? activeContracts : completedContracts).map((contract: any) => (
            <motion.div key={contract.id} whileHover={{ y: -2 }} 
              className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${
                contract.status === 'PENDING_ACCEPTANCE' ? 'border-l-yellow-500' :
                contract.status === 'ACTIVE' ? 'border-l-blue-500' :
                'border-l-green-500'
              }`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded">{contract.vouchId}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      contract.status === 'PENDING_ACCEPTANCE' ? 'bg-yellow-100 text-yellow-800' :
                      contract.status === 'ACTIVE' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>{contract.status.replace('_', ' ')}</span>
                  </div>
                  <h3 className="font-semibold text-lg">{contract.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{contract.description?.substring(0, 120)}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <span className="text-green-600 font-bold">💰 ₹{contract.amount?.toLocaleString()}</span>
                    <span className="text-gray-500">📅 {new Date(contract.deadline).toLocaleDateString()}</span>
                    <span className="text-gray-500">📍 {contract.location || 'Remote'}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  {contract.status === 'PENDING_ACCEPTANCE' && (
                    <button onClick={() => handleAccept(contract.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 whitespace-nowrap">
                      ✅ Accept Job
                    </button>
                  )}
                  {contract.status === 'ACTIVE' && (
                    <>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-1 whitespace-nowrap">
                        <Camera className="w-4 h-4" /> Upload Proof
                      </button>
                      <button onClick={() => handleComplete(contract.id)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 whitespace-nowrap">
                        ✅ Mark Complete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {((activeTab === 'pending' ? pendingContracts : activeTab === 'active' ? activeContracts : completedContracts)).length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl border">
              <div className="text-6xl mb-4">
                {activeTab === 'pending' ? '🔔' : activeTab === 'active' ? '🔵' : '✅'}
              </div>
              <p className="text-gray-500 text-lg">
                {activeTab === 'pending' ? 'No pending jobs. Check back soon!' :
                 activeTab === 'active' ? 'No active jobs. Accept a pending job to start!' :
                 'No completed jobs yet.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}