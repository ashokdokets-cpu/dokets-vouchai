'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sparkles, Shield, ArrowRight, ArrowLeft } from 'lucide-react';

const SERVICES = [
  { id: 'painting', name: '🎨 Painting', category: 'Home Services' },
  { id: 'plumbing', name: '🔧 Plumbing', category: 'Home Services' },
  { id: 'electrical', name: '⚡ Electrical', category: 'Home Services' },
  { id: 'cleaning', name: '🧹 Cleaning', category: 'Home Services' },
  { id: 'carpentry', name: '🪚 Carpentry', category: 'Home Services' },
  { id: 'tutoring', name: '📚 Tutoring', category: 'Education' },
  { id: 'driving', name: '🚗 Driving', category: 'Transport' },
  { id: 'photography', name: '📸 Photography', category: 'Events' },
  { id: 'catering', name: '🍽️ Catering', category: 'Events' },
  { id: 'development', name: '💻 Development', category: 'Tech' },
  { id: 'design', name: '🎨 Design', category: 'Tech' },
  { id: 'delivery', name: '📦 Delivery', category: 'Logistics' },
];

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'AED', 'SGD', 'AUD', 'CAD', 'BRL'];

export default function CreateContractPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    clientPhone: '', clientName: '',
    providerPhone: '', providerName: '',
    title: '', description: '', category: '',
    amount: '', currency: 'INR',
    deadline: '', location: '',
    upfrontPercent: 20
  });
  const [contract, setContract] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    try {
      const clientRes = await fetch('https://dokets-vouchai.onrender.com/api/users/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: form.clientPhone, name: form.clientName, country: 'IN', language: 'en' })
      });
      const client = (await clientRes.json()).user;

      const contractRes = await fetch('https://dokets-vouchai.onrender.com/api/contracts', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title, description: form.description,
          category: form.category, amount: parseFloat(form.amount),
          currency: form.currency, clientId: client.id,
          providerPhone: form.providerPhone,
          deadline: new Date(form.deadline).toISOString(),
          location: form.location, country: 'IN', language: 'en'
        })
      });
      setContract((await contractRes.json()).contract);
      setStep(4);
    } catch (e) { alert('Error creating contract'); }
    setLoading(false);
  };

  const handleHoldPayment = async () => {
    await fetch('https://dokets-vouchai.onrender.com/api/payments/hold', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contractId: contract.id, amount: contract.amount,
        currency: contract.currency, gateway: 'RAZORPAY',
        fromUserId: contract.clientId, toUserId: contract.providerId
      })
    });
    alert('Payment secured in escrow! 🔒');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Progress */}
        <div className="flex items-center justify-center mb-8 gap-2">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>{s}</div>
              {s < 4 && <div className={`w-12 h-1 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl shadow-xl p-8">
          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold mb-2">📋 Your Details</h2>
              <p className="text-gray-600 mb-6">Who is hiring?</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Your Phone *</label>
                  <input type="text" placeholder="+919876543210" value={form.clientPhone}
                    onChange={e => setForm({...form, clientPhone: e.target.value})}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Your Name</label>
                  <input type="text" placeholder="Ramesh Kumar" value={form.clientName}
                    onChange={e => setForm({...form, clientName: e.target.value})}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Provider Phone *</label>
                  <input type="text" placeholder="+919922222222" value={form.providerPhone}
                    onChange={e => setForm({...form, providerPhone: e.target.value})}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Provider Name</label>
                  <input type="text" placeholder="Suresh" value={form.providerName}
                    onChange={e => setForm({...form, providerName: e.target.value})}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <button onClick={() => setStep(2)} disabled={!form.clientPhone || !form.providerPhone}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2">
                Next <ArrowRight className="w-5 h-5" />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold mb-2">📝 Work Details</h2>
              <p className="text-gray-600 mb-6">Describe the work needed</p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Service Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {SERVICES.slice(0, 9).map(s => (
                    <button key={s.id} onClick={() => setForm({...form, category: s.id})}
                      className={`p-3 rounded-xl text-sm border text-left transition-all ${
                        form.category === s.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                      }`}>
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Work Title *</label>
                <input type="text" placeholder="Living Room Painting" value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea placeholder="Describe the work in detail..." value={form.description}
                  onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-24" />
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-3 border rounded-xl font-semibold flex items-center justify-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={() => setStep(3)} disabled={!form.title}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2">
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-2xl font-bold mb-2">💰 Payment & Timeline</h2>
              <p className="text-gray-600 mb-6">Set amount and deadline</p>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Amount *</label>
                  <input type="number" placeholder="15000" value={form.amount}
                    onChange={e => setForm({...form, amount: e.target.value})}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Currency</label>
                  <select value={form.currency} onChange={e => setForm({...form, currency: e.target.value})}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                    {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Deadline *</label>
                  <input type="datetime-local" value={form.deadline}
                    onChange={e => setForm({...form, deadline: e.target.value})}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input type="text" placeholder="Mumbai, India" value={form.location}
                    onChange={e => setForm({...form, location: e.target.value})}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl mb-6">
                <div className="flex justify-between text-sm">
                  <span>Platform Fee (1%)</span>
                  <span className="font-bold">₹{Math.round((parseFloat(form.amount) || 0) * 0.01)}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>You Pay</span>
                  <span className="font-bold">₹{(parseFloat(form.amount) || 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 mt-3 text-xs text-blue-600">
                  <Shield className="w-3 h-3" /> Payment secured in escrow
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(2)} className="flex-1 py-3 border rounded-xl font-semibold flex items-center justify-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={handleCreate} disabled={loading || !form.amount || !form.deadline}
                  className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" /> {loading ? 'Creating...' : 'Create Contract'}
                </button>
              </div>
            </>
          )}

          {step === 4 && contract && (
            <div className="text-center">
              <div className="text-7xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold mb-2">Contract Created!</h2>
              <p className="text-gray-600 mb-6">Your AI-powered contract is ready</p>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-500">Vouch ID:</span> <span className="font-mono font-bold">{contract.vouchId}</span></div>
                  <div><span className="text-gray-500">Status:</span> <span className="text-yellow-600 font-medium">{contract.status}</span></div>
                  <div><span className="text-gray-500">Amount:</span> <span className="font-bold">{contract.currency} {contract.amount}</span></div>
                  <div><span className="text-gray-500">Fee:</span> {contract.currency} {contract.platformFee}</div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button onClick={handleHoldPayment}
                  className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-purple-700">
                  💰 Secure Payment in Escrow
                </button>
                <button onClick={() => router.push('/dashboard/client')}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700">
                  📋 Go to Dashboard
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}