'use client';

import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import {
  AuthState,
  createAuthSlice,
  createGameSlice,
  createUserSlice,
  GameState,
  UserState,
} from '@/_store/slices';

type Store = AuthState & UserState & GameState;

export const useStore = create<Store>()(
  devtools((...args) => ({
    ...createAuthSlice(...args),
    ...createUserSlice(...args),
    ...createGameSlice(...args),
  })),
);
