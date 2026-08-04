import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Dokets VouchAI',
  description: 'Terms and conditions for using Dokets VouchAI escrow platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16 prose prose-lg">
        <h1>Terms & Conditions</h1>
        <p className="text-gray-500">Last updated: August 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using Dokets VouchAI ("the Platform"), you agree to be bound by these Terms & Conditions. If you do not agree, do not use the Platform. The Platform is owned and operated by Charvak IT Consulting Pvt Ltd.</p>

        <h2>2. Description of Service</h2>
        <p>Dokets VouchAI is an AI-powered micro-escrow platform that enables clients and service providers to create smart contracts, secure payments in escrow, verify work completion using AI, and resolve disputes through AI mediation.</p>

        <h2>3. Account Registration</h2>
        <ul>
          <li>You must provide a valid phone number for OTP verification via WhatsApp.</li>
          <li>You are responsible for maintaining the security of your account.</li>
          <li>You must be at least 18 years old to use the Platform.</li>
          <li>One account per phone number. Multiple accounts are prohibited.</li>
        </ul>

        <h2>4. Contracts & Escrow</h2>
        <ul>
          <li>All contracts created on the Platform are legally binding agreements between the client and provider.</li>
          <li>Dokets VouchAI acts as a neutral escrow agent and is not a party to any contract.</li>
          <li>Funds are held in escrow until work is verified and the client approves release.</li>
          <li>The Platform charges a tiered service fee based on contract amount and currency (1-4%).</li>
        </ul>

        <h2>5. Platform Fees</h2>
        <ul>
          <li><strong>Micro Deals:</strong> Flat fee per currency (e.g., ₹20, $0.25)</li>
          <li><strong>Small Deals:</strong> 2% of contract amount</li>
          <li><strong>Medium Deals:</strong> 1.5% of contract amount</li>
          <li><strong>Large Deals:</strong> 1% of contract amount</li>
          <li>Fees are non-refundable once a contract is created.</li>
        </ul>

        <h2>6. Payment Release</h2>
        <ul>
          <li>Payment is released ONLY when the client explicitly approves.</li>
          <li>Payment is NEVER auto-released without client consent.</li>
          <li>Providers receive payment via UPI, bank transfer, or PayPal.</li>
          <li>Processing times vary by payment method (instant for UPI, 1-3 days for bank/PayPal).</li>
        </ul>

        <h2>7. AI Verification & Mediation</h2>
        <ul>
          <li>AI verification is provided as a tool to assist in work assessment.</li>
          <li>AI analysis should not be solely relied upon for final decisions.</li>
          <li>AI mediation provides recommendations based on available evidence.</li>
          <li>Users may request human review if unsatisfied with AI mediation.</li>
        </ul>

        <h2>8. Disputes</h2>
        <ul>
          <li>Disputes are first handled by AI mediation at no cost.</li>
          <li>If AI mediation fails, human review is available.</li>
          <li>A dispute fee may be charged to the losing party (varies by currency).</li>
          <li>Dokets VouchAI's decision in disputes is final and binding.</li>
        </ul>

        <h2>9. Prohibited Activities</h2>
        <ul>
          <li>Fraudulent transactions or misrepresentation</li>
          <li>Money laundering or illegal activities</li>
          <li>Harassment or abuse of other users</li>
          <li>Attempting to bypass escrow or platform fees</li>
          <li>Using the Platform for prohibited goods or services</li>
        </ul>

        <h2>10. Limitation of Liability</h2>
        <p>Dokets VouchAI is not liable for:</p>
        <ul>
          <li>Quality of work performed by service providers</li>
          <li>Delays in payment processing by third-party gateways</li>
          <li>Losses due to incorrect information provided by users</li>
          <li>Service interruptions or technical issues</li>
        </ul>

        <h2>11. Termination</h2>
        <p>We reserve the right to suspend or terminate accounts for violation of these terms, fraudulent activity, or any behavior that harms the Platform or other users.</p>

        <h2>12. Changes to Terms</h2>
        <p>We may update these terms at any time. Continued use of the Platform after changes constitutes acceptance of the new terms.</p>

        <h2>13. Governing Law</h2>
        <p>These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Hyderabad, India.</p>

        <h2>14. Contact</h2>
        <p>📧 <a href="mailto:contact@dokets.com">contact@dokets.com</a></p>
        <p>🏢 Charvak IT Consulting Pvt Ltd</p>
      </div>
    </div>
  );
}