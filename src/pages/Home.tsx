import { Link } from 'react-router-dom';
import { useGameStore } from '../hooks/useGameStore';
import ScoreDisplay from '../components/ScoreDisplay';
import { Volume2, VolumeX } from 'lucide-react';

const getToday = () => new Date().toISOString().split('T')[0];

export default function Home() {
  const { progress, toggleSound } = useGameStore();
  const todayRecord = progress.dailyRecords.find((r) => r.date === getToday());
  const dailyChallengeDone = progress.dailyChallenge?.date === getToday() && progress.dailyChallenge?.completed;

  const wordGames = [
    { path: '/match', name: '连连看', emoji: '🔗', desc: '匹配英文和中文' },
    { path: '/listening', name: '听力', emoji: '', desc: '听音选词' },
    { path: '/spelling', name: '拼写', emoji: '✏️', desc: '看中文写英文' },
    { path: '/quiz', name: '看图选词', emoji: '🖼️', desc: '看表情选单词' },
  ];

  const sentenceGames = [
    { path: '/sentence-fill', name: '句子填空', emoji: '', desc: '选择单词填空' },
    { path: '/dialogue', name: '对话补全', emoji: '💬', desc: '选择对话回答' },
    { path: '/listen-match', name: '听句选句', emoji: '🎧', desc: '听英文选中文' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-500 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Sound toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleSound}
            className="p-2 bg-white/30 backdrop-blur rounded-full shadow-md"
          >
            {progress.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-lg">
          🎉 英语小天才 🎉
        </h1>

        {/* Score Display */}
        <ScoreDisplay />

        {/* Today's stats */}
        {todayRecord && (
          <div className="mt-6 bg-white/30 backdrop-blur rounded-2xl p-4 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-3">今日学习</h2>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white/40 rounded-xl p-3">
                <div className="text-xl font-bold text-white">{todayRecord.gamesPlayed}</div>
                <div className="text-xs text-white/80">游戏局数</div>
              </div>
              <div className="bg-white/40 rounded-xl p-3">
                <div className="text-xl font-bold text-white">{todayRecord.correctAnswers}</div>
                <div className="text-xs text-white/80">答对题数</div>
              </div>
              <div className="bg-white/40 rounded-xl p-3">
                <div className="text-xl font-bold text-white">{todayRecord.scoreEarned}</div>
                <div className="text-xs text-white/80">获得积分</div>
              </div>
            </div>
          </div>
        )}

        {/* Daily Challenge */}
        <div className="mt-6">
          {dailyChallengeDone ? (
            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl p-4 text-center shadow-lg">
              <div className="text-xl font-bold text-white">每日挑战已完成！(+50积分)</div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-4 text-center shadow-lg">
              <div className="text-lg font-bold text-white mb-1">每日挑战</div>
              <div className="text-white/90 text-sm">完成任意游戏获得额外 50 积分！</div>
            </div>
          )}
        </div>

        {/* Word Games */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-white mb-3">📖 单词练习</h2>
          <div className="grid grid-cols-2 gap-3">
            {wordGames.map((game) => (
              <Link
                key={game.path}
                to={game.path}
                className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-xl hover:scale-105 transition-transform duration-300"
              >
                <div className="text-3xl mb-2">{game.emoji}</div>
                <div className="text-lg font-bold text-gray-800">{game.name}</div>
                <div className="text-sm text-gray-500">{game.desc}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Sentence Games */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-white mb-3">📚 句子练习</h2>
          <div className="grid grid-cols-2 gap-3">
            {sentenceGames.map((game) => (
              <Link
                key={game.path}
                to={game.path}
                className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-xl hover:scale-105 transition-transform duration-300"
              >
                <div className="text-3xl mb-2">{game.emoji}</div>
                <div className="text-lg font-bold text-gray-800">{game.name}</div>
                <div className="text-sm text-gray-500">{game.desc}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Word Book */}
        <div className="mt-6">
          <Link
            to="/words"
            className="block bg-gradient-to-r from-purple-400 via-pink-400 to-red-500 rounded-2xl p-4 text-center shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <div className="text-3xl mb-1">📚</div>
            <div className="text-xl font-bold text-white">单词本</div>
            <div className="text-white/80 text-sm">查看所有单词</div>
          </Link>
        </div>

        {/* Recent records */}
        {progress.dailyRecords.length > 0 && (
          <div className="mt-6 bg-white/30 backdrop-blur rounded-2xl p-4 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-3">最近学习记录</h2>
            <div className="space-y-2">
              {progress.dailyRecords.slice(0, 5).map((record) => (
                <div key={record.date} className="bg-white/40 rounded-xl p-3 flex justify-between items-center">
                  <span className="text-white font-medium">{record.date}</span>
                  <span className="text-white/80 text-sm">
                    {record.gamesPlayed}局 | {record.correctAnswers}对 | {record.scoreEarned}分
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
