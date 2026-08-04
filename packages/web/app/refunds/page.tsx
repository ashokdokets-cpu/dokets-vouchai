import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refunds & Cancellations - Dokets VouchAI',
  description: 'Refund and cancellation policy for Dokets VouchAI escrow transactions.',
};

export default function RefundsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16 prose prose-lg">
        <h1>Refunds & Cancellations</h1>
        <p className="text-gray-500">Last updated: August 2026</p>

        <h2>1. Escrow Protection</h2>
        <p>All payments on Dokets VouchAI are protected by our escrow system. Your money is held securely and is only released when:</p>
        <ul>
          <li>The work is completed as described in the contract</li>
          <li>AI verification confirms completion (when applicable)</li>
          <li>The client explicitly approves the release of payment</li>
        </ul>

        <h2>2. Cancellation Before Work Begins</h2>
        <ul>
          <li>If the provider has not yet accepted the contract, the client may cancel at any time.</li>
          <li>Full refund is issued to the client.</li>
          <li>Platform fee is non-refundable.</li>
        </ul>

        <h2>3. Cancellation After Work Begins</h2>
        <ul>
          <li>If the provider has started work, cancellation requires mutual agreement or dispute resolution.</li>
          <li>Partial refund may be issued based on work completed.</li>
          <li>AI mediation will assess the situation if parties disagree.</li>
        </ul>

        <h2>4. Work Not Completed</h2>
        <ul>
          <li>If the provider fails to complete the work by the deadline, the client may request a refund.</li>
          <li>AI mediation reviews evidence of work done vs contract requirements.</li>
          <li>Refund amount is determined based on partial completion and evidence.</li>
        </ul>

        <h2>5. Work Quality Disputes</h2>
        <ul>
          <li>If the client is unsatisfied with work quality, they may raise a dispute.</li>
          <li>AI verification analyzes before/after evidence.</li>
          <li>Resolution may include full refund, partial refund, or payment release.</li>
        </ul>

        <h2>6. Refund Processing</h2>
        <ul>
          <li>Approved refunds are processed within 1-3 business days.</li>
          <li>Refunds are credited to the original payment method.</li>
          <li>UPI refunds are typically instant; bank/card refunds may take 5-7 days.</li>
        </ul>

        <h2>7. Platform Fee</h2>
        <ul>
          <li>The platform fee (1-4% based on tier) is non-refundable.</li>
          <li>This covers contract creation, AI verification, and escrow services.</li>
        </ul>

        <h2>8. Force Majeure</h2>
        <p>Dokets VouchAI is not liable for delays or failures caused by events beyond our control, including natural disasters, government actions, or service provider outages.</p>

        <h2>9. Contact for Refunds</h2>
        <p>📧 <a href="mailto:contact@dokets.com">contact@dokets.com</a></p>
        <p>Please include your Vouch ID or contract number for faster processing.</p>
      </div>
    </div>
  );
}