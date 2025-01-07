'use client';

import { useStore } from '@/_store';
import { useEffect } from 'react';
import { refreshService } from '@/_services/auth';

export const InitState = ({ children }: { children: React.ReactNode }) => {
  const setToken = useStore(state => state.setToken);
  const setIsAuthenticated = useStore(state => state.setIsAuthenticated);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const refreshResponse = await refreshService();

        if (refreshResponse.token) {
          setToken(refreshResponse.token);
          setIsAuthenticated(true);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setToken(null);
        setIsAuthenticated(false);
      }
    };

    initializeAuth();
  }, [setToken, setIsAuthenticated]);

  return <>{children}</>;
};
