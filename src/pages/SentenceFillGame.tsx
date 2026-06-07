import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGameStore } from '../hooks/useGameStore';
import { sentenceFillItems } from '../utils/sentences';
import { words } from '../utils/words';
import { speakWord } from '../utils/audio';
import { playSound } from '../utils/sounds';
import { ArrowLeft } from 'lucide-react';

interface FillOption {
  english: string;
  chinese: string;
  isCorrect: boolean;
}

export default function SentenceFillGame() {
  const { addScore, incrementGames, incrementCorrect, recordDailyProgress } = useGameStore();
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const initGame = useCallback(() => {
    const shuffled = [...sentenceFillItems].sort(() => Math.random() - 0.5);
    const qs = shuffled.slice(0, 10).map((item) => {
      const wrongAnswers = words
        .filter((w) => w.english !== item.blankWord)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2)
        .map((w) => w.english);
      const options = [...wrongAnswers, item.blankWord].sort(() => Math.random() - 0.5);
      return { item, options };
    });
    setQuestions(qs);
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setStarted(true);
  }, []);

  useEffect(() => {
    if (!started || questions.length === 0) return;
    const q = questions[currentQ];
    if (!q) return;
    speakWord(q.item.sentence.replace('___', q.item.blankWord));
  }, [currentQ, started, questions]);

  const handleSelect = (option: string) => {
    if (selected) return;
    setSelected(option);
    const q = questions[currentQ];
    if (option === q.item.blankWord) {
      setScore((s) => s + 10);
      playSound('match');
      addScore(10);
      incrementCorrect();
    } else {
      playSound('error');
    }
    setTimeout(() => {
      if (currentQ < 9) {
        setCurrentQ((q) => q + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 1200);
  };

  useEffect(() => {
    if (!finished) return;
    incrementGames();
    recordDailyProgress(1, score / 10, score);
  }, [finished]);

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-500 p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Link to="/" className="inline-flex p-2 bg-white/30 backdrop-blur rounded-full mb-6">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">句子填空</h1>
            <p className="text-gray-500 mb-6">选择正确的单词填入句子</p>
            <button onClick={initGame} className="w-full bg-gradient-to-r from-indigo-400 to-purple-500 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">开始游戏</button>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-500 p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">游戏结束！</h2>
            <p className="text-4xl font-bold text-purple-500 mb-2">{score}分</p>
            <p className="text-gray-500 mb-6">答对 {score / 10} / 10 题</p>
            <div className="flex gap-3 justify-center">
              <Link to="/" className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-400 transition-colors">返回首页</Link>
              <button onClick={initGame} className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">再来一局</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];
  if (!q) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-500 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="p-2 bg-white/30 backdrop-blur rounded-full">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <span className="bg-white/30 backdrop-blur rounded-full px-3 py-1 text-white font-bold">{currentQ + 1} / 10</span>
          <span className="bg-white/30 backdrop-blur rounded-full px-3 py-1 text-white font-bold">{score}分</span>
        </div>

        {/* Sentence */}
        <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl mb-6">
          <div className="text-4xl text-center mb-3">{q.item.emoji}</div>
          <div className="text-center mb-4">
            {q.item.sentence.split('___').map((part: string, i: number) => (
              <span key={i}>
                {part}
                {i < q.item.sentence.split('___').length - 1 && (
                  <span className="inline-block border-b-2 border-purple-500 min-w-[60px] text-center font-bold text-purple-600 px-1">
                    {selected ? (
                      <span className={selected === q.item.blankWord ? 'text-green-500' : 'text-red-500'}>{selected}</span>
                    ) : (
                      <span className="text-gray-400">?</span>
                    )}
                  </span>
                )}
              </span>
            ))}
          </div>
          <div className="text-center text-sm text-gray-500">{q.item.chinese}</div>
          {!selected && (
            <button onClick={() => speakWord(q.item.sentence.replace('___', q.item.blankWord))} className="mt-3 mx-auto block text-sm text-purple-500 hover:text-purple-700">
              🔊 听句子
            </button>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3">
          {q.options.map((option: string) => {
            const isCorrect = option === q.item.blankWord;
            const isSelected = selected === option;
            let bgClass = 'bg-white/95 backdrop-blur';
            if (selected) {
              if (isCorrect) bgClass = 'bg-green-400 text-white';
              else if (isSelected) bgClass = 'bg-red-400 text-white';
            }
            return (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                disabled={!!selected}
                className={`w-full rounded-2xl p-4 shadow-lg transition-all text-center font-bold text-lg ${bgClass} ${!selected ? 'hover:scale-[1.02]' : ''}`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
