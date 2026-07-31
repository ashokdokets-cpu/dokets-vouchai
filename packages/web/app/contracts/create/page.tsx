'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, ArrowLeft, Check, Shield, Sparkles,
  CreditCard, Calendar, MapPin, Phone, User, FileText,
  Briefcase, DollarSign
} from 'lucide-react';

const SERVICES = [
  { id: 'painting', icon: '🎨', name: 'Painting', cat: 'Home' },
  { id: 'plumbing', icon: '🔧', name: 'Plumbing', cat: 'Home' },
  { id: 'electrical', icon: '⚡', name: 'Electrical', cat: 'Home' },
  { id: 'cleaning', icon: '🧹', name: 'Cleaning', cat: 'Home' },
  { id: 'carpentry', icon: '🪚', name: 'Carpentry', cat: 'Home' },
  { id: 'tutoring', icon: '📚', name: 'Tutoring', cat: 'Education' },
  { id: 'driving', icon: '🚗', name: 'Driving', cat: 'Transport' },
  { id: 'photography', icon: '📸', name: 'Photography', cat: 'Events' },
  { id: 'catering', icon: '🍽️', name: 'Catering', cat: 'Events' },
  { id: 'development', icon: '💻', name: 'Development', cat: 'Tech' },
  { id: 'design', icon: '🎨', name: 'Design', cat: 'Tech' },
  { id: 'delivery', icon: '📦', name: 'Delivery', cat: 'Logistics' },
];

const STEPS = ['Details', 'Service', 'Payment', 'Done'];

