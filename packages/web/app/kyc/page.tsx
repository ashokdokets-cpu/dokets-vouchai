'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Shield, CheckCircle, Upload, Camera, FileText, Globe } from 'lucide-react';

export default function KYCPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [status, setStatus] = useState('PENDING');
  const [idType, setIdType] = useState('aadhar');
  const [idNumber, setIdNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!user && !loading) router.push('/login');
    if (user?.isVerified) setStatus('VERIFIED');
  }, [user, loading]);

  const handleSubmit = async () => {
    if (!idNumber.trim()) return alert('Please enter your ID number');
    setSubmitted(true);
    // In production: upload documents and verify
    alert('✅ KYC submitted! Verification takes 24-48 hours.');
  };

  if (loading || !user) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">🔐 Identity Verification (KYC)</h1>
        <p className="text-gray-500 mb-8">Verify your identity to unlock all features</p>

        {/* Status Card */}
        <div className={`rounded-2xl p-6 border mb-6 ${status === 'VERIFIED' ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${status === 'VERIFIED' ? 'bg-green-100' : 'bg-yellow-100'}`}>
              {status === 'VERIFIED' ? <CheckCircle className="w-6 h-6 text-green-600" /> : <Shield className="w-6 h-6 text-yellow-600" />}
            </div>
            <div>
              <div className="font-semibold text-lg">Status: {status}</div>
              <div className="text-sm text-gray-500">
                {status === 'VERIFIED' ? 'Your identity is verified ✅' : 'Verified users get higher trust scores and more jobs'}
              </div>
            </div>
          </div>

          {status !== 'VERIFIED' && !submitted && (
            <>
              {/* ID Type Selector - Global */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">ID Document Type</label>
                <select value={idType} onChange={e => setIdType(e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="aadhar">🇮🇳 Aadhar Card (India)</option>
                  <option value="pan">🇮🇳 PAN Card (India)</option>
                  <option value="passport">🌍 Passport (Global)</option>
                  <option value="driving">🚗 Driving License (Global)</option>
                  <option value="national">🆔 National ID Card (Global)</option>
                  <option value="voter">🗳️ Voter ID (India)</option>
                  <option value="cpf">🇧🇷 CPF (Brazil)</option>
                  <option value="nin">🇳🇬 NIN (Nigeria)</option>
                  <option value="emirates">🇦🇪 Emirates ID (UAE)</option>
                  <option value="ssn">🇺🇸 SSN (USA)</option>
                </select>
              </div>

              {/* ID Number */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">ID Number</label>
                <input type="text" placeholder="Enter your ID number" value={idNumber}
                  onChange={e => setIdNumber(e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              {/* Upload Areas */}
              <div className="space-y-4 mb-6">
                <div className="border-2 border-dashed rounded-2xl p-8 text-center hover:border-blue-400 cursor-pointer transition-colors">
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="font-medium">Upload ID Proof</p>
                  <p className="text-sm text-gray-500">Front and back of your ID document</p>
                </div>
                <div className="border-2 border-dashed rounded-2xl p-8 text-center hover:border-blue-400 cursor-pointer transition-colors">
                  <Camera className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="font-medium">Take a Selfie</p>
                  <p className="text-sm text-gray-500">For face verification with your ID</p>
                </div>
              </div>

              <button onClick={handleSubmit} disabled={!idNumber.trim()}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-blue-700 disabled:opacity-50">
                Submit for Verification
              </button>
            </>
          )}

          {submitted && status !== 'VERIFIED' && (
            <div className="text-center py-6">
              <div className="text-4xl mb-3">⏳</div>
              <p className="font-semibold text-lg">Verification in Progress</p>
              <p className="text-gray-500 text-sm mt-1">Your documents are being reviewed. This takes 24-48 hours.</p>
            </div>
          )}
        </div>

        {/* Benefits */}
        {status === 'VERIFIED' && (
          <div className="bg-white rounded-2xl p-6 border">
            <h2 className="font-semibold text-lg mb-4">✅ Verified Benefits</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                'Higher Vouch Score (+25)',
                'Priority in search results',
                'Trust badge on profile',
                'Access to premium jobs',
                'Faster dispute resolution',
                'Higher transaction limits',
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> {b}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Global Coverage */}
        <div className="mt-8 bg-white rounded-2xl p-6 border">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-blue-600" />
            <h2 className="font-semibold">Global ID Support</h2>
          </div>
          <p className="text-sm text-gray-500">
            We accept government-issued IDs from all countries including Aadhar, PAN, Passport, Driving License, 
            National ID, CPF (Brazil), NIN (Nigeria), Emirates ID (UAE), SSN (USA), and more.
          </p>
        </div>
      </div>
    </div>
  );
}