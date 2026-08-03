'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Shield, ArrowRight, Key, Phone } from 'lucide-react';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState('');
  const { sendOTP, verifyOTP } = useAuth();
  const router = useRouter();

  const handleSendOTP = async () => {
    if (!phone || phone.length < 10) return setError('Enter valid phone number');
    setLoading(true);
    setError('');
    const result = await sendOTP(phone);
    if (result) {
      setOtpSent(result !== 'sent' ? result : '');
      setStep('otp');
    } else {
      setError('Failed to send OTP. Try again.');
    }
    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    if (!code || code.length !== 6) return setError('Enter 6-digit code');
    setLoading(true);
    setError('');
    const success = await verifyOTP(phone, code);
    if (success) {
      router.push('/dashboard/client');
    } else {
      setError('Invalid or expired code. Try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Welcome to VouchAI</h1>
          <p className="text-gray-500 mt-2">
            {step === 'phone' ? 'Enter your phone number' : 'Enter verification code'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-4 text-center">{error}</div>
        )}

        {step === 'phone' ? (
          <>
            <div className="relative mb-4">
              <Phone className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="+91 98765 43210" value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-2xl text-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <button onClick={handleSendOTP} disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? 'Sending...' : <>Send Code <ArrowRight className="w-4 h-4" /></>}
            </button>
          </>
        ) : (
          <>
            <p className="text-center text-sm text-gray-500 mb-4">
              Code sent to <strong>{phone}</strong>
              {otpSent && <span className="block text-blue-600 font-mono text-lg mt-1">Dev: {otpSent}</span>}
            </p>
            <div className="relative mb-4">
              <Key className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="000000" maxLength={6} value={code}
                onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-2xl text-2xl tracking-widest text-center focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <button onClick={handleVerifyOTP} disabled={loading || code.length !== 6}
              className="w-full bg-green-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? 'Verifying...' : <>Verify & Login <ArrowRight className="w-4 h-4" /></>}
            </button>
            <button onClick={() => { setStep('phone'); setError(''); setCode(''); }}
              className="w-full text-blue-600 py-2 text-sm mt-2 hover:underline">
              ← Change phone number
            </button>
          </>
        )}
        <p className="text-center text-xs text-gray-400 mt-6">Secure OTP login via WhatsApp</p>
      </div>
    </div>
  );
}