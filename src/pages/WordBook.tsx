import { useState } from 'react';
import { Link } from 'react-router-dom';
import { words, categoryNames, categoryEmojis } from '../utils/words';
import { speakWord } from '../utils/audio';
import { ArrowLeft, Volume2 } from 'lucide-react';

export default function WordBook() {
  const [category, setCategory] = useState<string>('all');

  const filtered = category === 'all' ? words : words.filter((w) => w.category === category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-500 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="p-2 bg-white/30 backdrop-blur rounded-full">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-xl font-bold text-white">单词本</h1>
          <span className="bg-white/30 backdrop-blur rounded-full px-3 py-1 text-white text-sm">
            {filtered.length} 个单词
          </span>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(categoryNames).map(([key, name]) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                category === key
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'bg-white/30 text-white hover:bg-white/50'
              }`}
            >
              {categoryEmojis[key]} {name}
            </button>
          ))}
        </div>

        {/* Word grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((word) => (
            <div
              key={word.id}
              className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg hover:scale-105 transition-transform text-center"
            >
              <div className="text-3xl mb-2">{word.emoji}</div>
              <div className="text-lg font-bold text-gray-800">{word.english}</div>
              <div className="text-sm text-gray-500 mb-2">{word.chinese}</div>
              <button
                onClick={() => speakWord(word.english, true)}
                className="text-purple-500 hover:text-purple-700 transition-colors"
              >
                <Volume2 className="w-5 h-5 mx-auto" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
