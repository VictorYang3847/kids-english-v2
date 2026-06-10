import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGameStore } from '../hooks/useGameStore';
import { words, Word, categoryNames } from '../utils/words';
import { speakWord } from '../utils/audio';
import { playSound } from '../utils/sounds';
import { ArrowLeft, Volume2 } from 'lucide-react';

type Difficulty = 'easy' | 'medium' | 'hard';

interface Question {
  word: Word;
  options: Word[];
}

export default function ListeningGame() {
  const { addScore, incrementGames, incrementCorrect, recordDailyProgress } = useGameStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const getFilteredWords = (d: Difficulty) => {
    let filtered = words;
    if (category !== 'all') filtered = filtered.filter((w) => category.split(',').includes(w.category));
    if (d === 'easy') return filtered.filter((w) => w.english.length <= 4);
    if (d === 'medium') return filtered.filter((w) => w.english.length <= 6);
    return filtered;
  };

  const initGame = useCallback(() => {
    const filtered = getFilteredWords(difficulty);
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    const qs: Question[] = shuffled.slice(0, 10).map((word) => {
      const others = filtered.filter((w) => w.id !== word.id).sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [...others, word].sort(() => Math.random() - 0.5);
      return { word, options };
    });
    setQuestions(qs);
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setStarted(true);
  }, [difficulty]);

  useEffect(() => {
    if (!started || questions.length === 0) return;
    const q = questions[currentQ];
    if (!q) return;
    const timer = setTimeout(() => speakWord(q.word.english), 300);
    return () => clearTimeout(timer);
  }, [currentQ, started, questions]);

  const handleSelect = (option: string) => {
    if (selected) return;
    setSelected(option);
    const q = questions[currentQ];
    if (option === q.word.english) {
      setScore((s) => s + 10);
      playSound('match');
      addScore(10);
      incrementCorrect();
      speakWord(q.word.english, true);
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
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-400 to-teal-500 p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <button onClick={() => navigate(`/practice?category=${category}`)} className="inline-flex p-2 bg-white/30 backdrop-blur rounded-full mb-6">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">听力</h1>
            <p className="text-gray-500 text-center mb-6">听发音，选择正确的单词</p>
            <div className="space-y-3 mb-6">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`w-full py-3 rounded-xl font-bold transition-all ${
                    difficulty === d
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {d === 'easy' ? '简单 (短单词)' : d === 'medium' ? '中等' : '困难 (全部)'}
                </button>
              ))}
            </div>
            <button
              onClick={initGame}
              className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
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
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-400 to-teal-500 p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">游戏结束！</h2>
            <p className="text-4xl font-bold text-green-500 mb-2">{score}分</p>
            <p className="text-gray-500 mb-6">答对 {score / 10} / 10 题</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => navigate(`/practice?category=${category}`)} className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-400 transition-colors">返回</button>
              <button
                onClick={initGame}
                className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
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
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-400 to-teal-500 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate(`/practice?category=${category}`)} className="p-2 bg-white/30 backdrop-blur rounded-full">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <span className="bg-white/30 backdrop-blur rounded-full px-3 py-1 text-white font-bold">
            {currentQ + 1} / 10
          </span>
          <span className="bg-white/30 backdrop-blur rounded-full px-3 py-1 text-white font-bold">
            {score}分
          </span>
        </div>

        {/* Play button */}
        <div className="text-center mb-6">
          <button
            onClick={() => speakWord(q.word.english, true)}
            className="bg-white/95 backdrop-blur rounded-full w-20 h-20 shadow-xl hover:scale-105 transition-transform flex items-center justify-center mx-auto mb-4"
          >
            <Volume2 className="w-10 h-10 text-green-500" />
          </button>
          <p className="text-white/80 text-sm">点击听发音</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {q.options.map((opt) => {
            const isCorrect = opt.english === q.word.english;
            const isSelected = selected === opt.english;
            let bgClass = 'bg-white/95 backdrop-blur';
            if (selected) {
              if (isCorrect) bgClass = 'bg-green-400 text-white';
              else if (isSelected) bgClass = 'bg-red-400 text-white';
            }
            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.english)}
                disabled={!!selected}
                className={`${bgClass} rounded-2xl p-4 shadow-lg transition-all ${
                  !selected ? 'hover:scale-105' : ''
                }`}
              >
                <div className="text-2xl mb-1">{opt.emoji}</div>
                <div className={`font-bold ${selected && !isCorrect && isSelected ? 'text-white' : 'text-gray-800'}`}>{opt.english}</div>
                <div className={`text-sm ${selected && !isCorrect && isSelected ? 'text-white/80' : 'text-gray-500'}`}>{opt.chinese}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
