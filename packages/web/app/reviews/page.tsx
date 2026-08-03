'use client';

import { Star, ThumbsUp, User } from 'lucide-react';

const reviews = [
  { name: 'Kumar', role: 'Client', rating: 5, comment: 'Amazing platform! Created a contract in 60 seconds. AI verification saved me hours.', date: 'Aug 2026', contract: 'Bedroom Painting' },
  { name: 'Suresh', role: 'Provider', rating: 5, comment: 'Got paid immediately after AI verified my work. No more chasing clients for payment!', date: 'Aug 2026', contract: 'Room Painting' },
  { name: 'Priya', role: 'Client', rating: 4, comment: 'The milestone payments feature is genius. Paid in stages as work progressed.', date: 'Jul 2026', contract: 'House Renovation' },
  { name: 'Rajesh', role: 'Provider', rating: 5, comment: 'WhatsApp integration is a game changer. I get job alerts directly on my phone.', date: 'Jul 2026', contract: 'Plumbing Repair' },
];

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">What Our Users Say</h1>
          <p className="text-xl text-gray-500 mt-2">Trusted by clients and providers worldwide</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
            </div>
            <span className="text-2xl font-bold">4.8/5</span>
            <span className="text-gray-500">(200+ reviews)</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs text-gray-500">{r.role} · {r.contract}</div>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-2">
                {[...Array(5)].map((_, j) => <Star key={j} className={`w-4 h-4 ${j < r.rating ? 'fill-current' : ''}`} />)}
              </div>
              <p className="text-gray-600">{r.comment}</p>
              <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                <ThumbsUp className="w-3 h-3" /> Helpful · {r.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}