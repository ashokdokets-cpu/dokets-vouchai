'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { MapPin, Globe, Briefcase, DollarSign, Calendar, ArrowRight } from 'lucide-react';

export default function PostJobPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    title: '', description: '', amount: '', currency: 'INR',
    jobType: 'REMOTE', category: 'General',
    location: '', country: 'GLOBAL', city: '',
    deadline: ''
  });
  const [customCategory, setCustomCategory] = useState('');

  const handleSubmit = async () => {
    if (!user) return alert('Please login first');
    const res = await fetch('https://dokets-vouchai.onrender.com/api/jobs', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, amount: Number(form.amount), clientId: user.id })
    });
    const data = await res.json();
    if (data.success) {
      router.push('/jobs');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-6">📋 Post a Job</h1>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Job Title *</label>
              <input type="text" placeholder="e.g., Website Development" value={form.title}
                onChange={e => setForm({...form, title: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Description *</label>
              <textarea placeholder="Describe the work needed..." value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-24" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Amount *</label>
                <input type="number" placeholder="5000" value={form.amount}
                  onChange={e => setForm({...form, amount: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Currency</label>
                <select value={form.currency} onChange={e => setForm({...form, currency: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>INR</option><option>USD</option><option>EUR</option><option>GBP</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Job Type *</label>
                <select value={form.jobType} onChange={e => setForm({...form, jobType: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="REMOTE">🌍 Remote</option>
                  <option value="LOCAL">🏠 Local</option>
                  <option value="HYBRID">🔄 Hybrid</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
  <option value="">Select Category</option>
  <option value="General">General</option>
  <option value="Development">💻 Development</option>
  <option value="Design">🎨 Design</option>
  <option value="Writing">✍️ Writing</option>
  <option value="Marketing">📢 Marketing</option>
  <option value="Video">🎥 Video</option>
  <option value="Music">🎵 Music</option>
  <option value="Business">💼 Business</option>
  <option value="Education">📚 Education</option>
  <option value="Health">🏥 Health</option>
  <option value="Fashion">👗 Fashion</option>
  <option value="Food">🍳 Food</option>
  <option value="Travel">✈️ Travel</option>
  <option value="Legal">⚖️ Legal</option>
  <option value="Custom">✨ Custom (Type Your Own)</option>
</select>

{form.category === 'Custom' && (
  <input type="text" placeholder="Enter your custom service category..." value={customCategory}
    onChange={e => setCustomCategory(e.target.value)}
    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none mt-2" />
)}
              </div>
            </div>

            {form.jobType !== 'REMOTE' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Location</label>
                  <input type="text" placeholder="Mumbai" value={form.location}
                    onChange={e => setForm({...form, location: e.target.value})}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Country</label>
                  <input type="text" placeholder="IN" value={form.country}
                    onChange={e => setForm({...form, country: e.target.value})}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-1 block">Deadline</label>
              <input type="datetime-local" value={form.deadline}
                onChange={e => setForm({...form, deadline: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <button onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-blue-700 flex items-center justify-center gap-2">
              Post Job <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}