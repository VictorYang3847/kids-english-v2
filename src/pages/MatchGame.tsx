import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useGameStore } from '../hooks/useGameStore';
import { words } from '../utils/words';
import { speakWord } from '../utils/audio';
import { playSound } from '../utils/sounds';
import { ArrowLeft } from 'lucide-react';

interface Card {
  id: string;
  text: string;
  wordId: string;
  type: 'en' | 'cn';
  matched: boolean;
  selected: boolean;
}

interface WordPair {
  wordId: string;
  en: string;
  cn: string;
  matched: boolean;
  selected: boolean;
}

export default function MatchGame() {
  const { addScore, incrementGames, incrementCorrect, recordDailyProgress } = useGameStore();
  const [timerMode, setTimerMode] = useState(false);
  const [pairs, setPairs] = useState<WordPair[]>([]);
  const [selectedSide, setSelectedSide] = useState<'en' | 'cn' | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [matches, setMatches] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [checking, setChecking] = useState(false);

  const initGame = useCallback(() => {
    const shuffled = [...words].sort(() => Math.random() - 0.5).slice(0, 6);
    const newPairs: WordPair[] = shuffled.map((w) => ({
      wordId: w.id,
      en: w.english,
      cn: w.chinese,
      matched: false,
      selected: false,
    }));
    setPairs(newPairs);
    setSelectedSide(null);
    setSelectedId(null);
    setScore(0);
    setMatches(0);
    setTimeLeft(60);
    setGameOver(false);
    setChecking(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (!timerMode || gameOver) return;
    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, timerMode, gameOver]);

  const handleClick = (side: 'en' | 'cn', wordId: string) => {
    if (checking || gameOver) return;
    const pair = pairs.find((p) => p.wordId === wordId);
    if (!pair || pair.matched) return;

    // If clicking the same side that's already selected, deselect
    if (selectedSide === side && selectedId === wordId) {
      setPairs((prev) => prev.map((p) => (p.wordId === wordId ? { ...p, selected: false } : p)));
      setSelectedSide(null);
      setSelectedId(null);
      return;
    }

    // If no first selection, select this one
    if (!selectedSide) {
      setPairs((prev) => prev.map((p) => (p.wordId === wordId ? { ...p, selected: true } : p)));
      setSelectedSide(side);
      setSelectedId(wordId);
      return;
    }

    // If same side, switch selection
    if (selectedSide === side) {
      setPairs((prev) => prev.map((p) =>
        p.wordId === wordId ? { ...p, selected: true } : p.selected ? { ...p, selected: false } : p
      ));
      setSelectedId(wordId);
      return;
    }

    // Different sides - check match
    setPairs((prev) => prev.map((p) => (p.wordId === wordId ? { ...p, selected: true } : p)));
    setChecking(true);
    const firstPair = pairs.find((p) => p.wordId === selectedId)!;

    if (firstPair.wordId === wordId) {
      // Match!
      setTimeout(() => {
        const word = words.find((w) => w.id === wordId);
        if (word) speakWord(word.english, true);
        playSound('match');
        setPairs((prev) =>
          prev.map((p) =>
            p.wordId === wordId ? { ...p, matched: true, selected: false } : p
          )
        );
        setScore((s) => s + 10);
        setMatches((m) => m + 1);
        addScore(10);
        incrementCorrect();
        setSelectedSide(null);
        setSelectedId(null);
        setChecking(false);
      }, 300);
    } else {
      // No match
      setTimeout(() => {
        playSound('error');
        setPairs((prev) =>
          prev.map((p) =>
            (p.wordId === wordId || p.wordId === selectedId) ? { ...p, selected: false } : p
          )
        );
        setScore((s) => s - 2);
        setSelectedSide(null);
        setSelectedId(null);
        setChecking(false);
      }, 500);
    }
  };

  useEffect(() => {
    if (matches === 6 && matches > 0) {
      setGameOver(true);
    }
  }, [matches]);

  useEffect(() => {
    if (!gameOver || matches === 0) return;
    incrementGames();
    recordDailyProgress(1, matches, Math.max(0, score));
  }, [gameOver, matches]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-500 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="p-2 bg-white/30 backdrop-blur rounded-full">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-xl font-bold text-white">连连看</h1>
          <div className="flex items-center gap-3">
            <span className="bg-white/30 backdrop-blur rounded-full px-3 py-1 text-white font-bold">
              {score}分
            </span>
            {timerMode && (
              <span className={`rounded-full px-3 py-1 font-bold ${timeLeft <= 10 ? 'bg-red-500' : 'bg-white/30 backdrop-blur'}`}>
                {timeLeft}s
              </span>
            )}
          </div>
        </div>

        {/* Mode toggle & Start */}
        {!gameOver && (
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => { setTimerMode(!timerMode); initGame(); }}
              className="flex-1 bg-white/30 backdrop-blur rounded-xl py-2 text-white text-sm font-medium"
            >
              {timerMode ? '普通模式' : '计时模式'}
            </button>
            <button
              onClick={initGame}
              className="flex-1 bg-white/30 backdrop-blur rounded-xl py-2 text-white text-sm font-medium"
            >
              重新开始
            </button>
          </div>
        )}

        {/* Cards - Chinese on left, English on right */}
        <div className="grid grid-cols-2 gap-4">
          {/* Left column: Chinese */}
          <div className="space-y-3">
            <div className="text-center text-white font-bold text-sm mb-1">中文</div>
            {pairs.map((pair) => (
              <button
                key={`${pair.wordId}-cn`}
                onClick={() => handleClick('cn', pair.wordId)}
                disabled={pair.matched}
                className={`w-full rounded-2xl py-4 shadow-lg transition-all duration-300 text-center font-medium text-lg
                  ${pair.matched ? 'opacity-0 pointer-events-none' : 'hover:scale-105'}
                  ${pair.selected && selectedSide === 'cn' && selectedId === pair.wordId
                    ? 'bg-yellow-400 scale-105'
                    : 'bg-blue-500 text-white'
                  }
                `}
              >
                {pair.cn}
              </button>
            ))}
          </div>

          {/* Right column: English */}
          <div className="space-y-3">
            <div className="text-center text-white font-bold text-sm mb-1">English</div>
            {pairs.map((pair) => (
              <button
                key={`${pair.wordId}-en`}
                onClick={() => handleClick('en', pair.wordId)}
                disabled={pair.matched}
                className={`w-full rounded-2xl py-4 shadow-lg transition-all duration-300 text-center font-medium text-lg
                  ${pair.matched ? 'opacity-0 pointer-events-none' : 'hover:scale-105'}
                  ${pair.selected && selectedSide === 'en' && selectedId === pair.wordId
                    ? 'bg-yellow-400 scale-105'
                    : 'bg-amber-400 text-gray-800'
                  }
                `}
              >
                {pair.en}
              </button>
            ))}
          </div>
        </div>

        {/* Game Over */}
        {gameOver && (
          <div className="mt-6 bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {matches === 6 ? '恭喜完成！' : '时间到！'}
            </h2>
            <p className="text-gray-600 mb-4">得分：{score}分 | 配对：{matches}/6</p>
            <div className="flex gap-3 justify-center">
              <Link to="/" className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-400 transition-colors">返回首页</Link>
              <button
                onClick={initGame}
                className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
              >
                再来一局
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
