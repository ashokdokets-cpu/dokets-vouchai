'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Star, Shield, Award, Briefcase, MapPin, CheckCircle, Camera, MessageCircle } from 'lucide-react';

export default function ProviderProfilePage() {
  const { id } = useParams();
  const [provider, setProvider] = useState<any>(null);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://dokets-vouchai.onrender.com/api/users/' + id)
      .then(r => r.json()).then(setProvider);
  }, [id]);

  if (!provider) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center text-4xl font-bold backdrop-blur">
              {provider.name?.[0]}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{provider.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {provider.vouchScore}/100
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{provider.vouchTier}</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {provider.country || 'India'}
                </span>
              </div>
              <p className="mt-2 text-blue-100">{provider.completedContracts || 0} jobs completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: <CheckCircle className="w-5 h-5" />, label: 'Completed', value: provider.completedContracts || 0 },
            { icon: <Award className="w-5 h-5" />, label: 'Vouch Score', value: provider.vouchScore },
            { icon: <Briefcase className="w-5 h-5" />, label: 'Active Jobs', value: '2' },
          ].map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border text-center">
              <div className="text-blue-600 mb-2 flex justify-center">{s.icon}</div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Portfolio Gallery */}
        <div className="bg-white rounded-2xl p-6 border mb-8">
          <h2 className="text-xl font-bold mb-4">📸 Portfolio</h2>
          <div className="grid grid-cols-3 gap-3">
            {['https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=300', 
              'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=300',
              'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=300'].map((img, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img src={img} alt="Work sample" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl p-6 border">
          <h2 className="text-xl font-bold mb-4">⭐ Reviews</h2>
          <div className="space-y-4">
            {[
              { name: 'Kumar', rating: 5, comment: 'Excellent work! Very professional and completed on time.', date: 'Aug 2026' },
              { name: 'Priya', rating: 4, comment: 'Good quality painting. Would hire again.', date: 'Jul 2026' },
            ].map((r, i) => (
              <div key={i} className="border-b last:border-0 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{r.name}</span>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`w-3 h-3 ${j < r.rating ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{r.date}</span>
                </div>
                <p className="text-gray-600 text-sm">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Button */}
        <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-blue-700 mt-8 flex items-center justify-center gap-2">
          <MessageCircle className="w-5 h-5" /> Contact Provider
        </button>
      </div>
    </div>
  );
}