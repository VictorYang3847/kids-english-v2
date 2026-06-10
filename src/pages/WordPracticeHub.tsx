import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { words, categoryNames, categoryEmojis } from '../utils/words';
import { ArrowLeft } from 'lucide-react';

const CATEGORIES = Object.keys(categoryNames).filter((k) => k !== 'all');

const GAMES = [
  { path: '/match', name: '连连看', emoji: '🔗', desc: '匹配英文和中文', bg: 'from-blue-400 to-cyan-500' },
  { path: '/listening', name: '听力', emoji: '👂', desc: '听音选词', bg: 'from-purple-400 to-pink-500' },
  { path: '/spelling', name: '拼写', emoji: '✏️', desc: '看中文写英文', bg: 'from-green-400 to-emerald-500' },
  { path: '/quiz', name: '看图选词', emoji: '🖼️', desc: '看表情选单词', bg: 'from-orange-400 to-red-500' },
];

function WordPracticeHub() {
  const navigate = useNavigate();
  const { gamePath } = useParams<{ gamePath: string }>();
  const [selectedCats, setSelectedCats] = useState<Set<string>>(new Set());
  const game = GAMES.find((g) => g.path === `/${gamePath}`);

  const toggleCat = (cat: string) => {
    setSelectedCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedCats.size === CATEGORIES.length) {
      setSelectedCats(new Set());
    } else {
      setSelectedCats(new Set(CATEGORIES));
    }
  };

  const catParam = selectedCats.size > 0 ? Array.from(selectedCats).join(',') : 'all';
  const catCount = selectedCats.size === 0 ? words.length : words.filter((w) => selectedCats.has(w.category)).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-500 p-4">
      <div className="max-w-md mx-auto">
        <Link to={game ? '/practice' : '/'} className="inline-flex p-2 bg-white/30 backdrop-blur rounded-full mb-4">
          <ArrowLeft className="w-6 h-6 text-white" />
        </Link>
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          {game ? `${game.emoji} ${game.name}` : '单词练习'}
        </h1>
        <p className="text-white/80 text-center mb-6">
          {game ? `选择要练习的单词分类 (${catCount}个单词)` : '选择游戏类型'}
        </p>

        {/* Category chips - multi-select */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          <button onClick={toggleAll}
            className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${selectedCats.size === CATEGORIES.length ? 'bg-white text-blue-600 scale-105 shadow-lg' : 'bg-white/30 text-white hover:bg-white/50'}`}>
            🎲 全部
          </button>
          {CATEGORIES.map((cat) => {
            const count = words.filter((w) => w.category === cat).length;
            const isSelected = selectedCats.has(cat);
            return (
              <button key={cat} onClick={() => toggleCat(cat)}
                className={`px-3 py-2 rounded-full font-medium text-xs transition-all ${isSelected ? 'bg-white text-blue-600 scale-105 shadow-lg' : 'bg-white/30 text-white hover:bg-white/50'}`}>
                {categoryEmojis[cat]} {categoryNames[cat]}({count})
              </button>
            );
          })}
        </div>

        {!game && (
          <div className="grid grid-cols-2 gap-3">
            {GAMES.map((g) => (
              <Link key={g.path} to={`/practice/${g.path.slice(1)}`}
                className={`bg-gradient-to-r ${g.bg} rounded-xl p-4 text-center shadow-lg hover:scale-105 transition-transform`}>
                <div className="text-3xl mb-1">{g.emoji}</div>
                <div className="text-white font-bold">{g.name}</div>
                <div className="text-white/80 text-xs">{g.desc}</div>
              </Link>
            ))}
          </div>
        )}

        {game && (
          <button onClick={() => navigate(`${game.path}?category=${catParam}`)}
            className={`w-full bg-gradient-to-r ${game.bg} text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition-transform`}>
            开始练习
          </button>
        )}
      </div>
    </div>
  );
}

export default WordPracticeHub;
