import { StateCreator } from 'zustand';
import { User } from '@/_store/slices/userSlice';
import { getSocket } from '@/_services/socket';
import { Socket } from 'socket.io-client';

export type Grid = {
  id: string;
  grid: number[][];
  solution: number[][];
  difficulty: number;
  createdAt: string;
  updatedAt: string;
};

export type GameState = {
  roomId: number | null;
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
  socket: Socket | null;
  setupGame: () => Promise<void>;
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
  roomId: null,
  socket: null,
  // Game actions
  setupGame: async () => {
    const socket = getSocket();

    return new Promise<void>(resolve => {
      socket?.emit('createRoom', { state: get().grid });

      socket!.on('roomCreated', data => {
        set({
          roomId: data.roomId,
          socket,
          timer: 0,
          lives: 3,
        });
        resolve(data.roomId);
      });
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
    const grid = get().grid;
    const selectedCell = get().selectedCell;
    if (!grid || !selectedCell) return;

    const { row, column } = selectedCell;

    if (grid.grid[row][column] !== 0) return;

    const errorCells = get().errorCells;
    const notesCells = get().notesCells;

    const errorCellForThisCell = errorCells.find(
      cell => cell.row === row && cell.column === column,
    );

    if (errorCellForThisCell) {
      set({
        errorCells: errorCells.filter(
          cell => cell.row !== row || cell.column !== column,
        ),
      });
    } else {
      const notesCellForThisCell = notesCells.find(
        cell => cell.row === row && cell.column === column,
      );

      if (notesCellForThisCell) {
        set({
          notesCells: notesCells.filter(
            cell => cell.row !== row || cell.column !== column,
          ),
        });
      } else {
        set({
          errorCells: errorCells.filter(
            cell => cell.row !== row || cell.column !== column,
          ),
        });
      }
    }
  },
  inputNotes: (number: number) => {
    const grid = get().grid;
    const selectedCell = get().selectedCell;
    if (!grid || !selectedCell) return;

    const { row, column } = selectedCell;

    if (grid.grid[row][column] !== 0) return;

    const notesCells = get().notesCells;

    const notesCellForThisCell = notesCells.find(
      cell => cell.row === row && cell.column === column,
    );

    if (notesCellForThisCell) {
      const { numbers } = notesCellForThisCell;

      if (numbers.includes(number)) {
        notesCellForThisCell.numbers = numbers.filter(n => n !== number);
      } else {
        notesCellForThisCell.numbers.push(number);
      }
      set({ notesCells: [...notesCells] });
    } else {
      set({
        notesCells: [...notesCells, { row, column, numbers: [number] }],
      });
    }
  },
});
