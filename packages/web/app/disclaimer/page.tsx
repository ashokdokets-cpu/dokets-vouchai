import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer - VouchAI',
  description: 'Legal disclaimer for VouchAI platform.',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16 prose">
        <h1>Disclaimer</h1>
        <p>VouchAI provides a platform for escrow transactions. We do not guarantee the quality of work performed by service providers.</p>
        <p>AI verification is provided as a tool and should not be solely relied upon. Users are encouraged to review work personally.</p>
        <p>VouchAI is not a law firm and does not provide legal advice.</p>
        <p>📧 <a href="mailto:contact@dokets.com">contact@dokets.com</a></p>
      </div>
    </div>
  );
}