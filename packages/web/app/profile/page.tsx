'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Award, TrendingUp, Clock, CheckCircle, Edit3, Camera } from 'lucide-react';

export default function ProfilePage() {
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState<any>(null);

  const loadProfile = async () => {
    try {
      const res = await fetch('https://dokets-vouchai.onrender.com/api/users/phone/' + phone);
      const data = await res.json();
      setUser(data);
    } catch { alert('User not found'); }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
          <p className="text-gray-500 mt-2 mb-6">Enter your phone to view profile</p>
          <input type="text" placeholder="+91 98765 43210" value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full px-4 py-3.5 bg-gray-50 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-lg" />
          <button onClick={loadProfile}
            className="w-full bg-blue-600 text-white py-3.5 rounded-2xl font-semibold mt-4 hover:bg-blue-700 transition-all">
            View Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white mb-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-3xl font-bold backdrop-blur-sm">
              {user.name?.[0] || 'U'}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-blue-100">{user.phone}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{user.vouchTier || 'NEW'}</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{user.country}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vouch Score Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Vouch Score</h2>
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600">{user.vouchScore}</div>
              <div className="text-sm text-gray-500 mt-1">out of 100</div>
            </div>
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: `${user.vouchScore}%` }} />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: <CheckCircle className="w-5 h-5" />, label: 'Completed', value: user.completedContracts || 0, color: 'green' },
            { icon: <Award className="w-5 h-5" />, label: 'Contracts', value: (user.totalContractsAsClient || 0) + (user.totalContractsAsProvider || 0), color: 'blue' },
            { icon: <Clock className="w-5 h-5" />, label: 'Member Since', value: new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }), color: 'purple' },
            { icon: <TrendingUp className="w-5 h-5" />, label: 'Wallet', value: `${user.walletCurrency || '₹'} ${user.walletBalance || 0}`, color: 'orange' },
          ].map((s, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border shadow-sm">
              <div className={`w-8 h-8 bg-${s.color}-100 rounded-xl flex items-center justify-center mb-3`}>
                <div className={`text-${s.color}-600`}>{s.icon}</div>
              </div>
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Account Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h2 className="font-semibold text-lg mb-4">Account Details</h2>
          <div className="space-y-3">
            {[
              { label: 'Phone', value: user.phone },
              { label: 'Email', value: user.email || 'Not set' },
              { label: 'Language', value: user.language?.toUpperCase() },
              { label: 'Country', value: user.country },
              { label: 'Role', value: user.role },
              { label: 'Referral Code', value: user.referralCode },
            ].map((item, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-gray-500 text-sm">{item.label}</span>
                <span className="text-gray-900 text-sm font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}