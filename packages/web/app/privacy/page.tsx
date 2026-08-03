import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - VouchAI',
  description: 'VouchAI privacy policy. How we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16 prose">
        <h1>Privacy Policy</h1>
        <p>Last updated: August 2026</p>
        <h2>1. Information We Collect</h2>
        <p>We collect phone numbers, names, and transaction data to provide our escrow services. We do not sell your data.</p>
        <h2>2. How We Use Your Data</h2>
        <p>Your data is used solely for contract creation, payment processing, and communication via WhatsApp.</p>
        <h2>3. Data Security</h2>
        <p>All data is encrypted. Payments are processed through Razorpay and PayPal secure gateways.</p>
        <h2>4. Contact</h2>
        <p>📧 <a href="mailto:contact@dokets.com">contact@dokets.com</a></p>
      </div>
    </div>
  );
}