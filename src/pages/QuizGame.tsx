import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGameStore } from '../hooks/useGameStore';
import { words } from '../utils/words';
import { speakWord } from '../utils/audio';
import { playSound } from '../utils/sounds';
import { ArrowLeft } from 'lucide-react';

export default function QuizGame() {
  const { addScore, incrementGames, incrementCorrect, recordDailyProgress } = useGameStore();
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correct, setCorrect] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const initGame = useCallback(() => {
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    const qs = shuffled.slice(0, 10).map((word) => {
      const others = shuffled.filter((w) => w.id !== word.id).slice(0, 2);
      const options = [...others, word].sort(() => Math.random() - 0.5);
      return { word, options };
    });
    setQuestions(qs);
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setCorrect(null);
    setFinished(false);
    setStarted(true);
  }, []);

  const handleSelect = (option: any) => {
    if (selected) return;
    setSelected(option.english);
    const q = questions[currentQ];
    if (option.id === q.word.id) {
      setCorrect(option.english);
      setScore((s) => s + 10);
      playSound('match');
      addScore(10);
      incrementCorrect();
    } else {
      setCorrect(q.word.english);
      playSound('error');
    }
    speakWord(option.english, true);
    setTimeout(() => {
      if (currentQ < 9) {
        setCurrentQ((q) => q + 1);
        setSelected(null);
        setCorrect(null);
      } else {
        setFinished(true);
      }
    }, 1200);
  };

  useEffect(() => {
    if (finished) {
      incrementGames();
      recordDailyProgress(1, score / 10, score);
    }
  }, [finished, score, incrementGames, recordDailyProgress]);

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-400 via-purple-400 to-fuchsia-500 p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Link to="/" className="inline-flex p-2 bg-white/30 backdrop-blur rounded-full mb-6">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">看图选词</h1>
            <p className="text-gray-500 mb-6">看图片和中文提示，选择正确的英文单词</p>
            <button
              onClick={initGame}
              className="w-full bg-gradient-to-r from-violet-400 to-purple-500 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
            >
              开始游戏
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-400 via-purple-400 to-fuchsia-500 p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">游戏结束！</h2>
            <p className="text-4xl font-bold text-purple-500 mb-2">{score}分</p>
            <p className="text-gray-500 mb-6">答对 {score / 10} / 10 题</p>
            <div className="flex gap-3 justify-center">
              <Link to="/" className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-400 transition-colors">返回首页</Link>
              <button
                onClick={initGame}
                className="bg-gradient-to-r from-violet-400 to-purple-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
              >
                再来一局
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];
  if (!q) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-400 via-purple-400 to-fuchsia-500 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="p-2 bg-white/30 backdrop-blur rounded-full">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <span className="bg-white/30 backdrop-blur rounded-full px-3 py-1 text-white font-bold">
            {currentQ + 1} / 10
          </span>
          <span className="bg-white/30 backdrop-blur rounded-full px-3 py-1 text-white font-bold">
            {score}分
          </span>
        </div>

        {/* Question */}
        <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl text-center mb-6">
          <div className="text-6xl mb-4">{q.word.emoji}</div>
          <div className="text-xl text-gray-500">{q.word.chinese}</div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {q.options.map((opt: any) => {
            const isCorrect = opt.id === q.word.id;
            const isSelected = selected === opt.english;
            let bgClass = 'bg-white/95 backdrop-blur';
            if (selected) {
              if (isCorrect) bgClass = 'bg-green-400 text-white';
              else if (isSelected) bgClass = 'bg-red-400 text-white';
            }
            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt)}
                disabled={!!selected}
                className={`w-full rounded-2xl p-4 shadow-lg transition-all text-left flex items-center gap-4 ${bgClass} ${!selected ? 'hover:scale-[1.02]' : ''}`}
              >
                <span className="text-xl font-bold flex-1">{opt.english}</span>
                {selected && isCorrect && <span className="text-2xl">✅</span>}
                {selected && isSelected && !isCorrect && <span className="text-2xl">❌</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
