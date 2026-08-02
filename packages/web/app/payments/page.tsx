'use client';

import { useState } from 'react';
import { DollarSign, TrendingUp, ArrowDown, ArrowUp } from 'lucide-react';

export default function PaymentsPage() {
  const [phone, setPhone] = useState('');
  const [payments, setPayments] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  const loadPayments = async () => {
    const uRes = await fetch('https://dokets-vouchai.onrender.com/api/users/phone/' + phone);
    const u = await uRes.json();
    setUser(u);
    // Load contracts to show payments
    const cRes = await fetch('https://dokets-vouchai.onrender.com/api/contracts/user/' + u.id);
    const contracts = await cRes.json();
    setPayments(contracts.filter((c: any) => c.totalPaid > 0 || c.status === 'COMPLETED'));
  };

  const totalSpent = payments.reduce((s, p) => s + (p.amount || 0), 0);
  const totalFees = payments.reduce((s, p) => s + (p.platformFee || 0), 0);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="text-5xl mb-4">💰</div>
          <h1 className="text-2xl font-bold">Payments</h1>
          <p className="text-gray-500 mt-2 mb-6">Enter phone to view transactions</p>
          <input type="text" placeholder="+919100014859" value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl mb-4 focus:ring-2 focus:ring-blue-500 outline-none" />
          <button onClick={loadPayments}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700">
            View Payments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">💰 Payments</h1>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl border">
            <DollarSign className="w-6 h-6 text-green-600 mb-2" />
            <div className="text-2xl font-bold">₹{totalSpent.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Total Spent</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border">
            <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
            <div className="text-2xl font-bold">₹{totalFees.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Platform Fees (1%)</div>
          </div>
        </div>

        <div className="space-y-3">
          {payments.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border">
              <p className="text-gray-500">No payments yet</p>
            </div>
          ) : (
            payments.map((p, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-sm text-gray-500">{p.vouchId}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">₹{p.amount?.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">Fee: ₹{p.platformFee || 0}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}