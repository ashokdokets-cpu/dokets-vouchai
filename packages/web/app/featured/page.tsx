'use client';

import { useState, useEffect } from 'react';
import { Star, Crown, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export default function FeaturedPage() {
  const [providers, setProviders] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://dokets-vouchai.onrender.com/api/featured')
      .then(r => r.json()).then(setProviders);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold">⭐ Featured Providers</h1>
          <p className="text-xl text-yellow-100 mt-2">Top-rated professionals ready to work worldwide</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Boost CTA */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 mb-8 text-center border-2 border-dashed border-yellow-300">
          <h2 className="text-2xl font-bold mb-2">🚀 Boost Your Profile</h2>
          <p className="text-gray-600 mb-4">Get 5x more job invites by appearing at the top</p>
          <div className="flex justify-center gap-4 mb-6">
            {[
              { plan: 'weekly', price: '$5', days: '7 days' },
              { plan: 'monthly', price: '$10', days: '30 days' },
              { plan: 'quarterly', price: '$25', days: '90 days' },
            ].map(p => (
              <div key={p.plan} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="font-bold text-lg">{p.price}</div>
                <div className="text-xs text-gray-500">{p.days}</div>
              </div>
            ))}
          </div>
          <Link href="/settings" className="bg-yellow-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-yellow-600 inline-block">
            Boost Now
          </Link>
        </div>

        {/* Featured Grid */}
        <h2 className="text-2xl font-bold mb-6">Featured Providers</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((p, i) => (
            <Link href={`/providers/${p.id}`} key={i}
              className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-xl font-bold">{p.name?.[0]}</div>
                <div>
                  <div className="font-semibold flex items-center gap-1">{p.name} <Crown className="w-4 h-4 text-yellow-500" /></div>
                  <div className="text-xs text-gray-500">{p.country || 'Global'}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-current" /> {p.vouchScore}</span>
                <span>{p.completedContracts || 0} jobs</span>
                <span className="text-yellow-600 font-medium">{p.vouchTier}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}