'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Shield, AlertCircle, MessageCircle, CheckCircle, Clock, Plus, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function DisputesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [disputes, setDisputes] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ contractId: '', description: '', category: 'quality' });
  const [contracts, setContracts] = useState<any[]>([]);

  useEffect(() => {
    if (!user && !loading) router.push('/login');
    if (user) {
      fetch('https://dokets-vouchai.onrender.com/api/contracts/user/' + user.id)
        .then(r => r.json()).then(d => {
          setContracts(Array.isArray(d) ? d.filter((c: any) => c.status === 'ACTIVE' || c.status === 'COMPLETED') : []);
        });
    }
  }, [user, loading]);

  const handleRaiseDispute = async () => {
    if (!form.contractId) return alert('Select a contract');
    const res = await fetch('https://dokets-vouchai.onrender.com/api/mediation/mediate', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contractId: form.contractId,
        raisedById: user.id,
        description: form.description,
        category: form.category
      })
    });
    const data = await res.json();
    if (data.success) {
      alert('Dispute raised! AI will mediate.');
      setShowForm(false);
      setForm({ contractId: '', description: '', category: 'quality' });
    } else {
      alert('Failed to raise dispute: ' + (data.error || 'Try again'));
    }
  };

  if (loading || !user) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">⚖️ Dispute Resolution</h1>
            <p className="text-gray-500 mt-1">AI-powered fair resolution for all disputes</p>
          </div>
          <button onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Raise Dispute
          </button>
        </div>

        {/* Raise Dispute Form */}
        {showForm && (
          <div className="bg-white rounded-2xl p-6 border mb-8 shadow-lg">
            <h2 className="font-semibold text-lg mb-4">Raise a New Dispute</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Select Contract</label>
                <select value={form.contractId} onChange={e => setForm({...form, contractId: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="">Choose a contract...</option>
                  {contracts.map((c: any) => (
                    <option key={c.id} value={c.id}>{c.title} (₹{c.amount})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="quality">Quality Issue</option>
                  <option value="delay">Delay</option>
                  <option value="payment">Payment Dispute</option>
                  <option value="scope">Scope Change</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <textarea placeholder="Describe the issue in detail..." value={form.description}
                  onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-24" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowForm(false)}
                  className="flex-1 py-3 border rounded-xl font-medium hover:bg-gray-50">Cancel</button>
                <button onClick={handleRaiseDispute} disabled={!form.contractId || !form.description}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50">
                  Submit Dispute
                </button>
              </div>
            </div>
          </div>
        )}

        {/* How it works */}
        <div className="bg-white rounded-2xl p-6 border mb-8">
          <h2 className="font-semibold text-lg mb-4">How AI Mediation Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: <MessageCircle className="w-6 h-6" />, title: '1. Raise Dispute', desc: 'Describe the issue with evidence and select the contract' },
              { icon: <Shield className="w-6 h-6" />, title: '2. AI Analysis', desc: 'AI reviews contract details, chat history, and evidence' },
              { icon: <CheckCircle className="w-6 h-6" />, title: '3. Resolution', desc: 'Fair resolution proposed in minutes based on data' },
            ].map((s, i) => (
              <div key={i} className="text-center p-4">
                <div className="text-blue-600 mb-2 flex justify-center">{s.icon}</div>
                <div className="font-semibold text-sm">{s.title}</div>
                <div className="text-xs text-gray-500 mt-1">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Disputes */}
        <h2 className="text-xl font-bold mb-4">Your Disputes</h2>
        {disputes.length === 0 && !showForm ? (
          <div className="text-center py-16 bg-white rounded-2xl border">
            <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No active disputes</p>
            <p className="text-gray-400 text-sm mt-1">Disputes are resolved quickly with AI mediation</p>
            <button onClick={() => setShowForm(true)}
              className="text-blue-600 hover:underline mt-4 inline-block font-medium">
              Raise a Dispute →
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {disputes.map(d => (
              <div key={d.id} className="bg-white p-6 rounded-2xl border">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{d.contract?.title || 'Contract'}</h3>
                    <p className="text-sm text-gray-500">{d.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    d.status === 'RESOLVED' ? 'bg-green-100 text-green-700' :
                    d.status === 'OPEN' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                  }`}>{d.status}</span>
                </div>
                {d.aiRecommendation && (
                  <div className="mt-3 bg-green-50 p-3 rounded-xl text-sm text-green-800">
                    ✅ AI Recommendation: {d.aiRecommendation}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}