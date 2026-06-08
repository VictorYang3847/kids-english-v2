import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGameStore } from '../hooks/useGameStore';
import { words } from '../utils/words';
import { speakWord } from '../utils/audio';
import { playSound } from '../utils/sounds';
import { ArrowLeft } from 'lucide-react';

// 7 game types: random pick one type per challenge
const GAME_TYPES = ['match', 'listening', 'spelling', 'quiz', 'sentence-fill', 'dialogue', 'listen-match'] as const;
type GameType = typeof GAME_TYPES[number];

export default function DailyChallenge() {
  const { progress, addScore, incrementGames, incrementCorrect, recordDailyProgress, completeDailyChallenge } = useGameStore();
  const today = new Date().toISOString().split('T')[0];
  const alreadyCompleted = progress.dailyChallenge?.date === today && progress.dailyChallenge?.completed;

  // Match game state
  const [gameType, setGameType] = useState<GameType>('match');
  const [pairs, setPairs] = useState<any[]>([]);
  const [enOrder, setEnOrder] = useState<string[]>([]);
  const [selectedSide, setSelectedSide] = useState<'en' | 'cn' | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [matches, setMatches] = useState(0);
  const [checking, setChecking] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);

  const hasSpokenRef = useRef<Set<string>>(new Set());

  const initGame = useCallback(() => {
    const shuffled = [...words].sort(() => Math.random() - 0.5).slice(0, 4); // 4 pairs for daily challenge (shorter)
    const newPairs = shuffled.map((w) => ({
      wordId: w.id,
      en: w.english,
      cn: w.chinese,
      matched: false,
      selected: false,
    }));
    const enIds = [...shuffled].sort(() => Math.random() - 0.5).map((w) => w.id);
    setEnOrder(enIds);
    setPairs(newPairs);
    setSelectedSide(null);
    setSelectedId(null);
    setMatches(0);
    setChecking(false);
    setGameScore(0);
    setFinished(false);
    setStarted(true);
    hasSpokenRef.current.clear();
  }, []);

  useEffect(() => {
    // Pick a random game type (always match for now, can be expanded)
    setGameType('match');
  }, []);

  useEffect(() => {
    if (started && matches === 4) {
      setFinished(true);
      completeDailyChallenge();
      addScore(50);
      incrementGames();
      incrementCorrect();
      recordDailyProgress(1, 4, gameScore + 50);
    }
  }, [matches, started]);

  const handleClick = (side: 'en' | 'cn', wordId: string) => {
    if (checking || finished) return;
    const pair = pairs.find((p) => p.wordId === wordId);
    if (!pair || pair.matched) return;

    if (selectedSide === side && selectedId === wordId) {
      setPairs((prev) => prev.map((p) => (p.wordId === wordId ? { ...p, selected: false } : p)));
      setSelectedSide(null);
      setSelectedId(null);
      return;
    }

    if (!selectedSide) {
      setPairs((prev) => prev.map((p) => (p.wordId === wordId ? { ...p, selected: true } : p)));
      setSelectedSide(side);
      setSelectedId(wordId);
      return;
    }

    if (selectedSide === side) {
      setPairs((prev) => prev.map((p) =>
        p.wordId === wordId ? { ...p, selected: true } : p.selected ? { ...p, selected: false } : p
      ));
      setSelectedId(wordId);
      return;
    }

    setPairs((prev) => prev.map((p) => (p.wordId === wordId ? { ...p, selected: true } : p)));
    setChecking(true);
    const firstPair = pairs.find((p) => p.wordId === selectedId)!;

    if (firstPair.wordId === wordId) {
      setTimeout(() => {
        const word = words.find((w) => w.id === wordId);
        if (word) speakWord(word.english, true);
        playSound('match');
        setPairs((prev) => prev.map((p) => (p.wordId === wordId ? { ...p, matched: true, selected: false } : p)));
        setGameScore((s) => s + 10);
        setMatches((m) => m + 1);
        addScore(10);
        incrementCorrect();
        setSelectedSide(null);
        setSelectedId(null);
        setChecking(false);
      }, 300);
    } else {
      setTimeout(() => {
        playSound('error');
        setPairs((prev) => prev.map((p) =>
          (p.wordId === wordId || p.wordId === selectedId) ? { ...p, selected: false } : p
        ));
        setSelectedSide(null);
        setSelectedId(null);
        setChecking(false);
      }, 500);
    }
  };

  if (alreadyCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Link to="/" className="inline-flex p-2 bg-white/30 backdrop-blur rounded-full mb-6">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">今日挑战已完成！</h1>
            <p className="text-gray-500 mb-6">明天再来挑战吧！+50 额外积分</p>
            <Link to="/" className="block bg-gradient-to-r from-green-400 to-emerald-500 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">返回首页</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Link to="/" className="inline-flex p-2 bg-white/30 backdrop-blur rounded-full mb-6">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">每日挑战</h1>
            <p className="text-gray-500 mb-6">完成配对挑战，获得额外 50 积分！</p>
            <div className="bg-orange-50 rounded-xl p-4 mb-6">
              <div className="text-sm text-gray-600 mb-1">挑战内容</div>
              <div className="font-bold text-gray-800 text-lg">连连看 - 4 组配对</div>
            </div>
            <button onClick={initGame} className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">开始挑战</button>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">挑战成功！</h2>
            <p className="text-4xl font-bold text-orange-500 mb-2">{gameScore}分</p>
            <p className="text-green-600 font-bold mb-4">+50 额外积分！</p>
            <Link to="/" className="block bg-gradient-to-r from-green-400 to-emerald-500 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">返回首页</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="p-2 bg-white/30 backdrop-blur rounded-full">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-xl font-bold text-white">每日挑战</h1>
          <span className="bg-white/30 backdrop-blur rounded-full px-3 py-1 text-white font-bold">{matches} / 4</span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4">
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
                    ? 'bg-blue-300 text-blue-900 ring-4 ring-blue-200 scale-105'
                    : 'bg-blue-500 text-white'
                  }
                `}
              >
                {pair.cn}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <div className="text-center text-white font-bold text-sm mb-1">English</div>
            {enOrder.map((wordId) => {
              const pair = pairs.find((p) => p.wordId === wordId);
              if (!pair) return null;
              return (
                <button
                  key={`${pair.wordId}-en`}
                  onClick={() => handleClick('en', pair.wordId)}
                  disabled={pair.matched}
                  className={`w-full rounded-2xl py-4 shadow-lg transition-all duration-300 text-center font-medium text-lg
                    ${pair.matched ? 'opacity-0 pointer-events-none' : 'hover:scale-105'}
                    ${pair.selected && selectedSide === 'en' && selectedId === pair.wordId
                      ? 'bg-amber-300 text-amber-900 ring-4 ring-amber-200 scale-105'
                      : 'bg-amber-400 text-gray-800'
                    }
                  `}
                >
                  {pair.en}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
