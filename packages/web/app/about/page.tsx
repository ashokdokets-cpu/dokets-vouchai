import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Globe, Users, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About VouchAI - AI-Powered Trust Platform',
  description: 'VouchAI is a product of Charvak IT Consulting Pvt Ltd, building trust in every deal through AI and escrow technology.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">About VouchAI</h1>
        <p className="text-xl text-gray-500 mb-8">A Product of Charvak IT Consulting Pvt Ltd</p>
        
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed mb-6">
            VouchAI is the world's first AI-powered micro-escrow platform designed for the global informal economy. 
            We enable trust between clients and service providers through smart contracts, secure payments, and AI verification.
          </p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed mb-6">
            To bring trust and accountability to every transaction, making secure deals accessible to everyone—no lawyers, no paperwork, just trust.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-12">
            {[
              { icon: <Shield className="w-8 h-8" />, label: 'Trust First', desc: 'AI-powered verification' },
              { icon: <Globe className="w-8 h-8" />, label: 'Global Reach', desc: '15+ currencies, 10+ languages' },
              { icon: <Users className="w-8 h-8" />, label: 'For Everyone', desc: 'No lawyers needed' },
              { icon: <Award className="w-8 h-8" />, label: '1% Fee', desc: 'Lowest in industry' },
            ].map((item, i) => (
              <div key={i} className="text-center p-4">
                <div className="text-blue-600 mb-2 flex justify-center">{item.icon}</div>
                <div className="font-semibold">{item.label}</div>
                <div className="text-sm text-gray-500">{item.desc}</div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Our Products</h2>
          <ul className="space-y-3 text-lg">
            <li>🔗 <a href="https://dokets.com" className="text-blue-600 hover:underline">Dokets.com</a> - AI Micro-Escrow Platform</li>
            <li>📄 <a href="https://www.doketsrb.com" className="text-blue-600 hover:underline">Dokets Resume Builder</a> - Free Professional Resume Builder</li>
            <li>🛍️ <a href="https://www.dokets.shop" className="text-blue-600 hover:underline">Dokets Shop</a> - Online Store</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Contact</h2>
          <p className="text-lg">📧 <a href="mailto:contact@dokets.com" className="text-blue-600 hover:underline">contact@dokets.com</a></p>
          <p className="text-lg">🏢 Charvak IT Consulting Pvt Ltd</p>
        </div>
      </div>
    </div>
  );
}