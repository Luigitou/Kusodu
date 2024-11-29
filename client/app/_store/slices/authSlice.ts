import { StateCreator } from 'zustand';

type RefreshToken = {
  id: string;
  token: string;
  userId: string;
  expiresAt: string;
  revoked: boolean;
  createdAt: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: RefreshToken | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: RefreshToken) => void;
  logout: () => void;
};

export const createAuthSlice: StateCreator<AuthState> = set => ({
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  setToken: (token: string) => {
    set({ token });
  },
  setIsAuthenticated: (isAuthenticated: boolean) => {
    set({ isAuthenticated });
  },
  setRefreshToken: (refreshToken: RefreshToken) => {
    set({ refreshToken: refreshToken });
  },
  logout: () => {
    set({ token: null, refreshToken: null, isAuthenticated: false });
  },
});
