'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Star, Shield, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  { id: 'painting', icon: '🎨', name: 'Painting', desc: 'Interior & exterior painting', count: '2,450 providers' },
  { id: 'plumbing', icon: '🔧', name: 'Plumbing', desc: 'Pipe repairs & installation', count: '1,890 providers' },
  { id: 'electrical', icon: '⚡', name: 'Electrical', desc: 'Wiring, fixtures & repairs', count: '3,100 providers' },
  { id: 'cleaning', icon: '🧹', name: 'Cleaning', desc: 'Home & office cleaning', count: '5,200 providers' },
  { id: 'carpentry', icon: '🪚', name: 'Carpentry', desc: 'Furniture & woodwork', count: '980 providers' },
  { id: 'tutoring', icon: '📚', name: 'Tutoring', desc: 'Academic & skill tutoring', count: '4,300 providers' },
  { id: 'photography', icon: '📸', name: 'Photography', desc: 'Events & portraits', count: '1,650 providers' },
  { id: 'development', icon: '💻', name: 'Development', desc: 'Web & app development', count: '2,800 providers' },
];

export default function ServicesPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold text-gray-900">Find Services</h1>
          <p className="text-gray-500 mt-2">Browse trusted providers for any job</p>
          <div className="relative mt-6 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search services..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map((cat, i) => (
            <motion.div key={cat.id} whileHover={{ y: -4 }} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <div className="text-4xl mb-4">{cat.icon}</div>
              <h3 className="font-semibold text-gray-900">{cat.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{cat.desc}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                <span className="text-xs text-gray-400">{cat.count}</span>
                <Link href={`/contracts/create?service=${cat.id}`} className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                  Hire <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}