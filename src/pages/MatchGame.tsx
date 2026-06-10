import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useGameStore } from '../hooks/useGameStore';
import { words, categoryNames } from '../utils/words';
import { speakWord } from '../utils/audio';
import { playSound } from '../utils/sounds';
import { ArrowLeft } from 'lucide-react';

interface Card {
  id: string;
  wordId: string;
  text: string;
  emoji: string;
  type: 'en' | 'cn';
  selected: boolean;
}

interface LinePos {
  x1: number; y1: number; x2: number; y2: number;
}

const LEVELS = [
  { name: '第1关', pairs: 4, label: '简单', rows: 2 },
  { name: '第2关', pairs: 6, label: '中等', rows: 3 },
  { name: '第3关', pairs: 8, label: '困难', rows: 4 },
];

export default function MatchGame() {
  const { addScore, incrementGames, incrementCorrect, recordDailyProgress } = useGameStore();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const gameWords = category === 'all' ? words : words.filter((w) => category.split(',').includes(w.category));
  const [level, setLevel] = useState(0);
  const [started, setStarted] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [matches, setMatches] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [checking, setChecking] = useState(false);
  const [lines, setLines] = useState<LinePos[]>([]);
  const [hoverLine, setHoverLine] = useState<LinePos | null>(null);
  const [animatingCards, setAnimatingCards] = useState<Set<string>>(new Set());
  const areaRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLButtonElement | null>>(new Map());
  const mousePos = useRef({ x: 0, y: 0 });

  const currentLevel = LEVELS[level];

  const initGame = useCallback((lv?: number) => {
    const lvl = lv ?? level;
    const cfg = LEVELS[lvl];
    const shuffled = [...gameWords].sort(() => Math.random() - 0.5).slice(0, cfg.pairs);

    const newCards: Card[] = [];
    shuffled.forEach((w) => {
      // Emoji on Chinese cards, not English
      newCards.push({ id: `${w.id}-en`, wordId: w.id, text: w.english, emoji: '', type: 'en', selected: false });
      newCards.push({ id: `${w.id}-cn`, wordId: w.id, text: w.chinese, emoji: w.emoji, type: 'cn', selected: false });
    });
    newCards.sort(() => Math.random() - 0.5);

    setCards(newCards);
    setSelectedId(null);
    setScore(0);
    setMatches(0);
    setTimeLeft(cfg.pairs * 15);
    setGameOver(false);
    setChecking(false);
    setLines([]);
    setAnimatingCards(new Set());
    cardRefs.current.clear();
    if (lv !== undefined) setLevel(lv);
    setStarted(true);
  }, [level]);

  useEffect(() => {
    if (!started || gameOver) return;
    if (timeLeft <= 0) { setGameOver(true); return; }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, started, gameOver]);

  const getCardCenter = useCallback((cardId: string) => {
    const area = areaRef.current;
    const el = cardRefs.current.get(cardId);
    if (!area || !el) return null;
    const areaRect = area.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2 - areaRect.left, y: r.top + r.height / 2 - areaRect.top };
  }, []);

  // Track mouse for hover line
  useEffect(() => {
    if (!selectedId) { setHoverLine(null); return; }
    const handleMove = (e: MouseEvent) => {
      const area = areaRef.current;
      if (!area) return;
      const rect = area.getBoundingClientRect();
      mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      const from = getCardCenter(selectedId);
      if (from) setHoverLine({ x1: from.x, y1: from.y, x2: mousePos.current.x, y2: mousePos.current.y });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [selectedId, getCardCenter]);

  const handleClick = (cardId: string) => {
    if (checking || gameOver) return;
    const card = cards.find((c) => c.id === cardId);
    if (!card) return;

    // Deselect same card
    if (selectedId === cardId) {
      setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, selected: false } : c)));
      setSelectedId(null);
      setLines([]);
      return;
    }

    // First selection
    if (!selectedId) {
      setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, selected: true } : c)));
      setSelectedId(cardId);
      return;
    }

    // Second selection - check match
    const firstCard = cards.find((c) => c.id === selectedId)!;
    setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, selected: true } : c)));
    setChecking(true);
    const isMatch = firstCard.wordId === card.wordId && firstCard.type !== card.type;

    setTimeout(() => {
      if (isMatch) {
        const word = words.find((w) => w.id === card.wordId);
        if (word) speakWord(word.english, true);
        playSound('match');

        // Capture line
        const p1 = getCardCenter(selectedId);
        const p2 = getCardCenter(cardId);
        if (p1 && p2) setLines([{ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y }]);

        // Animate then remove (reflow)
        const s1 = selectedId;
        const s2 = cardId;
        setAnimatingCards((prev) => new Set(prev).add(s1).add(s2));
        setTimeout(() => {
          // Remove matched cards from array (remaining cards reflow)
          setCards((prev) => prev.filter((c) => c.id !== s1 && c.id !== s2));
          setLines([]);
          setAnimatingCards(new Set());
          cardRefs.current.clear();
        }, 500);

        setScore((s) => s + 10);
        setMatches((m) => m + 1);
        addScore(10);
        incrementCorrect();
      } else {
        playSound('error');
        setCards((prev) => prev.map((c) =>
          (c.id === selectedId || c.id === cardId) ? { ...c, selected: false } : c
        ));
        setLines([]);
        setScore((s) => s - 2);
      }
      setSelectedId(null);
      setChecking(false);
    }, 400);
  };

  useEffect(() => {
    if (!started || matches === 0) return;
    if (matches === currentLevel.pairs) setGameOver(true);
  }, [matches, started]);

  useEffect(() => {
    if (!gameOver) return;
    incrementGames();
    recordDailyProgress(1, matches, Math.max(0, score));
  }, [gameOver]);

  // Level select screen
  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-500 p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Link to="/" className="inline-flex p-2 bg-white/30 backdrop-blur rounded-full mb-6">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">连连看</h1>
            <p className="text-gray-500 text-center mb-6">找到匹配的英文和中文卡片</p>
            <div className="space-y-3">
              {LEVELS.map((lvl, i) => (
                <button key={i} onClick={() => initGame(i)} className="w-full bg-gradient-to-r from-blue-400 to-cyan-500 text-white py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">
                  {lvl.name} - {lvl.pairs}对 ({lvl.label})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-500 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="p-2 bg-white/30 backdrop-blur rounded-full">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-xl font-bold text-white">{currentLevel.name}{category !== 'all' ? ` · ${categoryNames[category] || ''}` : ''}</h1>
          <div className="flex items-center gap-3">
            <span className="bg-white/30 backdrop-blur rounded-full px-3 py-1 text-white font-bold">{score}分</span>
            <span className={`rounded-full px-3 py-1 font-bold ${timeLeft <= 10 ? 'bg-red-500' : 'bg-white/30 backdrop-blur'}`}>{timeLeft}s</span>
          </div>
        </div>

        {/* Game Area with SVG lines */}
        <div className="relative" ref={areaRef}>
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" style={{ overflow: 'visible' }}>
            {hoverLine && (
              <line x1={hoverLine.x1} y1={hoverLine.y1} x2={hoverLine.x2} y2={hoverLine.y2}
                stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 4" />
            )}
            {lines.map((l, i) => (
              <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                stroke="#4ade80" strokeWidth="4" strokeLinecap="round" />
            ))}
          </svg>

          {/* Card Grid - 4 columns, auto-flow, cards reflow on remove */}
          <div className="grid grid-cols-4 gap-3 min-h-[60vh]">
            {cards.map((card) => {
              const isAnimating = animatingCards.has(card.id);
              return (
                <button
                  key={card.id}
                  ref={(el) => { cardRefs.current.set(card.id, el); }}
                  onClick={() => !isAnimating && handleClick(card.id)}
                  className={`relative rounded-xl shadow-lg transition-all duration-300 flex flex-col items-center justify-center font-bold
                    ${isAnimating ? 'bg-green-400 scale-110 opacity-0 rotate-12' : ''}
                    ${!isAnimating && card.selected ? 'bg-yellow-300 text-gray-800 scale-105 ring-4 ring-yellow-200 shadow-xl' : ''}
                    ${!isAnimating && !card.selected && card.type === 'en' ? 'bg-amber-400 text-gray-800 hover:scale-105' : ''}
                    ${!isAnimating && !card.selected && card.type === 'cn' ? 'bg-blue-500 text-white hover:scale-105' : ''}
                  `}
                >
                  {card.emoji && <div className="text-4xl mb-1">{card.emoji}</div>}
                  <div className="text-base font-bold break-words leading-tight">{card.text}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Game Over - fixed center, not pushed down */}
        {gameOver && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl p-6 shadow-2xl text-center max-w-sm w-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{matches === currentLevel.pairs ? '恭喜通关！' : '时间到！'}</h2>
              <p className="text-gray-600 mb-4">得分：{score}分 | 配对：{matches}/{currentLevel.pairs}</p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link to="/" className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-400 transition-colors">返回首页</Link>
                {matches === currentLevel.pairs && level < 2 && (
                  <button onClick={() => initGame(level + 1)} className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">下一关</button>
                )}
                <button onClick={() => initGame(level)} className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">再玩一次</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
