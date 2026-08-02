'use client';

import { useState } from 'react';
import { Star, Shield, Award, TrendingUp, CheckCircle, Clock } from 'lucide-react';

export default function VouchScorePage() {
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState<any>(null);

  const loadScore = async () => {
    const res = await fetch('https://dokets-vouchai.onrender.com/api/users/phone/' + phone);
    setUser(await res.json());
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="text-5xl mb-4">⭐</div>
          <h1 className="text-2xl font-bold">Vouch Score</h1>
          <p className="text-gray-500 mt-2 mb-6">Check your trust rating</p>
          <input type="text" placeholder="+919100014859" value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl mb-4 focus:ring-2 focus:ring-blue-500 outline-none" />
          <button onClick={loadScore}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700">
            View Score
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center mb-8">
          <Shield className="w-12 h-12 mx-auto mb-4" />
          <div className="text-6xl font-bold">{user.vouchScore}</div>
          <div className="text-xl mt-2">Vouch Score</div>
          <div className="text-blue-100 mt-1">Tier: {user.vouchTier || 'NEW'}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: <CheckCircle />, label: 'Completed', value: user.completedContracts || 0 },
            { icon: <Award />, label: 'Total Contracts', value: (user.totalContractsAsClient || 0) + (user.totalContractsAsProvider || 0) },
            { icon: <Clock />, label: 'Member Since', value: new Date(user.createdAt).toLocaleDateString() },
          ].map((s, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border text-center">
              <div className="text-blue-600 mb-2 flex justify-center">{s.icon}</div>
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 border">
          <h2 className="font-semibold text-lg mb-4">Score Breakdown</h2>
          {[
            { label: 'Completion Rate', score: 40, max: 40 },
            { label: 'Response Time', score: 20, max: 20 },
            { label: 'Reviews', score: 20, max: 20 },
            { label: 'Dispute Resolution', score: 20, max: 20 },
          ].map((item, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>{item.label}</span>
                <span className="font-medium">{item.score}/{item.max}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-600 rounded-full" style={{ width: `${(item.score/item.max)*100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}