import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - Dokets VouchAI',
  description: 'Frequently asked questions about Dokets VouchAI escrow platform.',
};

const faqs = [
  { q: 'How do I create a contract?', a: 'Go to Dashboard → Create Contract, describe your work, set amount and deadline. The provider will be notified via WhatsApp.' },
  { q: 'How do I receive OTP?', a: 'First-time users must send "Hi" to +12232264859 on WhatsApp. After that, OTPs will be sent automatically when you log in.' },
  { q: 'When does the provider get paid?', a: 'After work is completed and verified, the CLIENT must click "Release Payment". Money is never auto-released.' },
  { q: 'What are the fees?', a: 'Tiered fees: Micro deals have a flat fee, small deals 2%, medium 1.5%, large deals 1%. Varies by currency.' },
  { q: 'Is my money safe?', a: 'Yes! Money is held in escrow until work is verified. If work is not completed, funds are refunded.' },
  { q: 'What is Vouch Score?', a: 'Your reputation score (0-100). Higher scores mean more trust. Earn points by completing contracts successfully.' },
  { q: 'Can I use any currency?', a: 'Yes! We support 25 currencies including INR, USD, EUR, GBP, JPY, AED, and more.' },
  { q: 'How does AI verification work?', a: 'Our AI (GPT-4o Vision) analyzes before/after photos to verify work completion automatically.' },
  { q: 'What if there is a dispute?', a: 'Our AI mediator reviews evidence and proposes a fair resolution. If unresolved, human review is available.' },
  { q: 'Can I post custom services?', a: 'Absolutely! Select "Custom" when posting a job and enter any service category you need.' },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-500 mb-12">Everything you need to know about Dokets VouchAI</p>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="bg-white rounded-2xl border p-6 cursor-pointer group">
              <summary className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">{faq.q}</summary>
              <p className="mt-3 text-gray-600 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}