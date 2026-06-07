import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sentenceFillItems, dialogueItems, listenSentenceItems } from '../utils/sentences';
import { speakWord } from '../utils/audio';
import { ArrowLeft, Volume2 } from 'lucide-react';

const categories = ['all', 'sentence', 'dialogue', 'listen'];
const categoryNames: Record<string, string> = {
  all: '全部',
  sentence: '句子填空',
  dialogue: '对话补全',
  listen: '听句选句',
};

export default function SentenceBook() {
  const [category, setCategory] = useState('all');

  const getSentenceSentences = () => {
    return sentenceFillItems.map(item => ({ english: item.sentence, chinese: item.chinese }));
  };

  const getDialogueSentences = () => {
    return dialogueItems.map(item => ({ english: item.speakerB, chinese: item.speakerBChinese }));
  };

  const getListenSentences = () => {
    return listenSentenceItems.map(item => ({ english: item.sentence, chinese: item.chinese }));
  };

  const getAllSentences = () => {
    return [
      ...getSentenceSentences(),
      ...getDialogueSentences(),
      ...getListenSentences(),
    ];
  };

  const getFilteredSentences = () => {
    if (category === 'all') return getAllSentences();
    if (category === 'sentence') return getSentenceSentences();
    if (category === 'dialogue') return getDialogueSentences();
    if (category === 'listen') return getListenSentences();
    return [];
  };

  const sentences = getFilteredSentences();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="p-2 bg-white/30 backdrop-blur rounded-full">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-xl font-bold text-white">句子本</h1>
          <span className="bg-white/30 backdrop-blur rounded-full px-3 py-1 text-white text-sm">{sentences.length}句</span>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                category === cat ? 'bg-white text-rose-500' : 'bg-white/30 backdrop-blur text-white'
              }`}
            >
              {categoryNames[cat]}
            </button>
          ))}
        </div>

        {/* Sentence cards */}
        <div className="space-y-3">
          {sentences.map((sentence, index) => (
            <div
              key={index}
              className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="text-lg font-bold text-gray-800">{sentence.english}</div>
                  <div className="text-sm text-gray-500 mt-1">{sentence.chinese}</div>
                </div>
                <button
                  onClick={() => speakWord(sentence.english, true)}
                  className="p-2 bg-rose-100 rounded-full text-rose-500 hover:bg-rose-200 transition-colors flex-shrink-0"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
