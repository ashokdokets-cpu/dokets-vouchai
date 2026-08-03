'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { DollarSign, TrendingUp } from 'lucide-react';

export default function PaymentsPage() {
  const { user, loading } = useAuth();
  const [contracts, setContracts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) router.push('/login');
    if (user) {
      fetch('https://dokets-vouchai.onrender.com/api/contracts/user/' + user.id)
        .then(r => r.json()).then(d => setContracts(Array.isArray(d) ? d : []));
    }
  }, [user, loading]);

  if (loading || !user) return <div className="p-8 text-center">Loading...</div>;

  const totalSpent = contracts.reduce((s, c) => s + (c.amount || 0), 0);
  const totalFees = contracts.reduce((s, c) => s + (c.platformFee || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">💰 Payments</h1>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl border"><DollarSign className="w-6 h-6 text-green-600 mb-2" /><div className="text-2xl font-bold">₹{totalSpent.toLocaleString()}</div><div className="text-sm text-gray-500">Total</div></div>
          <div className="bg-white p-6 rounded-2xl border"><TrendingUp className="w-6 h-6 text-purple-600 mb-2" /><div className="text-2xl font-bold">₹{totalFees.toLocaleString()}</div><div className="text-sm text-gray-500">Fees (1%)</div></div>
        </div>
        <div className="space-y-3">
          {contracts.length === 0 ? <div className="text-center py-16 bg-white rounded-2xl border"><p className="text-gray-500">No payments yet</p></div> :
            contracts.map((c, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border flex justify-between items-center">
                <div><h3 className="font-semibold">{c.title}</h3><p className="text-sm text-gray-500">{c.vouchId}</p></div>
                <div className="text-right"><div className="font-bold text-green-600">₹{c.amount?.toLocaleString()}</div><div className="text-xs text-gray-400">Fee: ₹{c.platformFee || 0}</div></div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}