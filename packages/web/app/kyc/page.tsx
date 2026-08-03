'use client';

import { useState } from 'react';
import { Shield, CheckCircle, Upload, Camera, FileText } from 'lucide-react';

export default function KYCPage() {
  const [status] = useState('PENDING');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">🔐 Identity Verification (KYC)</h1>
        <p className="text-gray-500 mb-8">Verify your identity to unlock all features</p>

        <div className="bg-white rounded-2xl p-6 border mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${status === 'VERIFIED' ? 'bg-green-100' : 'bg-yellow-100'}`}>
              {status === 'VERIFIED' ? <CheckCircle className="w-6 h-6 text-green-600" /> : <Shield className="w-6 h-6 text-yellow-600" />}
            </div>
            <div>
              <div className="font-semibold text-lg">Status: {status}</div>
              <div className="text-sm text-gray-500">Verified users get higher trust scores</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-2xl p-8 text-center hover:border-blue-400 cursor-pointer transition-colors">
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="font-medium">Upload ID Proof</p>
              <p className="text-sm text-gray-500">Aadhar, PAN, or Passport</p>
            </div>
            <div className="border-2 border-dashed rounded-2xl p-8 text-center hover:border-blue-400 cursor-pointer transition-colors">
              <Camera className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="font-medium">Take a Selfie</p>
              <p className="text-sm text-gray-500">For face verification</p>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-blue-700 mt-6">
            Submit for Verification
          </button>
        </div>
      </div>
    </div>
  );
}