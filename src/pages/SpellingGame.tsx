import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGameStore } from '../hooks/useGameStore';
import { words } from '../utils/words';
import { speakWord } from '../utils/audio';
import { playSound } from '../utils/sounds';
import { ArrowLeft } from 'lucide-react';

type FillMode = 'full' | 'half' | 'few';
type InputMode = 'keyboard' | 'click';

export default function SpellingGame() {
  const { addScore, incrementGames, incrementCorrect, recordDailyProgress } = useGameStore();
  const [fillMode, setFillMode] = useState<FillMode>('full');
  const [inputMode, setInputMode] = useState<InputMode>('keyboard');
  const [started, setStarted] = useState(false);
  const [questionWords, setQuestionWords] = useState<any[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [finished, setFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const initGame = useCallback(() => {
    const shuffled = [...words].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestionWords(shuffled);
    setCurrentQ(0);
    setInput('');
    setScore(0);
    setResult(null);
    setFinished(false);
    setStarted(true);
  }, []);

  useEffect(() => {
    if (started && inputMode === 'keyboard' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQ, started, inputMode]);

  const checkAnswer = (overrideInput?: string) => {
    if (result) return;
    const word = questionWords[currentQ];
    const answer = (overrideInput ?? input).trim().toLowerCase();
    if (answer === word.english.toLowerCase()) {
      setResult('correct');
      const pts = fillMode === 'full' ? 15 : fillMode === 'half' ? 12 : 10;
      setScore((s) => s + pts);
      playSound('match');
      addScore(pts);
      incrementCorrect();
    } else {
      setResult('wrong');
      playSound('error');
    }
    setTimeout(() => {
      if (currentQ < 9) {
        setCurrentQ((q) => q + 1);
        setInput('');
        setResult(null);
      } else {
        setFinished(true);
      }
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (result) return;
    const val = e.target.value.replace(/[^a-zA-Z]/g, '').toLowerCase();
    setInput(val);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (result || inputMode !== 'keyboard') return;
    if (e.key === 'Enter') {
      checkAnswer((e.target as HTMLInputElement).value);
    }
  };

  const handleConfirmAnswer = () => {
    if (result) return;
    checkAnswer();
  };

  const handleLetterClick = (letter: string) => {
    if (result) return;
    setInput((prev) => prev + letter);
  };

  const handleBackspace = () => {
    if (result) return;
    setInput((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    if (!finished) return;
    incrementGames();
    recordDailyProgress(1, score >= 10 ? Math.round(score / 12) : 0, score);
  }, [finished]);

  const getHints = (word: string) => {
    if (fillMode === 'full') return '';
    if (fillMode === 'half') {
      const len = Math.ceil(word.length / 2);
      return word.slice(0, len) + '_'.repeat(word.length - len);
    }
    if (fillMode === 'few') {
      return word[0] + '_'.repeat(word.length - 2) + (word.length > 1 ? word[word.length - 1] : '');
    }
    return '';
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-400 to-pink-500 p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Link to="/" className="inline-flex p-2 bg-white/30 backdrop-blur rounded-full mb-6">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">拼写</h1>
            <p className="text-gray-500 text-center mb-6">看中文意思，拼写英文单词</p>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-600 mb-2 block">输入模式</label>
              <div className="grid grid-cols-2 gap-2">
                {([['keyboard', '键盘输入'], ['click', '点击输入']] as [InputMode, string][]).map(([mode, label]) => (
                  <button key={mode} onClick={() => setInputMode(mode)} className={`py-2 rounded-xl font-medium transition-all ${inputMode === mode ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{label}</button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-600 mb-2 block">难度模式</label>
              <div className="grid grid-cols-3 gap-2">
                {([['full', '全写', '+15分'], ['half', '写一半', '+12分'], ['few', '写首尾', '+10分']] as [FillMode, string, string][]).map(([mode, label, pts]) => (
                  <button key={mode} onClick={() => setFillMode(mode)} className={`py-2 rounded-xl font-medium text-xs transition-all ${fillMode === mode ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{label}<br/>{pts}</button>
                ))}
              </div>
            </div>
            <button onClick={initGame} className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">开始游戏</button>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-400 to-pink-500 p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">游戏结束！</h2>
            <p className="text-4xl font-bold text-orange-500 mb-2">{score}分</p>
            <button onClick={initGame} className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">再来一局</button>
          </div>
        </div>
      </div>
    );
  }

  const word = questionWords[currentQ];
  if (!word) return null;
  const hint = getHints(word.english);
  const display = hint || '_'.repeat(word.english.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-400 to-pink-500 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="p-2 bg-white/30 backdrop-blur rounded-full">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <span className="bg-white/30 backdrop-blur rounded-full px-3 py-1 text-white font-bold">{currentQ + 1} / 10</span>
          <span className="bg-white/30 backdrop-blur rounded-full px-3 py-1 text-white font-bold">{score}分</span>
        </div>

        {/* Question */}
        <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl text-center mb-6">
          <div className="text-5xl mb-3">{word.emoji}</div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{word.chinese}</div>
          <div className="text-lg text-gray-500 mb-4">{word.english.length} 个字母</div>
          <div className="text-3xl font-mono font-bold text-orange-500 tracking-widest mb-4">{display}</div>

          {inputMode === 'keyboard' ? (
            <div className="flex items-center justify-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                className="border-2 border-orange-300 rounded-xl px-4 py-3 text-center text-xl font-mono tracking-widest focus:outline-none focus:border-orange-500"
                placeholder="输入单词..."
                autoFocus
              />
              <button onClick={handleConfirmAnswer} disabled={!!result} className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors">确认</button>
            </div>
          ) : (
            <div>
              <div className="text-xl font-mono tracking-widest mb-4 min-h-[2rem] text-gray-800">
                {input || '______'}
              </div>
              <div className="grid grid-cols-7 gap-1 mb-3">
                {'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => (
                  <button key={letter} onClick={() => handleLetterClick(letter)} disabled={!!result} className="bg-gray-100 rounded-lg py-2 font-bold text-gray-700 hover:bg-orange-100 transition-colors text-sm">{letter.toUpperCase()}</button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={handleBackspace} disabled={!!result} className="flex-1 bg-gray-200 rounded-xl py-3 font-bold text-gray-600 hover:bg-gray-300 transition-colors">删除</button>
                <button onClick={handleConfirmAnswer} disabled={!!result} className="flex-1 bg-orange-500 text-white rounded-xl py-3 font-bold hover:bg-orange-600 transition-colors">确认</button>
              </div>
            </div>
          )}
        </div>

        {/* Result */}
        {result && (
          <div className={`rounded-2xl p-4 text-center shadow-xl ${result === 'correct' ? 'bg-green-400' : 'bg-red-400'} text-white`}>
            <div className="text-xl font-bold">{result === 'correct' ? '正确！' : '错误！'}</div>
            <div className="text-sm">{result === 'wrong' ? `正确答案: ${word.english}` : ''}</div>
          </div>
        )}
      </div>
    </div>
  );
}
