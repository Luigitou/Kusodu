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
  selectedCell: { row: number; column: number } | null;
  setSelectedCell: (selectedCell: { row: number; column: number }) => void;
  errorCells: { row: number; column: number; value: number }[];
  isNotesActive: boolean;
  setIsNotesActive: (isNotesActive: boolean) => void;
  notesCells: { row: number; column: number; numbers: number[] }[];
  setupGame: () => void;
  inputCell: (number: number) => void;
  deleteCell: () => void;
  inputNotes: (number: number) => void;
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
  selectedCell: null,
  setSelectedCell: (selectedCell: { row: number; column: number }) => {
    set({ selectedCell });
  },
  errorCells: [],
  notesCells: [],
  isNotesActive: false,
  setIsNotesActive: (isNotesActive: boolean) => {
    set({ isNotesActive });
  },
  // Game actions
  setupGame: () => {
    set({
      timer: 0,
      lives: 3,
    });
  },
  inputCell: (number: number) => {
    const grid = get().grid;
    const selectedCell = get().selectedCell;
    if (!grid || !selectedCell) return;

    const { row, column } = selectedCell;

    if (grid.grid[row][column] !== 0) return;

    if (grid.solution[row][column] === number) {
      if (
        get().errorCells.some(
          cell => cell.row === row && cell.column === column,
        )
      ) {
        set({
          errorCells: get().errorCells.filter(
            cell => cell.row !== row || cell.column !== column,
          ),
        });
      }
      grid.grid[row][column] = number;
    } else {
      if (
        !get().errorCells.some(
          cell => cell.row === row && cell.column === column,
        )
      ) {
        set({
          errorCells: [...get().errorCells, { row, column, value: number }],
        });
      } else {
        set({
          errorCells: get().errorCells.map(cell =>
            cell.row === row && cell.column === column
              ? { ...cell, value: number }
              : cell,
          ),
        });
      }
      set({ lives: get().lives! - 1 });
    }
    set({ grid });
  },
  deleteCell: () => {
    console.log('delete cell');
  },
  inputNotes: (number: number) => {
    console.log('input note:', number);
  },
});
