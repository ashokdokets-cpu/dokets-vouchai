'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Star, Phone, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <section className="px-6 py-24 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-800">
            🤖 Powered by AI & Escrow Technology
          </span>
        </motion.div>
        
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mt-8 text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
          Trust in Every Deal
        </motion.h1>
        
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          Describe your work → AI creates contract → Money secured in escrow → AI verifies completion → Payment released.
        </motion.p>
        
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mt-4 text-lg font-medium text-blue-600">
          No lawyers. No paperwork. Just trust.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="mt-10 flex items-center justify-center gap-4">
          <Link href="/dashboard">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-700">
              🚀 Get Started Free
            </motion.button>
          </Link>
          <Link href="/contract/create">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="rounded-full border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 hover:border-blue-300">
              📋 Create Contract
            </motion.button>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { icon: '💰', label: '1%', sub: 'Platform Fee' },
            { icon: '💱', label: '13', sub: 'Currencies' },
            { icon: '🌍', label: '6', sub: 'Languages' },
            { icon: '⚖️', label: '24/7', sub: 'AI Mediation' }
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm border">
              <div className="text-3xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.sub}</div>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="py-24 px-6 bg-white">
        <h2 className="text-4xl font-bold text-center mb-16">🚀 How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { step: '1', icon: '📝', title: 'Describe the Work', desc: 'Just type what you need. AI creates a binding contract.' },
            { step: '2', icon: '🔒', title: 'Secure with Escrow', desc: 'Payment held securely. Released when verified.' },
            { step: '3', icon: '🤖', title: 'AI Verifies & Pays', desc: 'Upload proof. AI compares and auto-releases payment.' }
          ].map((item) => (
            <motion.div key={item.step} whileHover={{ y: -5 }}
              className="text-center p-8 rounded-2xl bg-gradient-to-b from-blue-50 to-white border">
              <div className="text-5xl mb-4">{item.icon}</div>
              <div className="text-sm font-bold text-blue-600 mb-2">Step {item.step}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Trust Every Deal?</h2>
        <p className="text-xl mb-10 text-blue-100">Create your first AI-powered contract in under 60 seconds.</p>
        <Link href="/contract/create">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-10 py-5 rounded-full text-xl font-bold shadow-2xl hover:bg-gray-100">
            🚀 Get Started Free
          </motion.button>
        </Link>
        <p className="mt-4 text-blue-200">No credit card required · 1% fee only when you transact</p>
      </section>
    </main>
  );
}