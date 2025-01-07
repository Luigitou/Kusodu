import axios from 'axios';
import { useStore } from '@/_store';
import { toast } from 'react-toastify';
import { refreshService } from '@/_services/auth';

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}${process.env.NODE_ENV === 'production' ? '/api' : ''}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Automatically add the token to the request headers
api.interceptors.request.use(async config => {
  const token = useStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Automatically handle the refresh token
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response.status === 401) {
      const { setToken, logout } = useStore.getState();

      const originalRequest = error.config;

      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(error => {
            return Promise.reject(error);
          });
      }

      isRefreshing = true;
      originalRequest._retry = true;

      try {
        const refreshResponse = await refreshService();
        const newAccessToken = refreshResponse.token;

        setToken(newAccessToken);

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (error) {
        processQueue(error, null);
        logout();
      } finally {
        isRefreshing = false;
      }
    } else {
      if (
        error.response.status !== 400 &&
        error.response.data.message !== 'Refresh token not found'
      ) {
        toast(`${error.response.status} - ${error.response.data.message}`, {
          type: 'error',
        });
      }

      return Promise.reject(error);
    }
  },
);
