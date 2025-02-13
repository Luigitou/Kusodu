import { StateCreator } from 'zustand';
import { User } from '@/_store/slices/userSlice';
import { getSocket } from '@/_services/socket';
import { Socket } from 'socket.io-client';
import { useStore } from '@/_store';
import { toast } from 'react-toastify';

export type Grid = {
  id: string;
  grid: number[][];
  solution: number[][];
  difficulty: number;
  createdAt: string;
  updatedAt: string;
};

export type EventReturnType = {
  roomId: string;
  state: {
    grid: Grid;
    timer: number;
    lives: number;
    isMultiplayer: boolean;
    errorCells: {
      row: number;
      column: number;
      value: number;
    }[];
  };
  players: unknown[];
};

export type GameState = {
  isMultiplayer: boolean;
  setIsMultiplayer: (isMultiplayer: boolean) => void;
  roomId: string | null;
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
  players: unknown[];
  isGameOver: boolean | 'win' | 'lost';
  setPlayers: (players: unknown[]) => void;
  setupGame: () => Promise<EventReturnType>;
  joinGame: (roomId: string) => Promise<EventReturnType> | undefined;
  inputCell: (number: number) => void;
  deleteCell: () => void;
  inputNotes: (number: number) => void;
  updateGameState: (data: EventReturnType) => void;
  syncGameState: () => void;
  resetGame: () => void;
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
  isMultiplayer: false,
  setIsMultiplayer: (isMultiplayer: boolean) => {
    set({ isMultiplayer });
  },
  roomId: null,
  socket: null,
  players: [],
  isGameOver: false,
  setPlayers: (players: unknown[]) => {
    set({ players });
  },
  // Game actions
  setupGame: async () => {
    const socket = getSocket();

    return new Promise<EventReturnType>(resolve => {
      if (get().isMultiplayer) {
        const token = useStore.getState().token;

        socket?.emit('authenticate', {
          token: token,
        });

        socket?.on('authenticated', () => {
          socket?.emit('createRoom', {
            state: {
              grid: get().grid,
              timer: 0,
              lives: 3,
              errorCells: [],
              isMultiplayer: get().isMultiplayer,
            },
          });
        });
      } else {
        socket?.emit('createRoom', {
          state: {
            grid: get().grid,
            timer: 0,
            lives: 3,
            errorCells: [],
            isMultiplayer: get().isMultiplayer,
          },
        });
      }

      socket!.on('roomCreated', (data: EventReturnType) => {
        set({
          roomId: data.roomId,
          socket,
          timer: data.state.timer,
          lives: data.state.lives,
          errorCells: data.state.errorCells,
        });
        set({ players: data.players });
        resolve(data);
      });

    });
  },
  joinGame: (roomId: string) => {
    const socket = getSocket();

    if (!socket) return;

    return new Promise((resolve, reject) => {
      const token = useStore.getState().token;

      socket.emit('authenticate', {
        token: token,
      });

      socket.on('authenticated', () => {
        socket?.emit('joinRoom', {
          roomId: roomId,
        });
      });

      socket.on('joinRoom', (data: EventReturnType) => {
        set({
          players: data.players,
          roomId: data.roomId,
          socket: socket,
          grid: data.state.grid,
          timer: data.state.timer,
          lives: data.state.lives,
          errorCells: data.state.errorCells,
        });
        resolve(data);
      });

      socket.on('unauthorized', () => {
        reject('unauthorized');
      });

      socket.on('no room', () => {
        reject('no room');
      });

      socket.on('private room', () => {
        toast('Cette partie est privée.', {
          type: 'info',
        });
        reject('Room not open');
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

      const isGridComplete = grid.grid.every((gridRow, rowIndex) =>
        gridRow.every(
          (cellValue, colIndex) =>
            cellValue !== 0 && cellValue === grid.solution[rowIndex][colIndex],
        ),
      );

      if (isGridComplete) {
        set({ isGameOver: 'win' });
      }
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
      if (get().lives! <= 0) {
        set({ isGameOver: 'lost' });
      }
    }

    set({ grid });
    get().socket?.emit('inputCell', {
      state: {
        grid: get().grid,
        lives: get().lives,
        errorCells: get().errorCells,
      },
      roomId: get().roomId,
    });
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
  updateGameState: (data: EventReturnType) => {
    set({
      players: data.players,
      roomId: data.roomId,
      grid: data.state.grid,
      timer: data.state.timer,
      lives: data.state.lives,
      errorCells: data.state.errorCells,
    });
  },
  syncGameState: () => {
    const socket = get().socket;

    if (socket) {
      socket.emit('syncGameState', {
        roomId: get().roomId,
        state: {
          grid: get().grid,
          timer: get().timer,
          lives: get().lives,
          errorCells: get().errorCells,
        },
      });
    }
  },
  resetGame: () => {
    set({
      grid: null,
      timer: null,
      timerIsPaused: false,
      lives: null,
      errorCells: [],
      notesCells: [],
      isNotesActive: false,
      isMultiplayer: false,
      roomId: null,
      socket: null,
      players: [],
      isGameOver: false,
      selectedCell: null,
      host: null,
      joined: null,
    });
  },
});
