import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Dokets VouchAI',
  description: 'How Dokets VouchAI collects, uses, and protects your personal data globally.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16 prose prose-lg">
        <h1>Privacy Policy</h1>
        <p className="text-gray-500">Last updated: August 2026</p>
        
        <h2>1. Introduction</h2>
        <p>Dokets VouchAI ("we," "our," or "us") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information when you use our AI-powered micro-escrow platform at dokets.com.</p>
        
        <h2>2. Information We Collect</h2>
        <ul>
          <li><strong>Phone Number:</strong> Required for account creation and OTP verification via WhatsApp.</li>
          <li><strong>Name:</strong> Optional display name for your profile.</li>
          <li><strong>Transaction Data:</strong> Contract details, payment amounts, and escrow records.</li>
          <li><strong>Verification Data:</strong> Photos uploaded for AI work verification.</li>
          <li><strong>KYC Documents:</strong> Government-issued ID for identity verification (optional).</li>
          <li><strong>Device Information:</strong> Browser type, IP address, and usage patterns.</li>
        </ul>

        <h2>3. How We Use Your Data</h2>
        <ul>
          <li>To create and manage your account</li>
          <li>To process escrow transactions and payments</li>
          <li>To send OTP codes via WhatsApp for secure login</li>
          <li>To verify work completion using AI image analysis</li>
          <li>To calculate and display your Vouch Score</li>
          <li>To mediate disputes using AI analysis</li>
          <li>To comply with legal obligations</li>
        </ul>
        <p>We <strong>DO NOT</strong> sell, rent, or share your personal data with third parties for marketing purposes.</p>

        <h2>4. Data Security</h2>
        <p>All data is encrypted in transit (HTTPS/SSL) and at rest. Payments are processed through PCI-compliant gateways (Razorpay, PayPal). We do not store full payment card details.</p>

        <h2>5. Data Retention</h2>
        <p>We retain your data as long as your account is active. You may request deletion of your data by contacting us.</p>

        <h2>6. Your Rights</h2>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Delete your account and data</li>
          <li>Export your transaction history</li>
          <li>Withdraw consent for data processing</li>
        </ul>

        <h2>7. Third-Party Services</h2>
        <p>We use the following third-party services:</p>
        <ul>
          <li><strong>Twilio:</strong> For WhatsApp OTP and notifications</li>
          <li><strong>Razorpay/PayPal:</strong> For payment processing</li>
          <li><strong>OpenAI:</strong> For AI verification and mediation</li>
          <li><strong>Render/Vercel:</strong> For hosting and infrastructure</li>
        </ul>

        <h2>8. International Data Transfers</h2>
        <p>Your data may be processed in countries where our servers are located. We ensure appropriate safeguards are in place for international transfers.</p>

        <h2>9. Children's Privacy</h2>
        <p>Our platform is not intended for users under 18 years of age.</p>

        <h2>10. Contact Us</h2>
        <p>For privacy-related inquiries:</p>
        <p>📧 <a href="mailto:contact@dokets.com">contact@dokets.com</a></p>
        <p>🏢 Charvak IT Consulting Pvt Ltd</p>
      </div>
    </div>
  );
}