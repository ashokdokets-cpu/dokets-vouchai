'use client';

import { useState } from 'react';
import { Shield, AlertCircle, MessageCircle, CheckCircle, Clock } from 'lucide-react';

export default function DisputesPage() {
  const [disputes] = useState([
    { id: '1', contract: 'Room Painting', issue: 'Color mismatch', status: 'RESOLVED', resolution: 'AI mediation successful - partial refund issued', date: 'Aug 2026' },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">⚖️ Dispute Resolution</h1>
        <p className="text-gray-500 mb-8">AI-powered fair resolution for all disputes</p>

        {/* How it works */}
        <div className="bg-white rounded-2xl p-6 border mb-8">
          <h2 className="font-semibold text-lg mb-4">How AI Mediation Works</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: <MessageCircle className="w-6 h-6" />, title: '1. Raise Dispute', desc: 'Describe the issue with evidence' },
              { icon: <Shield className="w-6 h-6" />, title: '2. AI Analysis', desc: 'AI reviews contract & evidence' },
              { icon: <CheckCircle className="w-6 h-6" />, title: '3. Resolution', desc: 'Fair resolution in minutes' },
            ].map((s, i) => (
              <div key={i} className="text-center p-4">
                <div className="text-blue-600 mb-2 flex justify-center">{s.icon}</div>
                <div className="font-semibold text-sm">{s.title}</div>
                <div className="text-xs text-gray-500">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Disputes List */}
        <div className="space-y-4">
          {disputes.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border">
              <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No active disputes</p>
            </div>
          ) : (
            disputes.map(d => (
              <div key={d.id} className="bg-white p-6 rounded-2xl border">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{d.contract}</h3>
                    <p className="text-sm text-gray-500">{d.issue}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {d.status}
                  </span>
                </div>
                {d.resolution && (
                  <div className="mt-3 bg-green-50 p-3 rounded-xl text-sm text-green-800">
                    ✅ {d.resolution}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-blue-700 mt-8">
          Raise a New Dispute
        </button>
      </div>
    </div>
  );
}