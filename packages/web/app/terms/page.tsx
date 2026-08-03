import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions - VouchAI',
  description: 'Terms and conditions for using VouchAI platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16 prose">
        <h1>Terms & Conditions</h1>
        <p>Last updated: August 2026</p>
        <h2>1. Acceptance of Terms</h2>
        <p>By using VouchAI, you agree to these terms. VouchAI is a product of Charvak IT Consulting Pvt Ltd.</p>
        <h2>2. Platform Fee</h2>
        <p>VouchAI charges a 1% platform fee on all transactions processed through escrow.</p>
        <h2>3. Dispute Resolution</h2>
        <p>Disputes are first handled by AI mediation. Unresolved disputes may be escalated to human review.</p>
        <h2>4. Contact</h2>
        <p>📧 <a href="mailto:contact@dokets.com">contact@dokets.com</a></p>
      </div>
    </div>
  );
}