export default function CreateContractPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    clientPhone: '', clientName: '',
    providerPhone: '', providerName: '',
    service: '', title: '', description: '',
    amount: '', currency: 'INR',
    deadline: '', location: '',
  });
  const [contract, setContract] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const updateForm = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));
  const canNext = () => {
    if (step === 1) return form.clientPhone && form.providerPhone;
    if (step === 2) return form.service && form.title;
    if (step === 3) return form.amount && form.deadline;
    return true;
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      const cr = await fetch('https://dokets-vouchai.onrender.com/api/users/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: form.clientPhone, name: form.clientName || 'Client', country: 'IN', language: 'en' })
      });
      const client = (await cr.json()).user;

      const res = await fetch('https://dokets-vouchai.onrender.com/api/contracts', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title, description: form.description, category: form.service,
          amount: Number(form.amount), currency: form.currency, clientId: client.id,
          providerPhone: form.providerPhone,
          deadline: new Date(form.deadline).toISOString(),
          location: form.location, country: 'IN', language: 'en'
        })
      });
      setContract((await res.json()).contract);
      setStep(4);
    } catch { alert('Error. Please try again.'); }
    setLoading(false);
  };

  const handleHoldPayment = async () => {
    await fetch('https://dokets-vouchai.onrender.com/api/payments/hold', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contractId: contract.id, amount: contract.amount, currency: contract.currency, gateway: 'RAZORPAY', fromUserId: contract.clientId, toUserId: contract.providerId })
    });
    alert('Payment secured in escrow!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-1 mb-10">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-200 text-gray-500'
              }`}>{step > i + 1 ? <Check className="w-4 h-4" /> : i + 1}</div>
              {i < 3 && <div className={`w-8 sm:w-12 h-0.5 ${step > i + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{STEPS[step - 1]}</h2>
            <p className="text-gray-500 text-sm mt-1">
              {step === 1 && 'Who is involved in this contract?'}
              {step === 2 && 'What service do you need?'}
              {step === 3 && 'Set payment and deadline'}
              {step === 4 && 'Your contract is ready!'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-2xl p-4 mb-4">
                  <div className="flex items-center gap-2 text-blue-700 text-sm font-medium">
                    <User className="w-4 h-4" /> Your Details (Client)
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Phone *</label>
                    <input type="text" placeholder="+91 98765 43210" value={form.clientPhone}
                      onChange={e => updateForm('clientPhone', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Name</label>
                    <input type="text" placeholder="Your name" value={form.clientName}
                      onChange={e => updateForm('clientName', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                  </div>
                </div>
                <div className="bg-purple-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-purple-700 text-sm font-medium">
                    <Briefcase className="w-4 h-4" /> Provider Details
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Phone *</label>
                    <input type="text" placeholder="+91 98765 43210" value={form.providerPhone}
                      onChange={e => updateForm('providerPhone', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Name</label>
                    <input type="text" placeholder="Provider name" value={form.providerName}
                      onChange={e => updateForm('providerName', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm" />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <label className="text-xs font-medium text-gray-600 block">Service Category</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {SERVICES.map(s => (
                    <button key={s.id} onClick={() => updateForm('service', s.id)}
                      className={`p-3 rounded-xl text-sm border-2 text-left transition-all ${
                        form.service === s.id ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-gray-300 bg-white'
                      }`}>
                      <span className="text-lg">{s.icon}</span>
                      <span className="block text-xs font-medium mt-1">{s.name}</span>
                    </button>
                  ))}
                </div>
                <div className="pt-4">
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Work Title *</label>
                  <input type="text" placeholder="e.g., Living Room Painting" value={form.title}
                    onChange={e => updateForm('title', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Description</label>
                  <textarea placeholder="Describe the work in detail..." value={form.description}
                    onChange={e => updateForm('description', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm h-20 resize-none" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Amount *</label>
                    <input type="number" placeholder="15000" value={form.amount}
                      onChange={e => updateForm('amount', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg font-semibold" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Currency</label>
                    <select value={form.currency} onChange={e => updateForm('currency', e.target.value)}
                      className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                      {['INR','USD','EUR','GBP','AED','SGD'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Deadline *</label>
                    <input type="datetime-local" value={form.deadline}
                      onChange={e => updateForm('deadline', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Location</label>
                    <input type="text" placeholder="Mumbai, India" value={form.location}
                      onChange={e => updateForm('location', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Platform Fee (1%)</span>
                    <span className="font-semibold">₹{Math.round((Number(form.amount) || 0) * 0.01).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">You Pay</span>
                    <span className="font-bold text-lg">₹{(Number(form.amount) || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-blue-600">
                    <Shield className="w-3 h-3" /> Secured in escrow
                  </div>
                </div>
              </div>
            )}

            {step === 4 && contract && (
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Contract Created!</h2>
                <div className="bg-gray-50 rounded-2xl p-5 mt-4 text-left space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Vouch ID</span><span className="font-mono font-bold">{contract.vouchId}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Amount</span><span className="font-bold">{contract.currency} {contract.amount}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Status</span><span className="text-yellow-600 font-medium">{contract.status}</span></div>
                </div>
                <div className="space-y-3 mt-6">
                  <button onClick={handleHoldPayment} className="w-full bg-purple-600 text-white py-3.5 rounded-2xl font-semibold hover:bg-purple-700 transition-all shadow-sm">
                    💰 Secure Payment in Escrow
                  </button>
                  <button onClick={() => router.push('/dashboard/client')} className="w-full bg-blue-600 text-white py-3.5 rounded-2xl font-semibold hover:bg-blue-700 transition-all shadow-sm">
                    📋 Go to Dashboard
                  </button>
                </div>
              </div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          {step < 4 && (
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <button onClick={() => setStep(s => s - 1)} className="flex-1 py-3.5 border-2 border-gray-200 rounded-2xl font-semibold text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              )}
              <button onClick={() => step < 3 ? setStep(s => s + 1) : handleCreate()} disabled={!canNext() || loading}
                className="flex-1 bg-blue-600 text-white py-3.5 rounded-2xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all shadow-sm flex items-center justify-center gap-2">
                {step === 3 ? (loading ? 'Creating...' : <><Sparkles className="w-4 h-4" /> Create Contract</>) : <>Next <ArrowRight className="w-4 h-4" /></>}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}