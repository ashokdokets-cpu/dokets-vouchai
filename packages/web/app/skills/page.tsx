'use client';

import { useState } from 'react';
import { Award, CheckCircle, Star, TrendingUp, ArrowRight, Clock, X } from 'lucide-react';

const QUESTIONS: Record<string, { q: string; options: string[]; answer: number }[]> = {
  english: [
    { q: 'What is the correct spelling?', options: ['Recieve', 'Receive', 'Recive', 'Receeve'], answer: 1 },
    { q: 'Choose the correct sentence:', options: ['He go to school', 'He goes to school', 'He going to school', 'He gone to school'], answer: 1 },
    { q: 'What is a synonym for "happy"?', options: ['Sad', 'Angry', 'Joyful', 'Tired'], answer: 2 },
    { q: '"Break a leg" means:', options: ['Injury', 'Good luck', 'Bad luck', 'Dance'], answer: 1 },
    { q: 'Past tense of "run":', options: ['Runed', 'Ran', 'Running', 'Runned'], answer: 1 },
  ],
  painting: [
    { q: 'Which paint finish is best for bathrooms?', options: ['Matte', 'Eggshell', 'Semi-gloss', 'Flat'], answer: 2 },
    { q: 'What is primer used for?', options: ['Final coat', 'Surface preparation', 'Cleaning', 'Decoration'], answer: 1 },
    { q: 'How many coats of paint are typically recommended?', options: ['1', '2', '3', '4'], answer: 1 },
  ],
  excel: [
    { q: 'What does VLOOKUP do?', options: ['Creates charts', 'Searches for values', 'Formats cells', 'Prints documents'], answer: 1 },
    { q: 'Which formula adds numbers?', options: ['=AVERAGE()', '=SUM()', '=COUNT()', '=MAX()'], answer: 1 },
    { q: 'What is a Pivot Table used for?', options: ['Data summarization', 'Text editing', 'Image insertion', 'Password protection'], answer: 0 },
  ],
  typing: [
    { q: 'This is a timed typing test. Type the following sentence as fast as you can:', options: ['Start Typing Test'], answer: 0 },
  ],
};

const DEFAULT_QUESTIONS = [
  { q: 'What is the most important factor in this skill?', options: ['Quality', 'Speed', 'Cost', 'Experience'], answer: 0 },
  { q: 'How do you ensure customer satisfaction?', options: ['Listen to needs', 'Work fast', 'Charge less', 'Work alone'], answer: 0 },
  { q: 'What is the best way to improve?', options: ['Practice daily', 'Watch videos', 'Read books', 'Wait for opportunities'], answer: 0 },
];

export default function SkillsPage() {
  const [certified, setCertified] = useState<string[]>([]);
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);

  const skillTests = [
    { id: 'english', name: '📝 English', questions: 5, time: '5 min', category: 'Language' },
    { id: 'spanish', name: '📝 Spanish', questions: 5, time: '5 min', category: 'Language' },
    { id: 'french', name: '📝 French', questions: 5, time: '5 min', category: 'Language' },
    { id: 'arabic', name: '📝 Arabic', questions: 5, time: '5 min', category: 'Language' },
    { id: 'hindi', name: '📝 Hindi', questions: 5, time: '5 min', category: 'Language' },
    { id: 'painting', name: '🎨 Painting', questions: 3, time: '3 min', category: 'Home Services' },
    { id: 'plumbing', name: '🔧 Plumbing', questions: 5, time: '5 min', category: 'Home Services' },
    { id: 'excel', name: '📊 MS Excel', questions: 3, time: '3 min', category: 'Software' },
    { id: 'typing', name: '⌨️ Typing Speed', questions: 1, time: '2 min', category: 'Software' },
    { id: 'python', name: '🐍 Python', questions: 5, time: '5 min', category: 'Software' },
    { id: 'web-dev', name: '💻 Web Dev', questions: 5, time: '5 min', category: 'Software' },
    { id: 'cooking', name: '🍳 Cooking', questions: 5, time: '5 min', category: 'Personal Services' },
    { id: 'driving', name: '🚗 Driving', questions: 5, time: '5 min', category: 'Transport' },
    { id: 'fitness', name: '💪 Fitness', questions: 5, time: '5 min', category: 'Personal Services' },
    { id: 'photography', name: '📸 Photography', questions: 5, time: '5 min', category: 'Personal Services' },
    { id: 'customer-service', name: '🎧 Customer Service', questions: 5, time: '5 min', category: 'Business' },
    { id: 'sales', name: '💼 Sales', questions: 5, time: '5 min', category: 'Business' },
  ];

  const startTest = (skillId: string) => {
    setActiveTest(skillId);
    setCurrentQ(0);
    setScore(0);
    setAnswers([]);
    setShowResult(false);
  };

  const questions = QUESTIONS[activeTest || ''] || DEFAULT_QUESTIONS;

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    
    if (answerIndex === questions[currentQ].answer) {
      setScore(score + 1);
    }

    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
      const finalScore = Math.round(((score + (answerIndex === questions[currentQ].answer ? 1 : 0)) / questions.length) * 100);
      if (finalScore >= 70 && !certified.includes(activeTest!)) {
        setCertified([...certified, activeTest!]);
      }
    }
  };

  const closeTest = () => {
    setActiveTest(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold">Skill Tests</h1>
          <p className="text-xl text-gray-500 mt-2">Get certified and stand out globally</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="bg-blue-50 px-4 py-2 rounded-full text-sm text-blue-700">🏆 {certified.length} Certifications</div>
            <div className="bg-green-50 px-4 py-2 rounded-full text-sm text-green-700">⭐ +25 Vouch Score each</div>
          </div>
        </div>

        {/* Test Modal */}
        {activeTest && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
              {!showResult ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{skillTests.find(t => t.id === activeTest)?.name}</h3>
                      <p className="text-sm text-gray-500">Question {currentQ + 1} of {questions.length}</p>
                    </div>
                    <button onClick={closeTest} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mb-6">
                    <div className="h-2 bg-blue-600 rounded-full transition-all" style={{ width: `${((currentQ) / questions.length) * 100}%` }} />
                  </div>
                  <p className="text-lg font-medium mb-4">{questions[currentQ].q}</p>
                  <div className="space-y-3">
                    {questions[currentQ].options.map((opt, i) => (
                      <button key={i} onClick={() => handleAnswer(i)}
                        className="w-full text-left p-4 rounded-xl border hover:border-blue-400 hover:bg-blue-50 transition-all text-sm">
                        {String.fromCharCode(65 + i)}. {opt}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="text-6xl mb-4">{Math.round((score / questions.length) * 100) >= 70 ? '🎉' : '📚'}</div>
                  <h2 className="text-2xl font-bold mb-2">
                    {Math.round((score / questions.length) * 100) >= 70 ? 'Test Passed!' : 'Keep Learning!'}
                  </h2>
                  <p className="text-4xl font-bold text-blue-600 mb-2">{Math.round((score / questions.length) * 100)}%</p>
                  <p className="text-gray-500 mb-4">{score}/{questions.length} correct</p>
                  {Math.round((score / questions.length) * 100) >= 70 && (
                    <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl inline-block text-sm font-medium mb-4">
                      ✅ Certified! +25 Vouch Score
                    </div>
                  )}
                  <button onClick={closeTest}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700">
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

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
                <span><Clock className="w-3 h-3 inline" /> {test.time}</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">{test.category}</div>
              {certified.includes(test.id) ? (
                <div className="mt-4 bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-medium text-center">✅ Certified</div>
              ) : (
                <button onClick={() => startTest(test.id)}
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