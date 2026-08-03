'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Globe, Briefcase, Star, Filter, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function JobBoard() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [filter, setFilter] = useState({ jobType: '', country: '', city: '', category: '' });
  const [search, setSearch] = useState('');

  useEffect(() => {
  const params = new URLSearchParams();
  if (filter.jobType) params.append('jobType', filter.jobType);
  if (filter.country) params.append('country', filter.country);
  if (filter.city) params.append('city', filter.city);
  
  fetch('https://dokets-vouchai.onrender.com/api/jobs?' + params.toString())
    .then(r => r.json()).then(setJobs);
}, [filter]);

  const filtered = jobs.filter(j => {
    if (search && !j.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter.jobType && j.jobType !== filter.jobType) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold">Find Work</h1>
          <p className="text-gray-500 mt-2">Browse available jobs worldwide</p>
          
          <div className="flex gap-3 mt-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search jobs..." value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <select onChange={e => setFilter({...filter, jobType: e.target.value})}
              className="px-4 py-3 border rounded-xl bg-white">
              <option value="">All Types</option>
              <option value="LOCAL">🏠 Local</option>
              <option value="REMOTE">🌍 Remote</option>
              <option value="HYBRID">🔄 Hybrid</option>
                        </select>
            {filter.jobType !== 'REMOTE' && (
              <>
                <input type="text" placeholder="City" value={filter.city}
                  onChange={e => setFilter({...filter, city: e.target.value})}
                  className="px-4 py-3 border rounded-xl bg-white w-32" />
                <input type="text" placeholder="Country" value={filter.country}
                  onChange={e => setFilter({...filter, country: e.target.value})}
                  className="px-4 py-3 border rounded-xl bg-white w-32" />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-3 text-center py-20">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No jobs available</p>
              <Link href="/contracts/create" className="text-blue-600 hover:underline mt-2 inline-block">Post a job →</Link>
            </div>
          ) : (
            filtered.map((job: any) => (
              <motion.div key={job.id} whileHover={{ y: -3 }}
                className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    job.jobType === 'REMOTE' ? 'bg-purple-100 text-purple-700' :
                    job.jobType === 'LOCAL' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {job.jobType === 'REMOTE' ? '🌍 Remote' : job.jobType === 'LOCAL' ? '🏠 Local' : '🔄 Hybrid'}
                  </span>
                  <span className="text-xs text-gray-400">{job.category || 'General'}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{job.description}</p>
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                  {job.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>}
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500" /> {job.client?.vouchScore || 100}</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-xl font-bold text-green-600">₹{job.amount?.toLocaleString()}</span>
                  <Link href={`/jobs/${job.id}`} className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                    View Details <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}