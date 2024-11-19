import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import {
  AuthState,
  createAuthSlice,
  createUserSlice,
  UserState,
} from '@/store/slices';

type Store = AuthState & UserState;

export const useStore = create<Store>()(
  devtools((...args) => ({
    ...createAuthSlice(...args),
    ...createUserSlice(...args),
  })),
);
