import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGameStore } from '../hooks/useGameStore';
import { words } from '../utils/words';
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

export default function DailyChallenge() {
  const { progress, addScore, incrementGames, incrementCorrect, recordDailyProgress, completeDailyChallenge } = useGameStore();
  const today = new Date().toISOString().split('T')[0];
  const alreadyCompleted = progress.dailyChallenge?.date === today && progress.dailyChallenge?.completed;

  const [started, setStarted] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [matches, setMatches] = useState(0);
  const [checking, setChecking] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [lines, setLines] = useState<LinePos[]>([]);
  const [animatingCards, setAnimatingCards] = useState<Set<string>>(new Set());
  const areaRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLButtonElement | null>>(new Map());

  const initGame = useCallback(() => {
    const shuffled = [...words].sort(() => Math.random() - 0.5).slice(0, 4);
    const newCards: Card[] = [];
    shuffled.forEach((w) => {
      newCards.push({ id: `${w.id}-en`, wordId: w.id, text: w.english, emoji: w.emoji, type: 'en', selected: false });
      newCards.push({ id: `${w.id}-cn`, wordId: w.id, text: w.chinese, emoji: '', type: 'cn', selected: false });
    });
    newCards.sort(() => Math.random() - 0.5);
    setCards(newCards);
    setSelectedId(null);
    setMatches(0);
    setChecking(false);
    setGameScore(0);
    setFinished(false);
    setStarted(true);
    setLines([]);
    setAnimatingCards(new Set());
    cardRefs.current.clear();
  }, []);

  const captureLine = useCallback((cardId1: string, cardId2: string): LinePos | null => {
    const area = areaRef.current;
    const el1 = cardRefs.current.get(cardId1);
    const el2 = cardRefs.current.get(cardId2);
    if (!area || !el1 || !el2) return null;
    const areaRect = area.getBoundingClientRect();
    const r1 = el1.getBoundingClientRect();
    const r2 = el2.getBoundingClientRect();
    return {
      x1: r1.left + r1.width / 2 - areaRect.left,
      y1: r1.top + r1.height / 2 - areaRect.top,
      x2: r2.left + r2.width / 2 - areaRect.left,
      y2: r2.top + r2.height / 2 - areaRect.top,
    };
  }, []);

  const handleClick = (cardId: string) => {
    if (checking || finished) return;
    const card = cards.find((c) => c.id === cardId);
    if (!card) return;

    if (selectedId === cardId) {
      setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, selected: false } : c)));
      setSelectedId(null);
      return;
    }

    if (!selectedId) {
      setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, selected: true } : c)));
      setSelectedId(cardId);
      return;
    }

    const firstCard = cards.find((c) => c.id === selectedId)!;
    setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, selected: true } : c)));
    setChecking(true);
    const isMatch = firstCard.wordId === card.wordId && firstCard.type !== card.type;

    setTimeout(() => {
      if (isMatch) {
        const word = words.find((w) => w.id === card.wordId);
        if (word) speakWord(word.english, true);
        playSound('match');
        const line = captureLine(selectedId, cardId);
        if (line) setLines((prev) => [...prev, line]);
        setAnimatingCards((prev) => new Set(prev).add(selectedId).add(cardId));
        setTimeout(() => {
          setCards((prev) => prev.filter((c) => c.id !== selectedId && c.id !== cardId));
          setAnimatingCards((prev) => { const n = new Set(prev); n.delete(selectedId); n.delete(cardId); return n; });
        }, 500);
        setGameScore((s) => s + 10);
        setMatches((m) => m + 1);
        addScore(10);
        incrementCorrect();
      } else {
        playSound('error');
        setCards((prev) => prev.map((c) =>
          (c.id === selectedId || c.id === cardId) ? { ...c, selected: false } : c
        ));
      }
      setSelectedId(null);
      setChecking(false);
    }, 400);
  };

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
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="p-2 bg-white/30 backdrop-blur rounded-full">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-xl font-bold text-white">每日挑战</h1>
          <span className="bg-white/30 backdrop-blur rounded-full px-3 py-1 text-white font-bold">{matches} / 4</span>
        </div>

        <div className="relative" ref={areaRef}>
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" style={{ overflow: 'visible' }}>
            {lines.map((l, i) => (
              <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                stroke="#4ade80" strokeWidth="4" strokeLinecap="round" className="animate-pulse" />
            ))}
          </svg>

          <div className="grid grid-cols-4 gap-3">
            {cards.map((card) => (
              <button
                key={card.id}
                ref={(el) => { cardRefs.current.set(card.id, el); }}
                onClick={() => handleClick(card.id)}
                className={`relative rounded-2xl p-3 shadow-lg transition-all duration-300 text-center font-bold
                  ${animatingCards.has(card.id)
                    ? 'bg-green-400 scale-110 opacity-0 rotate-12'
                    : card.selected
                      ? 'bg-yellow-300 text-gray-800 scale-105 ring-4 ring-yellow-200 shadow-xl'
                      : card.type === 'en'
                        ? 'bg-amber-400 text-gray-800 hover:scale-105'
                        : 'bg-blue-500 text-white hover:scale-105'
                  }
                `}
              >
                {card.emoji && <div className="text-3xl mb-1">{card.emoji}</div>}
                <div className="text-sm font-bold break-words leading-tight">{card.text}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
