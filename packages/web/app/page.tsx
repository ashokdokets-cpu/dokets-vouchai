'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Shield, ArrowRight, CheckCircle, Star, Globe, 
  CreditCard, MessageCircle, Camera, Zap, Headphones,
  ChevronRight, Menu, X
} from 'lucide-react';

export default function HomePage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [role, setRole] = useState<'client' | 'provider'>('client');

  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">VouchAI</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors">How It Works</a>
              <a href="#features" className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors">Features</a>
              <a href="#comparison" className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors">Compare</a>
              <div className="h-5 w-px bg-gray-200"></div>
              <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Sign In</Link>
              <Link href="/login" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm hover:shadow-md">
                Get Started
              </Link>
            </div>

            <button className="md:hidden p-2" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-8 border border-blue-100">
              <Zap className="w-4 h-4" /> AI-Powered Micro-Escrow Platform
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1]">
            Trust in <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Every Deal</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Create AI-powered contracts, secure payments in escrow, verify work automatically, and build trust — all from WhatsApp or web. No lawyers. No paperwork.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
              Start Free <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-xl font-semibold text-base border-2 border-gray-200 hover:border-gray-300 transition-all flex items-center justify-center gap-2">
              How It Works <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Trust Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: '1%', label: 'Platform Fee' },
              { value: '15+', label: 'Currencies' },
              { value: '10+', label: 'Languages' },
              { value: '24/7', label: 'AI Support' },
            ].map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                <div className="text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-500">Three simple steps to secure any deal</p>
            
            <div className="inline-flex bg-white rounded-xl p-1.5 border border-gray-200 mt-8">
              <button onClick={() => setRole('client')} className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${role === 'client' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>👤 As Client</button>
              <button onClick={() => setRole('provider')} className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${role === 'provider' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>🔧 As Provider</button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {role === 'client' ? [
              { step: '1', icon: '📝', title: 'Describe Work', desc: 'Type or speak what you need. AI creates a smart contract instantly.' },
              { step: '2', icon: '🔒', title: 'Secure Payment', desc: 'Money held in escrow. Provider gets notified via WhatsApp.' },
              { step: '3', icon: '🤖', title: 'AI Verifies & Pays', desc: 'Proof uploaded. AI compares and auto-releases payment.' },
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -4 }} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl font-bold mx-auto mb-4">{item.step}</div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            )) : [
              { step: '1', icon: '📱', title: 'Get Job Invites', desc: 'Receive WhatsApp notifications when clients want to hire you.' },
              { step: '2', icon: '✅', title: 'Accept & Work', desc: 'One tap to accept. Payment secured. Work with confidence.' },
              { step: '3', icon: '📸', title: 'Upload & Get Paid', desc: 'Send photo of work. AI verifies and payment is released.' },
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -4 }} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-xl font-bold mx-auto mb-4">{item.step}</div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Everything You Need</h2>
            <p className="mt-4 text-lg text-gray-500">All the tools to build trust in every transaction</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: <Shield className="w-6 h-6" />, title: 'AI Smart Contracts', desc: 'Describe naturally. AI extracts details and creates binding agreements.' },
              { icon: <CreditCard className="w-6 h-6" />, title: 'Secure Escrow', desc: 'Money held safely. Released only when work is verified. Just 1% fee.' },
              { icon: <MessageCircle className="w-6 h-6" />, title: 'WhatsApp Native', desc: 'Full functionality via WhatsApp. No app download needed.' },
              { icon: <Camera className="w-6 h-6" />, title: 'AI Verification', desc: 'Before/after photo comparison. Automatic work completion detection.' },
              { icon: <Star className="w-6 h-6" />, title: 'Vouch Score', desc: 'Build your reputation. Higher scores mean more trust and more jobs.' },
              { icon: <Headphones className="w-6 h-6" />, title: 'AI Mediation', desc: 'Fair, instant dispute resolution. Available 24/7 in any language.' },
              { icon: <Globe className="w-6 h-6" />, title: 'Global Coverage', desc: '15+ currencies. 10+ languages. Works everywhere in the world.' },
              { icon: <Zap className="w-6 h-6" />, title: 'Instant Payouts', desc: 'Multiple payment gateways. Get paid via Razorpay, PayPal, or Stripe.' },
            ].map((f, i) => (
              <motion.div key={i} whileHover={{ y: -4 }} className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section id="comparison" className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Why VouchAI?</h2>
            <p className="mt-4 text-lg text-gray-500">The clear choice for secure transactions</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="text-left p-5 font-semibold">Feature</th>
                  <th className="p-5 font-semibold text-center">VouchAI</th>
                  <th className="p-5 text-center text-blue-100">Upwork</th>
                  <th className="p-5 text-center text-blue-100">Fiverr</th>
                  <th className="p-5 text-center text-blue-100">Escrow.com</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Platform Fee', '1%', '20%', '20%', '3-6%'],
                  ['AI Contracts', '✓', '✗', '✗', '✗'],
                  ['AI Verification', '✓', '✗', '✗', '✗'],
                  ['WhatsApp', '✓', '✗', '✗', '✗'],
                  ['AI Mediation', '24/7', '✗', '✗', '✗'],
                  ['Multi-Language', '10+', '✓', '✓', '✗'],
                  ['Vouch Score', '✓', '✗', '★', '✗'],
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                    <td className="p-5 font-medium text-gray-900">{row[0]}</td>
                    <td className="p-5 text-center font-bold text-blue-600 bg-blue-50/30">{row[1]}</td>
                    <td className="p-5 text-center text-gray-500">{row[2]}</td>
                    <td className="p-5 text-center text-gray-500">{row[3]}</td>
                    <td className="p-5 text-center text-gray-500">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Trust Every Deal?</h2>
          <p className="text-lg text-blue-100 mb-10">Join thousands of users. Create your first contract in 60 seconds.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-base hover:bg-gray-50 transition-all shadow-lg inline-flex items-center justify-center gap-2">
              🚀 Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/login" className="bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-white/20 transition-all border border-white/20 inline-flex items-center justify-center gap-2">
              🔧 I'm a Provider
            </Link>
          </div>
          <p className="mt-6 text-blue-200 text-sm">No credit card required • 1% fee only when you transact</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-blue-400" />
            <span className="text-lg font-bold text-white">VouchAI</span>
          </div>
          <p className="text-sm">Trust in Every Deal • AI-Powered Escrow Technology</p>
          <p className="text-xs mt-2 text-gray-600">© 2026 VouchAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}