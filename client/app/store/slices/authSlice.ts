import { StateCreator } from 'zustand';

export type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setToken: (token: string) => void;
};

export const createAuthSlice: StateCreator<AuthState> = set => ({
  isAuthenticated: false,
  token: null,
  setToken: (token: string) => {
    set({ token });
  },
  setIsAuthenticated: (isAuthenticated: boolean) => {
    set({ isAuthenticated });
  },
});
