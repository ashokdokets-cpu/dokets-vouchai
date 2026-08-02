'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Clock, CheckCircle, DollarSign, User, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function ContractDetailPage() {
  const { id } = useParams();
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    fetch('https://dokets-vouchai.onrender.com/api/contracts/' + id)
      .then(r => r.json()).then(setContract);
  }, [id]);

  if (!contract) return <div className="p-8 text-center">Loading...</div>;

  const statusColor = contract.status === 'COMPLETED' ? 'green' : contract.status === 'ACTIVE' ? 'blue' : 'yellow';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/dashboard/client" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">{contract.title}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${statusColor}-100 text-${statusColor}-800`}>
              {contract.status.replace('_', ' ')}
            </span>
          </div>

          <p className="text-gray-600 mb-8">{contract.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { icon: <DollarSign className="w-5 h-5" />, label: 'Amount', value: `₹${contract.amount?.toLocaleString()}` },
              { icon: <Calendar className="w-5 h-5" />, label: 'Deadline', value: new Date(contract.deadline).toLocaleDateString() },
              { icon: <User className="w-5 h-5" />, label: 'Client', value: contract.client?.name || 'N/A' },
              { icon: <User className="w-5 h-5" />, label: 'Provider', value: contract.provider?.name || 'Pending' },
              { icon: <MapPin className="w-5 h-5" />, label: 'Location', value: contract.location || 'Remote' },
              { icon: <Clock className="w-5 h-5" />, label: 'Created', value: new Date(contract.createdAt).toLocaleDateString() },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-xl">
                <div className="text-gray-500 mb-1">{item.icon}</div>
                <div className="text-xs text-gray-500">{item.label}</div>
                <div className="font-semibold">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold mb-2">Vouch ID</h3>
            <code className="text-sm bg-gray-200 px-3 py-1 rounded">{contract.vouchId}</code>
          </div>
        </div>
      </div>
    </div>
  );
}