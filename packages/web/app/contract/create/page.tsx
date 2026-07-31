'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function CreateContractPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    clientPhone: '', clientName: '', providerPhone: '',
    title: '', description: '', amount: '', currency: 'INR',
    deadline: '', location: '', category: 'general'
  });
  const [contract, setContract] = useState<any>(null);
  const [paymentHeld, setPaymentHeld] = useState(false);

  const handleCreate = async () => {
    try {
      const clientRes = await fetch('http://localhost:3001/api/users/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: form.clientPhone, name: form.clientName || 'Client', country: 'IN', language: 'en' })
      });
      const clientData = await clientRes.json();

      const contractRes = await fetch('http://localhost:3001/api/contracts', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title, description: form.description, category: form.category,
          amount: parseFloat(form.amount), currency: form.currency,
          clientId: clientData.user.id, providerPhone: form.providerPhone,
          deadline: new Date(form.deadline).toISOString(), location: form.location,
          country: 'IN', language: 'en'
        })
      });
      const contractData = await contractRes.json();
      setContract(contractData.contract);
      setStep(3);
      toast.success('Contract created!');
    } catch { toast.error('Failed to create contract'); }
  };

  const handlePay = async () => {
    if (!contract) return;
    try {
      await fetch('http://localhost:3001/api/payments/hold', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractId: contract.id, amount: contract.amount, currency: contract.currency,
          gateway: 'RAZORPAY', fromUserId: contract.clientId, toUserId: contract.providerId
        })
      });
      setPaymentHeld(true);
      toast.success('Payment secured in escrow!');
    } catch { toast.error('Payment failed'); }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Toaster position="top-center" />
      <div className="max-w-2xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8 text-center">
            {step === 1 ? '📝 Create Contract' : step === 2 ? '🔒 Review' : '✅ Done!'}
          </h1>

          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Your Phone</label>
                  <input type="text" placeholder="+919876543210" value={form.clientPhone}
                    onChange={e => setForm({...form, clientPhone: e.target.value})}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" /></div>
                <div><label className="block text-sm font-medium mb-1">Your Name</label>
                  <input type="text" placeholder="Ramesh Kumar" value={form.clientName}
                    onChange={e => setForm({...form, clientName: e.target.value})}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" /></div>
              </div>
              <div><label className="block text-sm font-medium mb-1">Provider Phone</label>
                <input type="text" placeholder="+919922222222" value={form.providerPhone}
                  onChange={e => setForm({...form, providerPhone: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" /></div>
              <div><label className="block text-sm font-medium mb-1">Work Title</label>
                <input type="text" placeholder="Living Room Painting" value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" /></div>
              <div><label className="block text-sm font-medium mb-1">Description</label>
                <textarea placeholder="Describe the work..." value={form.description}
                  onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-24" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Amount (₹)</label>
                  <input type="number" placeholder="15000" value={form.amount}
                    onChange={e => setForm({...form, amount: e.target.value})}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" /></div>
                <div><label className="block text-sm font-medium mb-1">Deadline</label>
                  <input type="datetime-local" value={form.deadline}
                    onChange={e => setForm({...form, deadline: e.target.value})}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" /></div>
              </div>
              <button onClick={() => setStep(2)}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 mt-4">
                📋 Review Contract
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-3">Contract Summary</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Work:</strong> {form.title}</p>
                  <p><strong>Amount:</strong> ₹{parseFloat(form.amount).toLocaleString()}</p>
                  <p><strong>Fee (1%):</strong> ₹{Math.round(parseFloat(form.amount) * 0.01)}</p>
                  <p><strong>Deadline:</strong> {form.deadline}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-3 border rounded-xl font-semibold">✏️ Edit</button>
                <button onClick={handleCreate} className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700">✅ Confirm</button>
              </div>
            </div>
          )}

          {step === 3 && contract && (
            <div className="text-center space-y-4">
              <div className="text-6xl">🎉</div>
              <h2 className="text-2xl font-bold">Contract Created!</h2>
              <p className="text-gray-600">Vouch ID: <span className="font-mono font-bold">{contract.vouchId}</span></p>
              {!paymentHeld ? (
                <button onClick={handlePay}
                  className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-purple-700">
                  💰 Secure Payment (₹{contract.amount?.toLocaleString()})
                </button>
              ) : (
                <div className="bg-green-50 p-6 rounded-xl text-green-800">
                  <p className="font-bold text-lg">🔒 Payment Secured!</p>
                </div>
              )}
              <button onClick={() => router.push('/dashboard')}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700">
                📋 Go to Dashboard
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}