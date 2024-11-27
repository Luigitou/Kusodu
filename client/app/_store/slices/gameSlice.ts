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

export type GameData = {
  timer: number;
};

export type GameState = {
  grid: Grid | null;
  setGrid: (grid: Grid) => void;
  host: User | null;
  setHost: (user: User) => void;
  joined: User | null;
  setJoined: (users: User) => void;
  gameData: GameData | null;
  setGameData: (gameData: GameData) => void;
  updateTimer: (timer: number) => void;
};

export const createGameSlice: StateCreator<GameState> = set => ({
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
  gameData: null,
  setGameData: (gameData: GameData) => {
    set({ gameData });
  },
  // Game actions
  updateTimer: (timer: number) => {
    set({ gameData: { timer } });
  },
});
