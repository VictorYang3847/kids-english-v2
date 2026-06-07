import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGameStore } from '../hooks/useGameStore';
import { dialogueItems } from '../utils/sentences';
import { speakWord } from '../utils/audio';
import { playSound } from '../utils/sounds';
import { ArrowLeft } from 'lucide-react';

export default function DialogueGame() {
  const { addScore, incrementGames, incrementCorrect, recordDailyProgress } = useGameStore();
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const initGame = useCallback(() => {
    const shuffled = [...dialogueItems].sort(() => Math.random() - 0.5);
    const qs = shuffled.slice(0, 10).map((item) => {
      const wrongAnswers = dialogueItems
        .filter((d) => d.id !== item.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2)
        .map((d) => d.speakerB);
      const options = [...wrongAnswers, item.speakerB].sort(() => Math.random() - 0.5);
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
    setTimeout(() => speakWord(q.item.speakerA), 300);
  }, [currentQ, started, questions]);

  const handleSelect = (option: string) => {
    if (selected) return;
    setSelected(option);
    const q = questions[currentQ];
    if (option === q.item.speakerB) {
      setScore((s) => s + 10);
      playSound('match');
      addScore(10);
      incrementCorrect();
      speakWord(q.item.speakerB, true);
    } else {
      playSound('error');
      speakWord(q.item.speakerB, true);
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
      <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-500 p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Link to="/" className="inline-flex p-2 bg-white/30 backdrop-blur rounded-full mb-6">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">对话补全</h1>
            <p className="text-gray-500 mb-6">选择B的正确回答</p>
            <button onClick={initGame} className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">开始游戏</button>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-500 p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">游戏结束！</h2>
            <p className="text-4xl font-bold text-blue-500 mb-2">{score}分</p>
            <p className="text-gray-500 mb-6">答对 {score / 10} / 10 题</p>
            <div className="flex gap-3 justify-center">
              <Link to="/" className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-400 transition-colors">返回首页</Link>
              <button onClick={initGame} className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">再来一局</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];
  if (!q) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-500 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="p-2 bg-white/30 backdrop-blur rounded-full">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <span className="bg-white/30 backdrop-blur rounded-full px-3 py-1 text-white font-bold">{currentQ + 1} / 10</span>
          <span className="bg-white/30 backdrop-blur rounded-full px-3 py-1 text-white font-bold">{score}分</span>
        </div>

        {/* Speaker A */}
        <div className="bg-blue-100/90 backdrop-blur rounded-2xl p-4 shadow-lg mb-3">
          <div className="text-sm font-medium text-blue-600 mb-1">🗣️ A:</div>
          <div className="text-lg font-bold text-gray-800">{q.item.speakerA}</div>
          <div className="text-sm text-gray-500">{q.item.speakerAChinese}</div>
        </div>

        {/* Speaker B prompt */}
        <div className="bg-pink-100/90 backdrop-blur rounded-2xl p-4 shadow-lg mb-6">
          <div className="text-sm font-medium text-pink-600 mb-1">💬 B:</div>
          {selected ? (
            <div>
              <div className={`text-lg font-bold ${selected === q.item.speakerB ? 'text-green-600' : 'text-red-600'}`}>{selected}</div>
              {selected !== q.item.speakerB && (
                <div className="text-sm text-green-600 mt-1">正确答案: {q.item.speakerB}</div>
              )}
              <div className="text-sm text-gray-500">{q.item.speakerBChinese}</div>
            </div>
          ) : (
            <div className="text-lg text-gray-400">?</div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3">
          {q.options.map((option: string) => {
            const isCorrect = option === q.item.speakerB;
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
              </button>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <div className="text-4xl">{q.item.emoji}</div>
        </div>
      </div>
    </div>
  );
}
