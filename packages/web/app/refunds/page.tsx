import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refunds & Cancellations - VouchAI',
  description: 'Refund and cancellation policy for VouchAI transactions.',
};

export default function RefundsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16 prose">
        <h1>Refunds & Cancellations</h1>
        <p>Last updated: August 2026</p>
        <h2>1. Escrow Protection</h2>
        <p>Funds are held in escrow until work is verified. If work is not completed, funds are refunded to the client.</p>
        <h2>2. Cancellation</h2>
        <p>Contracts can be cancelled before work begins. After work starts, disputes are handled via AI mediation.</p>
        <h2>3. Platform Fee</h2>
        <p>The 1% platform fee is non-refundable once a contract is created.</p>
        <h2>4. Contact</h2>
        <p>📧 <a href="mailto:contact@dokets.com">contact@dokets.com</a></p>
      </div>
    </div>
  );
}