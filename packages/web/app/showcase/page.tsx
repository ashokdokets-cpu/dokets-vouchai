'use client';

import { useState } from 'react';
import { Search, Plus, Camera, Star, MapPin, Globe } from 'lucide-react';
import Link from 'next/link';

const featuredProviders = [
  { name: 'Ramesh Kumar', skill: 'Custom Furniture Making', location: 'Mumbai, India', score: 95, image: '🪑', category: 'Custom' },
  { name: 'Maria Santos', skill: 'Brazilian Waxing', location: 'São Paulo, Brazil', score: 92, image: '💆', category: 'Custom' },
  { name: 'Ahmed Hassan', skill: 'Arabic Calligraphy', location: 'Dubai, UAE', score: 88, image: '✍️', category: 'Custom' },
  { name: 'Priya Sharma', skill: 'Yoga Instructor', location: 'Delhi, India', score: 94, image: '🧘', category: 'Custom' },
  { name: 'Carlos Mendoza', skill: 'Salsa Dance Lessons', location: 'Mexico City, Mexico', score: 90, image: '💃', category: 'Custom' },
  { name: 'Wei Chen', skill: 'Mandarin Tutoring', location: 'Singapore', score: 96, image: '📚', category: 'Custom' },
];

export default function ShowcasePage() {
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold">Discover Unique Skills</h1>
          <p className="text-xl text-blue-100 mt-2">Any service, any skill, anywhere in the world</p>
          <div className="relative mt-8 max-w-xl">
            <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search any skill, service, or profession..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 text-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            {['All', 'Custom', 'Development', 'Design', 'Writing', 'Music', 'Education', 'Health'].map(tag => (
              <button key={tag} className="px-4 py-1.5 bg-white/20 rounded-full text-sm hover:bg-white/30 transition-colors">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured Providers</h2>
          <Link href="/showcase/add" className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Showcase Your Skill
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProviders.filter(p => !search || p.skill.toLowerCase().includes(search.toLowerCase())).map((p, i) => (
            <div key={i} className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-6xl">
                {p.image}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  <span className="flex items-center gap-1 text-sm text-yellow-600">
                    <Star className="w-4 h-4 fill-current" /> {p.score}
                  </span>
                </div>
                <p className="text-blue-600 font-medium">{p.skill}</p>
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                  <MapPin className="w-3 h-3" /> {p.location}
                </div>
                <span className="inline-block mt-3 px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  {p.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}