import { StateCreator } from 'zustand';
import { logoutService } from '@/_services/auth';

/*type RefreshToken = {
  id: string;
  token: string;
  userId: string;
  expiresAt: string;
  revoked: boolean;
  createdAt: string;
};*/

export type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
};

export const createAuthSlice: StateCreator<AuthState> = set => ({
  isAuthenticated: false,
  token: null,
  setToken: (token: string | null) => {
    set({ token });
  },
  setIsAuthenticated: (isAuthenticated: boolean) => {
    set({ isAuthenticated });
  },
  logout: async () => {
    set({ token: null, isAuthenticated: false });
    await logoutService();
  },
});
