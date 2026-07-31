'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Shield, Zap, Globe, Star, ArrowRight, CheckCircle, 
  Phone, CreditCard, Camera, Users, Briefcase, 
  ChevronRight, Menu, X, Moon, Sun, Sparkles,
  Banknote, Languages, Headphones, Clock, ThumbsUp
} from 'lucide-react';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('client');

  return (
    <main className="min-h-screen bg-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">VouchAI</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#how-it-works" className="text-gray-600 hover:text-blue-600">How It Works</Link>
              <Link href="#features" className="text-gray-600 hover:text-blue-600">Features</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link>
              <Link href="/dashboard/client" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Get Started
              </Link>
            </div>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> Powered by AI & Escrow Technology
            </span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            Trust in <span className="text-blue-600">Every Deal</span>
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The world's first AI-powered micro-escrow platform. Create contracts, secure payments, verify work, and build trust — all from WhatsApp or web.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard/client" className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
              🚀 Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#how-it-works" className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-blue-300 transition-all flex items-center justify-center gap-2">
              ▶️ Watch Demo
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {[
              { icon: '💰', value: '1%', label: 'Platform Fee' },
              { icon: '💱', value: '15+', label: 'Currencies' },
              { icon: '🌍', value: '10+', label: 'Languages' },
              { icon: '⚖️', value: '24/7', label: 'AI Mediation' },
              { icon: '👥', value: '100K+', label: 'Users Worldwide' },
            ].map((stat, i) => (
              <motion.div key={i} whileHover={{ y: -4 }} className="bg-gradient-to-b from-blue-50 to-white p-5 rounded-2xl border border-blue-100">
                <div className="text-3xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🚀 How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to secure any deal</p>
          </div>
          
          {/* Role Switcher */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-xl p-1 shadow-sm border inline-flex">
              <button onClick={() => setActiveTab('client')} 
                className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'client' ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:text-blue-600'}`}>
                👤 As a Client
              </button>
              <button onClick={() => setActiveTab('provider')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'provider' ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:text-blue-600'}`}>
                🔧 As a Provider
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {activeTab === 'client' ? (
              <>
                {[
                  { step: '01', icon: '📝', title: 'Describe Your Work', desc: 'Simply type or speak what you need. AI extracts all details and creates a smart contract instantly.' },
                  { step: '02', icon: '🔒', title: 'Secure Payment in Escrow', desc: 'Your money is held safely. Only 1% fee. Provider gets notified via WhatsApp.' },
                  { step: '03', icon: '🤖', title: 'AI Verifies & Pays', desc: 'Provider uploads proof. AI compares before/after and auto-releases payment.' },
                ].map((item, i) => (
                  <motion.div key={i} whileHover={{ y: -8 }} className="bg-white p-8 rounded-2xl shadow-sm border text-center">
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <div className="text-sm font-bold text-blue-600 mb-2">STEP {item.step}</div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </motion.div>
                ))}
              </>
            ) : (
              <>
                {[
                  { step: '01', icon: '📱', title: 'Receive Job Invite', desc: 'Get WhatsApp notification when someone wants to hire you. View contract details instantly.' },
                  { step: '02', icon: '✅', title: 'Accept & Start Work', desc: 'One tap to accept. Payment is secured in escrow. Start working with confidence.' },
                  { step: '03', icon: '📸', title: 'Upload Proof & Get Paid', desc: 'Take a photo of completed work. AI verifies and payment is released automatically.' },
                ].map((item, i) => (
                  <motion.div key={i} whileHover={{ y: -8 }} className="bg-white p-8 rounded-2xl shadow-sm border text-center">
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <div className="text-sm font-bold text-green-600 mb-2">STEP {item.step}</div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </motion.div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">✨ Why VouchAI?</h2>
            <p className="text-xl text-gray-600">Everything you need for trust in every deal</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Shield className="w-8 h-8" />, title: 'AI Smart Contracts', desc: 'Describe work naturally. AI extracts all details and creates binding contracts.' },
              { icon: <Banknote className="w-8 h-8" />, title: 'Secure Escrow', desc: 'Money held safely until work verified. Only 1% platform fee.' },
              { icon: <Phone className="w-8 h-8" />, title: 'WhatsApp Native', desc: 'Everything works via WhatsApp. No app download needed.' },
              { icon: <Camera className="w-8 h-8" />, title: 'AI Verification', desc: 'AI compares before/after photos to verify work completion.' },
              { icon: <Star className="w-8 h-8" />, title: 'Vouch Score', desc: 'Build reputation. Higher score = more trust and more jobs.' },
              { icon: <Headphones className="w-8 h-8" />, title: 'AI Mediation', desc: 'Fair dispute resolution. 24/7 available in multiple languages.' },
              { icon: <Globe className="w-8 h-8" />, title: 'Global Coverage', desc: '15+ currencies, 10+ languages. Works worldwide.' },
              { icon: <CreditCard className="w-8 h-8" />, title: 'Multiple Gateways', desc: 'Razorpay, PayPal, Stripe. Choose your preferred payment method.' },
            ].map((feature, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border hover:border-blue-200 transition-all">
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🏆 VouchAI vs Competition</h2>
            <p className="text-xl text-gray-600">Why we're the best choice</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-sm overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-4 text-left">Feature</th>
                  <th className="p-4 text-center">VouchAI</th>
                  <th className="p-4 text-center">Upwork</th>
                  <th className="p-4 text-center">Fiverr</th>
                  <th className="p-4 text-center">Escrow.com</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Platform Fee', '1% 🔥', '20%', '20%', '3-6%'],
                  ['AI Contract Creation', '✅', '❌', '❌', '❌'],
                  ['AI Work Verification', '✅', '❌', '❌', '❌'],
                  ['WhatsApp Integration', '✅', '❌', '❌', '❌'],
                  ['Multi-Language', '10+', '✅', '✅', '❌'],
                  ['Vouch Score', '✅', '❌', '⭐', '❌'],
                  ['AI Mediation', '24/7 ✅', '❌', '❌', '❌'],
                  ['Global Currencies', '15+', '✅', '✅', '❌'],
                ].map((row, i) => (
                  <tr key={i} className="border-t hover:bg-blue-50">
                    <td className="p-4 font-medium">{row[0]}</td>
                    <td className="p-4 text-center font-bold text-blue-600">{row[1]}</td>
                    <td className="p-4 text-center text-gray-500">{row[2]}</td>
                    <td className="p-4 text-center text-gray-500">{row[3]}</td>
                    <td className="p-4 text-center text-gray-500">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to Trust Every Deal?</h2>
          <p className="text-xl text-blue-100 mb-10">Join thousands of users worldwide. Create your first AI-powered contract in 60 seconds.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard/client" className="bg-white text-blue-600 px-10 py-5 rounded-full text-xl font-bold shadow-2xl hover:bg-gray-100 transition-all">
              🚀 Get Started Free
            </Link>
            <Link href="/dashboard/provider" className="border-2 border-white text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-white/10 transition-all">
              🔧 I'm a Provider
            </Link>
          </div>
          <p className="mt-6 text-blue-200">No credit card required · 1% fee only when you transact</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold text-white">VouchAI</span>
          </div>
          <p>Trust in Every Deal · Powered by AI & Escrow Technology</p>
          <p className="mt-2 text-sm">© 2026 VouchAI. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}