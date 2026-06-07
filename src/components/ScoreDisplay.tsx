import { useGameStore } from '../hooks/useGameStore';

export default function ScoreDisplay() {
  const { progress } = useGameStore();

  const stats = [
    { label: '积分', value: progress.score, gradient: 'from-yellow-400 to-amber-500' },
    { label: '等级', value: progress.level, gradient: 'from-blue-400 to-indigo-500' },
    { label: '游戏次数', value: progress.totalGames, gradient: 'from-green-400 to-emerald-500' },
    { label: '正确答案', value: progress.correctAnswers, gradient: 'from-pink-400 to-rose-500' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-4 text-white text-center shadow-lg`}
        >
          <div className="text-2xl font-bold">{stat.value}</div>
          <div className="text-sm opacity-80">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
