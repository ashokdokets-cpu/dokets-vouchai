import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer - Dokets VouchAI',
  description: 'Legal disclaimer for Dokets VouchAI platform.',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16 prose prose-lg">
        <h1>Disclaimer</h1>
        <p className="text-gray-500">Last updated: August 2026</p>

        <h2>1. Platform Role</h2>
        <p>Dokets VouchAI is a technology platform that provides escrow services, AI-powered contract creation, work verification, and dispute mediation. We are NOT a party to any contract between clients and service providers.</p>

        <h2>2. No Guarantee of Work Quality</h2>
        <p>Dokets VouchAI does not guarantee the quality, safety, or legality of services provided by service providers. We recommend:</p>
        <ul>
          <li>Reviewing provider profiles and Vouch Scores before hiring</li>
          <li>Checking provider certifications and skill test results</li>
          <li>Using milestone payments for large projects</li>
        </ul>

        <h2>3. AI Limitations</h2>
        <ul>
          <li>AI verification is an assistive tool and may not be 100% accurate.</li>
          <li>AI mediation provides recommendations based on available data.</li>
          <li>Users should exercise their own judgment in addition to AI analysis.</li>
          <li>AI services may occasionally be unavailable due to technical issues.</li>
        </ul>

        <h2>4. Financial Disclaimer</h2>
        <ul>
          <li>Dokets VouchAI is not a bank, financial institution, or payment processor.</li>
          <li>Payment processing is handled by licensed third-party providers (Razorpay, PayPal).</li>
          <li>We do not provide financial, legal, or tax advice.</li>
        </ul>

        <h2>5. Third-Party Links</h2>
        <p>Our Platform may contain links to third-party websites (Dokets Resume Builder, Dokets Shop). We are not responsible for the content or practices of these sites.</p>

        <h2>6. No Legal Advice</h2>
        <p>Dokets VouchAI is not a law firm and does not provide legal advice. Contracts created on our Platform are for facilitation purposes. For legally binding agreements, consult a qualified attorney.</p>

        <h2>7. Service Availability</h2>
        <p>While we strive for 99.9% uptime, we do not guarantee uninterrupted access to the Platform. Maintenance, updates, or technical issues may cause temporary unavailability.</p>

        <h2>8. Accuracy of Information</h2>
        <p>Users are responsible for the accuracy of information they provide. Dokets VouchAI is not responsible for losses resulting from incorrect or fraudulent information provided by users.</p>

        <h2>9. Contact</h2>
        <p>📧 <a href="mailto:contact@dokets.com">contact@dokets.com</a></p>
      </div>
    </div>
  );
}