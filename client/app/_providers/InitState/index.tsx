'use client';

import { useStore } from '@/_store';
import { useEffect } from 'react';
import { refreshService } from '@/_services/auth';
import { toast } from 'react-toastify';

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
        toast(`La session a expiré, veuillez vous reconnecter`, {
          type: 'info',
        });
      }
    };

    initializeAuth();
  }, [setToken, setIsAuthenticated]);

  return <>{children}</>;
};
