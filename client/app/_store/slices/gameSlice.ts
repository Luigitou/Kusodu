import { StateCreator } from 'zustand';
import { User } from '@/_store/slices/userSlice';

export type Grid = {
  id: string;
  grid: number[][];
  solution: number[][];
  difficulty: number;
  createdAt: string;
  updatedAt: string;
};

export type GameState = {
  grid: Grid | null;
  setGrid: (grid: Grid) => void;
  host: User | null;
  setHost: (user: User) => void;
  joined: User | null;
  setJoined: (users: User) => void;
  timer: number | null;
  timerIsPaused: boolean;
  setTimerIsPaused: (timerIsPaused: boolean) => void;
  setTimer: (timer: number) => void;
  startTimer: () => void;
  stopTimer: () => void;
  lives: number | null;
  setLives: (lives: number) => void;
  setupGame: () => void;
};

export const createGameSlice: StateCreator<GameState> = (set, get) => ({
  grid: null,
  setGrid: (grid: Grid) => {
    set({ grid });
  },
  host: null,
  setHost: (user: User) => {
    set({ host: user });
  },
  joined: null,
  setJoined: (users: User) => {
    set({ joined: users });
  },
  timer: null,
  timerIsPaused: false,
  setTimer: (timer: number) => {
    set({ timer });
  },
  setTimerIsPaused: (timerIsPaused: boolean) => {
    set({ timerIsPaused });
  },
  startTimer: () => {
    let currentTimer = 0;
    const interval = setInterval(() => {
      if (!get().timerIsPaused) {
        currentTimer++;
        set({ timer: currentTimer });
      }
    }, 1000);

    set(() => ({
      stopTimer: () => clearInterval(interval),
    }));
  },
  stopTimer: () => {},
  lives: null,
  setLives: (lives: number) => {
    set({ lives });
  },
  // Game actions
  setupGame: () => {
    set({
      timer: 0,
      lives: 3,
    });
  },
});
