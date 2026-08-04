import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compliance & GDPR - Dokets VouchAI',
  description: 'Dokets VouchAI GDPR compliance, data protection, and global regulatory information.',
};

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16 prose prose-lg">
        <h1>Compliance & Data Protection</h1>
        <p className="text-gray-500">Last updated: August 2026</p>

        <h2>1. GDPR Compliance</h2>
        <p>Dokets VouchAI complies with the General Data Protection Regulation (GDPR) for users in the European Union and European Economic Area.</p>

        <h2>2. Your Rights Under GDPR</h2>
        <ul>
          <li><strong>Right to Access:</strong> Request a copy of your personal data.</li>
          <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data.</li>
          <li><strong>Right to Erasure:</strong> Request deletion of your data ("Right to be Forgotten").</li>
          <li><strong>Right to Restrict Processing:</strong> Limit how we use your data.</li>
          <li><strong>Right to Data Portability:</strong> Receive your data in a machine-readable format.</li>
          <li><strong>Right to Object:</strong> Object to processing of your data for certain purposes.</li>
        </ul>

        <h2>3. Data Protection Globally</h2>
        <p>In addition to GDPR, we comply with:</p>
        <ul>
          <li><strong>India:</strong> Information Technology Act, 2000 and SPDI Rules</li>
          <li><strong>Brazil:</strong> LGPD (Lei Geral de Proteção de Dados)</li>
          <li><strong>California:</strong> CCPA (California Consumer Privacy Act)</li>
          <li><strong>Nigeria:</strong> NDPR (Nigeria Data Protection Regulation)</li>
          <li><strong>UAE:</strong> UAE Data Protection Law</li>
        </ul>

        <h2>4. Data We Process</h2>
        <ul>
          <li>Phone numbers (for authentication)</li>
          <li>Names and profile information</li>
          <li>Transaction and contract data</li>
          <li>KYC documents (optional)</li>
          <li>Work verification photos</li>
        </ul>

        <h2>5. Legal Basis for Processing</h2>
        <ul>
          <li><strong>Contract Performance:</strong> To fulfill escrow and contract services</li>
          <li><strong>Legal Obligation:</strong> KYC/AML compliance where required</li>
          <li><strong>Legitimate Interest:</strong> Fraud prevention and platform security</li>
          <li><strong>Consent:</strong> Marketing communications (opt-in only)</li>
        </ul>

        <h2>6. Data Security Measures</h2>
        <ul>
          <li>All data encrypted in transit (TLS 1.3) and at rest (AES-256)</li>
          <li>Regular security audits and vulnerability assessments</li>
          <li>Access controls and authentication for all systems</li>
          <li>Data minimization - we only collect what we need</li>
        </ul>

        <h2>7. Data Retention</h2>
        <ul>
          <li>Account data: Retained while account is active</li>
          <li>Transaction data: Retained for 7 years (legal requirement)</li>
          <li>KYC documents: Retained for 5 years after verification</li>
          <li>Deleted accounts: Data purged within 30 days of deletion request</li>
        </ul>

        <h2>8. Data Processing Locations</h2>
        <p>Your data may be processed on servers located in:</p>
        <ul>
          <li>United States (Render, Vercel)</li>
          <li>Singapore (Render database)</li>
          <li>India (Twilio for WhatsApp)</li>
        </ul>
        <p>We ensure appropriate safeguards (Standard Contractual Clauses) for international data transfers.</p>

        <h2>9. Data Protection Officer</h2>
        <p>For data protection inquiries:</p>
        <p>📧 <a href="mailto:contact@dokets.com">contact@dokets.com</a></p>
        <p>🏢 Charvak IT Consulting Pvt Ltd</p>

        <h2>10. Reporting Violations</h2>
        <p>If you believe your data protection rights have been violated, you have the right to file a complaint with your local data protection authority.</p>
      </div>
    </div>
  );
}