import { StateCreator } from 'zustand';

type User = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type UserState = {
  user: User | null;
  setUser: (user: User) => void;
};

export const createUserSlice: StateCreator<UserState> = set => ({
  user: null,
  setUser: (user: User) => {
    set({ user });
  },
});
