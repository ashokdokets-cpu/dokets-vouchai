'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Bell, CheckCircle, Briefcase, DollarSign, Star, MessageCircle, Clock } from 'lucide-react';
import Link from 'next/link';

export default function NotificationsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!user && !loading) router.push('/login');
    if (user) {
      // Fetch real notifications from contracts
      fetch('https://dokets-vouchai.onrender.com/api/contracts/user/' + user.id)
        .then(r => r.json()).then(contracts => {
          if (Array.isArray(contracts)) {
            const notifs = contracts.slice(0, 10).map((c: any) => {
              const isCompleted = c.status === 'COMPLETED';
              const isActive = c.status === 'ACTIVE';
              return {
                icon: isCompleted ? <CheckCircle className="w-5 h-5 text-green-500" /> :
                      isActive ? <Briefcase className="w-5 h-5 text-blue-500" /> :
                      <Clock className="w-5 h-5 text-yellow-500" />,
                title: isCompleted ? 'Contract Completed' : isActive ? 'Contract Active' : 'Contract Pending',
                desc: `${c.title} - ${c.status.replace('_', ' ')}`,
                time: getTimeAgo(c.updatedAt || c.createdAt),
                href: `/contracts/${c.id}`
              };
            });
            setNotifications(notifs.length > 0 ? notifs : getDefaultNotifications());
          }
        }).catch(() => setNotifications(getDefaultNotifications()));
    }
  }, [user, loading]);

  function getTimeAgo(date: string) {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }

  function getDefaultNotifications() {
    return [
      { icon: <CheckCircle className="w-5 h-5 text-green-500" />, title: 'Welcome to Dokets VouchAI!', desc: 'Your account is ready. Create your first contract.', time: 'Just now', href: '/contracts/create' },
      { icon: <Star className="w-5 h-5 text-yellow-500" />, title: 'Vouch Score Active', desc: 'Your trust score is 100. Complete contracts to increase it.', time: 'Just now', href: '/vouch-score' },
      { icon: <MessageCircle className="w-5 h-5 text-orange-500" />, title: 'WhatsApp Connected', desc: 'Send Hi to +12232264859 to activate WhatsApp notifications.', time: 'Just now', href: '/help' },
    ];
  }

  if (loading || !user) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">🔔 Notifications</h1>
          {notifications.length > 0 && (
            <span className="text-sm text-gray-500">{notifications.length} notifications</span>
          )}
        </div>

        <div className="space-y-3">
          {notifications.map((n, i) => (
            <Link key={i} href={n.href || '#'} 
              className="bg-white p-5 rounded-2xl border shadow-sm flex items-start gap-4 hover:shadow-md transition-all">
              <div className="mt-1">{n.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{n.title}</h3>
                <p className="text-gray-500 text-sm">{n.desc}</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">{n.time}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}