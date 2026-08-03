'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Briefcase, Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ApplicationsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    if (!user && !loading) router.push('/login');
    if (user) {
      fetch('https://dokets-vouchai.onrender.com/api/jobs/applied/' + user.id)
        .then(r => r.json()).then(setApplications);
    }
  }, [user, loading]);

  if (loading || !user) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">My Applications</h1>
            <p className="text-gray-500 mt-1">Jobs you've applied for</p>
          </div>
          <Link href="/jobs" className="text-blue-600 hover:underline text-sm font-medium flex items-center gap-1">
            Browse More Jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">No applications yet</h3>
            <p className="text-gray-500 mt-1">Browse available jobs and apply</p>
            <Link href="/jobs" className="text-blue-600 hover:underline mt-4 inline-block font-medium">
              Browse Jobs →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app: any) => (
              <motion.div key={app.id} whileHover={{ y: -2 }}
                className="bg-white p-6 rounded-2xl border shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{app.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{app.description?.substring(0, 100)}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className="text-green-600 font-bold">₹{app.amount?.toLocaleString()}</span>
                      <span className="text-gray-400">{app.location}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        app.status === 'OPEN' ? 'bg-yellow-100 text-yellow-700' :
                        app.status === 'ASSIGNED' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>{app.status}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {app.status === 'ASSIGNED' && app.providerId === user.id && (
                      <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Accepted!
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}