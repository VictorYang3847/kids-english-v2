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
  matchedAnim: boolean;
}

export default function MatchGame() {
  const { addScore, incrementGames, incrementCorrect, recordDailyProgress } = useGameStore();
  const [timerMode, setTimerMode] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [firstCard, setFirstCard] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [matches, setMatches] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [checking, setChecking] = useState(false);

  const initGame = useCallback(() => {
    const shuffled = [...words].sort(() => Math.random() - 0.5).slice(0, 6);
    const newCards: Card[] = [];
    shuffled.forEach((w) => {
      newCards.push({ id: `${w.id}-en`, text: w.english, wordId: w.id, type: 'en', matched: false, selected: false, matchedAnim: false });
      newCards.push({ id: `${w.id}-cn`, text: w.chinese, wordId: w.id, type: 'cn', matched: false, selected: false, matchedAnim: false });
    });
    newCards.sort(() => Math.random() - 0.5);
    setCards(newCards);
    setFirstCard(null);
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

  const handleClick = (cardId: string) => {
    if (checking || gameOver) return;
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.matched || card.selected) return;

    setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, selected: true } : c)));

    if (!firstCard) {
      setFirstCard(cardId);
    } else {
      setChecking(true);
      const first = cards.find((c) => c.id === firstCard)!;
      if (first.wordId === card.wordId && first.type !== card.type) {
        // Match!
        setTimeout(() => {
          const word = words.find((w) => w.id === card.wordId);
          if (word) speakWord(word.english, true);
          playSound('match');
          setCards((prev) =>
            prev.map((c) =>
              c.wordId === card.wordId ? { ...c, matched: true, matchedAnim: true } : c
            )
          );
          setScore((s) => s + 10);
          setMatches((m) => m + 1);
          addScore(10);
          incrementCorrect();
          setFirstCard(null);
          setChecking(false);
        }, 300);
      } else {
        // No match
        setTimeout(() => {
          playSound('error');
          setCards((prev) =>
            prev.map((c) =>
              c.id === cardId || c.id === firstCard ? { ...c, selected: false } : c
            )
          );
          setScore((s) => s - 2);
          setFirstCard(null);
          setChecking(false);
        }, 500);
      }
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

        {/* Cards */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleClick(card.id)}
              disabled={card.matched}
              className={`relative aspect-square rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center text-center p-2 font-medium
                ${card.matched
                  ? 'animate-bounce-out opacity-0'
                  : card.selected
                  ? 'bg-yellow-300 scale-105'
                  : 'bg-white/95 backdrop-blur hover:scale-105'
                }
                ${card.matchedAnim ? 'animate-success-pulse' : ''}
              `}
            >
              <span className={card.type === 'en' ? 'text-lg' : 'text-base'}>
                {card.text}
              </span>
            </button>
          ))}
        </div>

        {/* Game Over */}
        {gameOver && (
          <div className="mt-6 bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {matches === 6 ? '恭喜完成！' : '时间到！'}
            </h2>
            <p className="text-gray-600 mb-4">得分：{score}分 | 配对：{matches}/6</p>
            <button
              onClick={initGame}
              className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
            >
              再来一局
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
