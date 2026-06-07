import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface DailyRecord {
  date: string;
  gamesPlayed: number;
  correctAnswers: number;
  scoreEarned: number;
}

interface DailyChallenge {
  date: string;
  completed: boolean;
  bonusPoints: number;
}

interface UserProgress {
  score: number;
  level: number;
  badges: string[];
  totalGames: number;
  correctAnswers: number;
  dailyRecords: DailyRecord[];
  dailyChallenge: DailyChallenge | null;
  soundEnabled: boolean;
}

interface GameStore {
  progress: UserProgress;
  addScore: (points: number) => void;
  incrementGames: () => void;
  incrementCorrect: () => void;
  recordDailyProgress: (games: number, correct: number, score: number) => void;
  completeDailyChallenge: () => void;
  toggleSound: () => void;
}

const getToday = () => new Date().toISOString().split('T')[0];

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      progress: {
        score: 0,
        level: 1,
        badges: [],
        totalGames: 0,
        correctAnswers: 0,
        dailyRecords: [],
        dailyChallenge: null,
        soundEnabled: true,
      },
      addScore: (points) =>
        set((state) => {
          const newScore = state.progress.score + points;
          const newLevel = Math.floor(newScore / 100) + 1;
          return {
            progress: {
              ...state.progress,
              score: newScore,
              level: newLevel,
            },
          };
        }),
      incrementGames: () =>
        set((state) => ({
          progress: {
            ...state.progress,
            totalGames: state.progress.totalGames + 1,
          },
        })),
      incrementCorrect: () =>
        set((state) => ({
          progress: {
            ...state.progress,
            correctAnswers: state.progress.correctAnswers + 1,
          },
        })),
      recordDailyProgress: (games, correct, score) =>
        set((state) => {
          const today = getToday();
          const existing = state.progress.dailyRecords.find((r) => r.date === today);
          let records: DailyRecord[];
          if (existing) {
            records = state.progress.dailyRecords.map((r) =>
              r.date === today
                ? {
                    ...r,
                    gamesPlayed: r.gamesPlayed + games,
                    correctAnswers: r.correctAnswers + correct,
                    scoreEarned: r.scoreEarned + score,
                  }
                : r
            );
          } else {
            records = [
              { date: today, gamesPlayed: games, correctAnswers: correct, scoreEarned: score },
              ...state.progress.dailyRecords,
            ].slice(0, 30);
          }
          return { progress: { ...state.progress, dailyRecords: records } };
        }),
      completeDailyChallenge: () =>
        set((state) => {
          const today = getToday();
          return {
            progress: {
              ...state.progress,
              dailyChallenge: { date: today, completed: true, bonusPoints: 50 },
              score: state.progress.score + 50,
              level: Math.floor((state.progress.score + 50) / 100) + 1,
            },
          };
        }),
      toggleSound: () =>
        set((state) => ({
          progress: {
            ...state.progress,
            soundEnabled: !state.progress.soundEnabled,
          },
        })),
    }),
    {
      name: 'english-learning-storage-v2',
      version: 2,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: any, version: number) => {
        if (version === 0 || version === 1) {
          return {
            ...persistedState,
            progress: {
              ...persistedState.progress,
              dailyChallenge: null,
              soundEnabled: persistedState.progress.soundEnabled ?? true,
            },
          };
        }
        return persistedState;
      },
    }
  )
);
