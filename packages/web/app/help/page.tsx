import type { Metadata } from 'next';
import { MessageCircle, Phone, Mail, BookOpen, Play } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Help & Support - Dokets VouchAI',
  description: 'Get help with Dokets VouchAI. WhatsApp support, guides, and FAQs.',
};

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-2">Help & Support</h1>
        <p className="text-gray-500 mb-12">We're here to help you every step of the way</p>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: <MessageCircle className="w-8 h-8" />, title: 'WhatsApp Support', desc: 'Chat with us instantly', action: 'Message +12232264859', href: 'https://wa.me/12232264859' },
            { icon: <Mail className="w-8 h-8" />, title: 'Email Us', desc: 'Get a response within 24 hours', action: 'contact@dokets.com', href: 'mailto:contact@dokets.com' },
            { icon: <BookOpen className="w-8 h-8" />, title: 'FAQ', desc: 'Find answers quickly', action: 'View FAQ', href: '/faq' },
          ].map((item, i) => (
            <a key={i} href={item.href} target={item.href.startsWith('http') ? '_blank' : '_self'}
              className="bg-white p-6 rounded-2xl border text-center hover:shadow-md transition-all">
              <div className="text-blue-600 mb-3 flex justify-center">{item.icon}</div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
              <span className="text-blue-600 text-sm font-medium mt-3 inline-block">{item.action}</span>
            </a>
          ))}
        </div>

        {/* Getting Started Guide */}
        <div className="bg-white rounded-2xl border p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">📖 Getting Started Guide</h2>
          <div className="space-y-6">
            {[
              { step: '1', title: 'Send "Hi" on WhatsApp', desc: 'Message +12232264859 on WhatsApp to activate your account. This is required only once.' },
              { step: '2', title: 'Login with OTP', desc: 'Enter your phone number on dokets.com/login. You will receive a 6-digit code on WhatsApp.' },
              { step: '3', title: 'Create a Contract', desc: 'As a Client: Post a job or create a contract. As a Provider: Browse jobs and apply.' },
              { step: '4', title: 'Secure Payment', desc: 'Client pays into escrow. Money is held safely until work is verified.' },
              { step: '5', title: 'Complete & Release', desc: 'Provider uploads proof → AI verifies → Client releases payment → Provider gets paid!' },
            ].map((s, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{s.step}</div>
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-gray-600 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <h2 className="font-semibold text-lg text-yellow-800 mb-3">⚠️ Important Notes</h2>
          <ul className="space-y-2 text-sm text-yellow-700">
            <li>📱 <strong>First-time users:</strong> You MUST send a WhatsApp message to +12232264859 before receiving OTPs.</li>
            <li>💰 <strong>Payment Release:</strong> Only the CLIENT can release payment. It is never auto-released.</li>
            <li>⏰ <strong>API Wake-up:</strong> First request may take 30-50 seconds if the server was idle.</li>
            <li>🌍 <strong>Global:</strong> We support 25 currencies and 27 countries.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}