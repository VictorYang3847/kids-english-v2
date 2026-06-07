import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGameStore } from '../hooks/useGameStore';
import { listenSentenceItems } from '../utils/sentences';
import { speakWord } from '../utils/audio';
import { playSound } from '../utils/sounds';
import { ArrowLeft, Volume2 } from 'lucide-react';

export default function ListenMatchGame() {
  const { addScore, incrementGames, incrementCorrect, recordDailyProgress } = useGameStore();
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const initGame = useCallback(() => {
    const shuffled = [...listenSentenceItems].sort(() => Math.random() - 0.5);
    const qs = shuffled.slice(0, 10).map((item) => {
      const wrongAnswers = listenSentenceItems
        .filter((s) => s.id !== item.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2)
        .map((s) => s.chinese);
      const options = [...wrongAnswers, item.chinese].sort(() => Math.random() - 0.5);
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
    setTimeout(() => speakWord(q.item.sentence), 300);
  }, [currentQ, started, questions]);

  const handleSelect = (option: string) => {
    if (selected) return;
    setSelected(option);
    const q = questions[currentQ];
    if (option === q.item.chinese) {
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
      <div className="min-h-screen bg-gradient-to-br from-rose-400 via-pink-400 to-red-500 p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Link to="/" className="inline-flex p-2 bg-white/30 backdrop-blur rounded-full mb-6">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">听句选句</h1>
            <p className="text-gray-500 mb-6">听英文句子，选择正确的中文翻译</p>
            <button onClick={initGame} className="w-full bg-gradient-to-r from-rose-400 to-red-500 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">开始游戏</button>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-400 via-pink-400 to-red-500 p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">游戏结束！</h2>
            <p className="text-4xl font-bold text-rose-500 mb-2">{score}分</p>
            <p className="text-gray-500 mb-6">答对 {score / 10} / 10 题</p>
            <button onClick={initGame} className="bg-gradient-to-r from-rose-400 to-red-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">再来一局</button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];
  if (!q) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-400 via-pink-400 to-red-500 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="p-2 bg-white/30 backdrop-blur rounded-full">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <span className="bg-white/30 backdrop-blur rounded-full px-3 py-1 text-white font-bold">{currentQ + 1} / 10</span>
          <span className="bg-white/30 backdrop-blur rounded-full px-3 py-1 text-white font-bold">{score}分</span>
        </div>

        {/* Play button */}
        <div className="text-center mb-6">
          <button
            onClick={() => speakWord(q.item.sentence, true)}
            className="bg-white/95 backdrop-blur rounded-full w-20 h-20 shadow-xl hover:scale-105 transition-transform flex items-center justify-center mx-auto mb-4"
          >
            <Volume2 className="w-10 h-10 text-rose-500" />
          </button>
          <p className="text-white/80 text-sm">点击听句子</p>
          <div className="text-3xl mt-2">{q.item.emoji}</div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {q.options.map((option: string) => {
            const isCorrect = option === q.item.chinese;
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
                className={`w-full rounded-2xl p-4 shadow-lg transition-all text-left ${bgClass} ${!selected ? 'hover:scale-[1.02]' : ''}`}
              >
                <div className="font-bold text-lg">{option}</div>
                {selected && isCorrect && <span className="text-green-200">✅</span>}
                {selected && isSelected && !isCorrect && <span className="text-red-200">❌</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
