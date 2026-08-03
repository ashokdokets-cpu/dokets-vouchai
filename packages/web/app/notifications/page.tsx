'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Bell, CheckCircle, Briefcase, DollarSign, Star, MessageCircle } from 'lucide-react';

const notifications = [
  { icon: <CheckCircle className="w-5 h-5 text-green-500" />, title: 'Contract Completed', desc: 'Bedroom Painting marked as complete', time: '2 hours ago' },
  { icon: <DollarSign className="w-5 h-5 text-purple-500" />, title: 'Payment Released', desc: '₹8,000 released to provider', time: '2 hours ago' },
  { icon: <Star className="w-5 h-5 text-yellow-500" />, title: 'Vouch Score Updated', desc: 'Your score increased by +10', time: '2 hours ago' },
  { icon: <Briefcase className="w-5 h-5 text-blue-500" />, title: 'New Job Posted', desc: 'Logo Design job is now live', time: '1 hour ago' },
  { icon: <MessageCircle className="w-5 h-5 text-orange-500" />, title: 'WhatsApp Message', desc: 'Provider responded to your contract', time: '30 min ago' },
];

export default function NotificationsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (!user && !loading) router.push('/login');
  if (loading || !user) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">🔔 Notifications</h1>
        <div className="space-y-3">
          {notifications.map((n, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border shadow-sm flex items-start gap-4">
              <div className="mt-1">{n.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{n.title}</h3>
                <p className="text-gray-500 text-sm">{n.desc}</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">{n.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}