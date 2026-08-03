import type { Metadata } from 'next';
import { Shield, Zap, DollarSign, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Why Dokets - The Smart Choice for Secure Transactions',
  description: 'Compare VouchAI with traditional platforms. 1% fee, AI verification, WhatsApp integration, and global coverage.',
};

export default function WhyDoketsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">Why Choose Dokets?</h1>
        <p className="text-xl text-gray-500 mb-12">The smarter way to secure any deal</p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {[
            { icon: <DollarSign className="w-6 h-6" />, title: '1% Platform Fee', desc: 'Lowest in the industry. Upwork charges 20%, Fiverr 20%, Escrow.com 3-6%.' },
            { icon: <Zap className="w-6 h-6" />, title: 'AI-Powered', desc: 'Smart contracts, AI verification, and automated mediation save time and money.' },
            { icon: <Shield className="w-6 h-6" />, title: 'Secure Escrow', desc: 'Your money is held safely until work is verified. Complete peace of mind.' },
            { icon: <Globe className="w-6 h-6" />, title: 'Truly Global', desc: '15+ currencies, 10+ languages, works everywhere via WhatsApp.' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-2xl">
              <div className="text-blue-600 mb-3">{item.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}