import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compliance (GDPR) - VouchAI',
  description: 'VouchAI GDPR compliance and data protection information.',
};

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16 prose">
        <h1>Compliance (GDPR)</h1>
        <p>VouchAI is committed to protecting your data in compliance with GDPR and global data protection regulations.</p>
        <h2>Your Rights</h2>
        <ul>
          <li>Right to access your data</li>
          <li>Right to rectification</li>
          <li>Right to erasure</li>
          <li>Right to data portability</li>
        </ul>
        <h2>Data Protection Officer</h2>
        <p>📧 <a href="mailto:contact@dokets.com">contact@dokets.com</a></p>
      </div>
    </div>
  );
}