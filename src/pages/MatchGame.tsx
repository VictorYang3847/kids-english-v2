import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGameStore } from '../hooks/useGameStore';
import { words } from '../utils/words';
import { speakWord } from '../utils/audio';
import { playSound } from '../utils/sounds';
import { ArrowLeft } from 'lucide-react';

interface WordPair {
  wordId: string;
  en: string;
  cn: string;
  matched: boolean;
  selected: boolean;
}

interface MatchedLine {
  x1: number; y1: number; x2: number; y2: number;
}

export default function MatchGame() {
  const { addScore, incrementGames, incrementCorrect, recordDailyProgress } = useGameStore();
  const [timerMode, setTimerMode] = useState(false);
  const [pairs, setPairs] = useState<WordPair[]>([]);
  const [enOrder, setEnOrder] = useState<string[]>([]);
  const [selectedSide, setSelectedSide] = useState<'en' | 'cn' | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [matches, setMatches] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [checking, setChecking] = useState(false);
  const [lines, setLines] = useState<MatchedLine[]>([]);
  const areaRef = useRef<HTMLDivElement>(null);
  const cnRefs = useRef<Map<string, HTMLButtonElement | null>>(new Map());
  const enRefs = useRef<Map<string, HTMLButtonElement | null>>(new Map());

  const initGame = useCallback(() => {
    const shuffled = [...words].sort(() => Math.random() - 0.5).slice(0, 6);
    const newPairs: WordPair[] = shuffled.map((w) => ({
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
    setScore(0);
    setMatches(0);
    setTimeLeft(60);
    setGameOver(false);
    setChecking(false);
    setLines([]);
    cnRefs.current.clear();
    enRefs.current.clear();
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

  const captureLine = useCallback((wordId: string): MatchedLine | null => {
    const area = areaRef.current;
    const cnEl = cnRefs.current.get(wordId);
    const enEl = enRefs.current.get(wordId);
    if (!area || !cnEl || !enEl) return null;
    const areaRect = area.getBoundingClientRect();
    const cnRect = cnEl.getBoundingClientRect();
    const enRect = enEl.getBoundingClientRect();
    return {
      x1: cnRect.right - areaRect.left,
      y1: cnRect.top + cnRect.height / 2 - areaRect.top,
      x2: enRect.left - areaRect.left,
      y2: enRect.top + enRect.height / 2 - areaRect.top,
    };
  }, []);

  const handleClick = (side: 'en' | 'cn', wordId: string) => {
    if (checking || gameOver) return;
    const pair = pairs.find((p) => p.wordId === wordId);
    if (!pair || pair.matched) return;

    // Deselect same card
    if (selectedSide === side && selectedId === wordId) {
      setPairs((prev) => prev.map((p) => (p.wordId === wordId ? { ...p, selected: false } : p)));
      setSelectedSide(null);
      setSelectedId(null);
      return;
    }

    // First selection
    if (!selectedSide) {
      setPairs((prev) => prev.map((p) => (p.wordId === wordId ? { ...p, selected: true } : p)));
      setSelectedSide(side);
      setSelectedId(wordId);
      return;
    }

    // Same side switch
    if (selectedSide === side) {
      setPairs((prev) => prev.map((p) =>
        p.wordId === wordId ? { ...p, selected: true } : p.selected ? { ...p, selected: false } : p
      ));
      setSelectedId(wordId);
      return;
    }

    // Check match
    setPairs((prev) => prev.map((p) => (p.wordId === wordId ? { ...p, selected: true } : p)));
    setChecking(true);
    const firstPair = pairs.find((p) => p.wordId === selectedId)!;

    if (firstPair.wordId === wordId) {
      setTimeout(() => {
        const word = words.find((w) => w.id === wordId);
        if (word) speakWord(word.english, true);
        playSound('match');

        // Capture line positions before removing cards
        const line = captureLine(wordId);
        if (line) setLines((prev) => [...prev, line]);

        // Remove matched pair from arrays
        setPairs((prev) => prev.filter((p) => p.wordId !== wordId));
        setEnOrder((prev) => prev.filter((id) => id !== wordId));

        setScore((s) => s + 10);
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

        {/* Mode toggle */}
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

        {/* Game Area with SVG lines overlay */}
        <div className="relative" ref={areaRef}>
          {/* SVG connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" style={{ overflow: 'visible' }}>
            {lines.map((l, i) => (
              <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                stroke="#4ade80" strokeWidth="3" strokeLinecap="round"
                className="animate-pulse" />
            ))}
          </svg>

          {/* Cards - Chinese on left, English on right */}
          <div className="grid grid-cols-2 gap-4">
            {/* Left: Chinese */}
            <div className="space-y-3">
              <div className="text-center text-white font-bold text-sm mb-1">中文</div>
              {pairs.map((pair) => (
                <button
                  key={`${pair.wordId}-cn`}
                  ref={(el) => { cnRefs.current.set(pair.wordId, el); }}
                  onClick={() => handleClick('cn', pair.wordId)}
                  disabled={pair.matched}
                  className={`w-full rounded-2xl py-4 shadow-lg transition-all duration-300 text-center font-medium text-lg
                    ${pair.selected && selectedSide === 'cn' && selectedId === pair.wordId
                      ? 'bg-blue-300 text-blue-900 ring-4 ring-blue-200 scale-105'
                      : 'bg-blue-500 text-white hover:scale-105'
                    }
                  `}
                >
                  {pair.cn}
                </button>
              ))}
            </div>

            {/* Right: English (shuffled) */}
            <div className="space-y-3">
              <div className="text-center text-white font-bold text-sm mb-1">English</div>
              {enOrder.filter((id) => pairs.find((p) => p.wordId === id)).map((wordId) => {
                const pair = pairs.find((p) => p.wordId === wordId);
                if (!pair) return null;
                return (
                  <button
                    key={`${pair.wordId}-en`}
                    ref={(el) => { enRefs.current.set(pair.wordId, el); }}
                    onClick={() => handleClick('en', pair.wordId)}
                    disabled={pair.matched}
                    className={`w-full rounded-2xl py-4 shadow-lg transition-all duration-300 text-center font-medium text-lg
                      ${pair.selected && selectedSide === 'en' && selectedId === pair.wordId
                        ? 'bg-amber-300 text-amber-900 ring-4 ring-amber-200 scale-105'
                        : 'bg-amber-400 text-gray-800 hover:scale-105'
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

        {/* Game Over - moved up */}
        {gameOver && (
          <div className="mt-4 bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {matches === 6 ? '恭喜完成！' : '时间到！'}
            </h2>
            <p className="text-gray-600 mb-4">得分：{score}分 | 配对：{matches}/6</p>
            <div className="flex gap-3 justify-center">
              <Link to="/" className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-400 transition-colors">返回首页</Link>
              <button onClick={initGame} className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">再来一局</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
