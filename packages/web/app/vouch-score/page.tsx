'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Star, Shield, Award, TrendingUp, CheckCircle, Clock } from 'lucide-react';

export default function VouchScorePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => { if (!user && !loading) router.push('/login'); }, [user, loading]);

  if (loading || !user) return <div className="p-8 text-center">Loading...</div>;

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
            { icon: <Award />, label: 'Contracts', value: (user.totalContractsAsClient || 0) + (user.totalContractsAsProvider || 0) },
            { icon: <Clock />, label: 'Joined', value: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A' },
          ].map((s, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border text-center"><div className="text-blue-600 mb-2 flex justify-center">{s.icon}</div><div className="text-xl font-bold">{s.value}</div><div className="text-xs text-gray-500">{s.label}</div></div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-6 border">
          <h2 className="font-semibold text-lg mb-4">Score Breakdown</h2>
          {[{ label: 'Completion Rate', score: 40, max: 40 }, { label: 'Response Time', score: 20, max: 20 }, { label: 'Reviews', score: 20, max: 20 }, { label: 'Dispute Resolution', score: 20, max: 20 }].map((item, i) => (
            <div key={i} className="mb-4"><div className="flex justify-between text-sm mb-1"><span>{item.label}</span><span className="font-medium">{item.score}/{item.max}</span></div><div className="h-2 bg-gray-200 rounded-full"><div className="h-2 bg-blue-600 rounded-full" style={{ width: `${(item.score/item.max)*100}%` }} /></div></div>
          ))}
        </div>
      </div>
    </div>
  );
}