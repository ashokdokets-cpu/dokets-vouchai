'use client';

import { useState, useEffect } from 'react';
import { Search, Star, MapPin, Globe, Briefcase, Plus, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ShowcasePage() {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [providers, setProviders] = useState<any[]>([]);

  useEffect(() => {
    // Fetch real providers from API
    fetch('https://dokets-vouchai.onrender.com/api/users')
      .then(r => r.json()).then(data => {
        if (Array.isArray(data)) setProviders(data.slice(0, 20));
      }).catch(() => {});
  }, []);

  const tags = ['All', 'Development', 'Design', 'Writing', 'Marketing', 'Music', 'Education', 'Health', 'Home Services', 'Custom'];

  const filtered = providers.filter(p => {
    if (search && !p.name?.toLowerCase().includes(search.toLowerCase()) && 
        !p.skill?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const skills = [
    { icon: '🎨', name: 'Graphic Design' },
    { icon: '💻', name: 'Web Development' },
    { icon: '📝', name: 'Content Writing' },
    { icon: '📱', name: 'Mobile Apps' },
    { icon: '🎥', name: 'Video Editing' },
    { icon: '📊', name: 'Data Analysis' },
    { icon: '🔧', name: 'Plumbing' },
    { icon: '⚡', name: 'Electrical' },
    { icon: '🎵', name: 'Music Production' },
    { icon: '📚', name: 'Tutoring' },
    { icon: '🧘', name: 'Yoga Instruction' },
    { icon: '💇', name: 'Beauty Services' },
    { icon: '🚗', name: 'Driving' },
    { icon: '🍳', name: 'Cooking' },
    { icon: '📸', name: 'Photography' },
    { icon: '🌐', name: 'Translation' },
    { icon: '💼', name: 'Business Consulting' },
    { icon: '🎧', name: 'Customer Support' },
    { icon: '✈️', name: 'Travel Planning' },
    { icon: '🏥', name: 'Healthcare' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
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
            {tags.map(tag => (
              <button key={tag} onClick={() => setActiveTag(tag)}
                className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                  activeTag === tag ? 'bg-white text-blue-600 font-medium' : 'bg-white/20 hover:bg-white/30'
                }`}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Showcase Your Skill CTA */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8 text-center border-2 border-dashed border-blue-300">
          <h2 className="text-2xl font-bold mb-2">🌟 Showcase Your Skill</h2>
          <p className="text-gray-600 mb-4">List your unique talent and get discovered by clients worldwide</p>
          <Link href="/jobs/post?type=showcase" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 inline-flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Your Skill
          </Link>
        </div>

        {/* Popular Skills Grid */}
        <h2 className="text-2xl font-bold mb-6">Popular Skills</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-3 mb-12">
          {skills.map((s, i) => (
            <button key={i} onClick={() => setSearch(s.name)}
              className="bg-white p-3 rounded-xl border text-center hover:border-blue-300 hover:shadow-sm transition-all text-sm">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-xs text-gray-600 truncate">{s.name}</div>
            </button>
          ))}
        </div>

        {/* Featured Providers */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Providers</h2>
          <Link href="/jobs" className="text-blue-600 hover:underline text-sm font-medium flex items-center gap-1">
            Browse All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border">
            <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No providers found for "{search}"</p>
            <p className="text-gray-400 text-sm mt-1">Try a different search or be the first to showcase this skill!</p>
            <Link href="/jobs/post" className="text-blue-600 hover:underline mt-4 inline-block font-medium">
              Be the first →
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <Link href={`/providers/${p.id}`} key={i}
                className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all overflow-hidden group">
                <div className="h-32 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                  {p.avatar || p.name?.[0] || '👤'}
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{p.name || 'Provider'}</h3>
                    <span className="flex items-center gap-1 text-sm text-yellow-600">
                      <Star className="w-4 h-4 fill-current" /> {p.vouchScore || 100}
                    </span>
                  </div>
                  <p className="text-blue-600 font-medium">{p.skill || p.title || 'Skilled Professional'}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                    <MapPin className="w-3 h-3" /> {p.location || p.country || 'Global'}
                  </div>
                  <span className="inline-block mt-3 px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    {p.vouchTier || 'NEW'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}