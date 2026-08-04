'use client';

import { useState } from 'react';
import { Award, CheckCircle, Star, TrendingUp } from 'lucide-react';

const skillTests = [
  // Home Services
  { id: 'painting', name: '🎨 Painting Skills', questions: 10, time: '10 min', category: 'Home Services' },
  { id: 'plumbing', name: '🔧 Plumbing Basics', questions: 15, time: '15 min', category: 'Home Services' },
  { id: 'electrical', name: '⚡ Electrical Knowledge', questions: 15, time: '15 min', category: 'Home Services' },
  { id: 'carpentry', name: '🪚 Carpentry Skills', questions: 12, time: '12 min', category: 'Home Services' },
  
  // Languages
  { id: 'english', name: '📝 English Communication', questions: 20, time: '20 min', category: 'Language' },
  { id: 'spanish', name: '📝 Spanish (Español)', questions: 20, time: '20 min', category: 'Language' },
  { id: 'french', name: '📝 French (Français)', questions: 20, time: '20 min', category: 'Language' },
  { id: 'arabic', name: '📝 Arabic (العربية)', questions: 20, time: '20 min', category: 'Language' },
  { id: 'portuguese', name: '📝 Portuguese (Português)', questions: 20, time: '20 min', category: 'Language' },
  { id: 'mandarin', name: '📝 Mandarin Chinese', questions: 20, time: '20 min', category: 'Language' },
  { id: 'japanese', name: '📝 Japanese (日本語)', questions: 20, time: '20 min', category: 'Language' },
  { id: 'hindi', name: '📝 Hindi Communication', questions: 20, time: '20 min', category: 'Language' },
  
  // Software & Tech
  { id: 'excel', name: '📊 MS Excel', questions: 15, time: '15 min', category: 'Software' },
  { id: 'typing', name: '⌨️ Typing Speed', questions: 1, time: '5 min', category: 'Software' },
  { id: 'web-dev', name: '💻 Web Development', questions: 20, time: '20 min', category: 'Software' },
  { id: 'python', name: '🐍 Python Programming', questions: 15, time: '15 min', category: 'Software' },
  { id: 'graphic-design', name: '🎨 Graphic Design', questions: 15, time: '15 min', category: 'Software' },
  { id: 'video-editing', name: '🎥 Video Editing', questions: 12, time: '12 min', category: 'Software' },
  { id: 'seo', name: '🔍 SEO Basics', questions: 15, time: '15 min', category: 'Software' },
  
  // Personal Services
  { id: 'cooking', name: '🍳 Cooking Basics', questions: 10, time: '10 min', category: 'Personal Services' },
  { id: 'driving', name: '🚗 Driving Knowledge', questions: 15, time: '15 min', category: 'Transport' },
  { id: 'fitness', name: '💪 Fitness Training', questions: 12, time: '12 min', category: 'Personal Services' },
  { id: 'beauty', name: '💇 Beauty & Salon', questions: 10, time: '10 min', category: 'Personal Services' },
  { id: 'photography', name: '📸 Photography Basics', questions: 12, time: '12 min', category: 'Personal Services' },
  
  // Business
  { id: 'customer-service', name: '🎧 Customer Service', questions: 15, time: '15 min', category: 'Business' },
  { id: 'sales', name: '💼 Sales Skills', questions: 15, time: '15 min', category: 'Business' },
  { id: 'accounting', name: '📋 Basic Accounting', questions: 15, time: '15 min', category: 'Business' },
];

export default function SkillsPage() {
  const [certified, setCertified] = useState<string[]>([]);

  const takeTest = (skillId: string) => {
    // Simulate test completion
    setCertified([...certified, skillId]);
    alert('Test completed! You scored 92%. Badge earned! 🏆');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold">Skill Tests</h1>
          <p className="text-xl text-gray-500 mt-2">Get certified and stand out from the competition</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="bg-blue-50 px-4 py-2 rounded-full text-sm text-blue-700">
              🏆 {certified.length} Certifications
            </div>
            <div className="bg-green-50 px-4 py-2 rounded-full text-sm text-green-700">
              ⭐ Boosts Vouch Score
            </div>
          </div>
        </div>

        {/* Why take tests */}
        <div className="bg-white rounded-2xl p-6 border mb-8">
          <h2 className="font-semibold text-lg mb-4">Why Get Certified?</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { icon: <Star className="w-8 h-8" />, title: 'Higher Score', desc: '+25 Vouch Score per badge' },
              { icon: <TrendingUp className="w-8 h-8" />, title: 'More Jobs', desc: 'Certified providers get 3x more jobs' },
              { icon: <CheckCircle className="w-8 h-8" />, title: 'Trust Badge', desc: 'Verified skill badge on profile' },
            ].map((s, i) => (
              <div key={i} className="p-4">
                <div className="text-blue-600 mb-2 flex justify-center">{s.icon}</div>
                <div className="font-semibold text-sm">{s.title}</div>
                <div className="text-xs text-gray-500">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Test Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillTests.map(test => (
            <div key={test.id} className={`bg-white p-6 rounded-2xl border ${certified.includes(test.id) ? 'border-green-400 bg-green-50' : 'hover:border-blue-200'}`}>
              <div className="text-3xl mb-2">{test.name.split(' ')[0]}</div>
              <h3 className="font-semibold">{test.name}</h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span>📝 {test.questions} Q</span>
                <span>⏱️ {test.time}</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">{test.category}</div>
              {certified.includes(test.id) ? (
                <div className="mt-4 bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-medium text-center">
                  ✅ Certified
                </div>
              ) : (
                <button onClick={() => takeTest(test.id)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-blue-700">
                  Take Test
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}