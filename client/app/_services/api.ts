import axios from 'axios';
import { useStore } from '@/_store';
import { toast } from 'react-toastify';
import { refreshService } from '@/_services/auth';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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
      const { setToken, refreshToken, setRefreshToken, logout } =
        useStore.getState();

      const originalRequest = error.config;

      // If the request is a retry, don't intercept it
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      // If a request is already requesting a refresh token, queue the request
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

      // Request a new token with the refresh token
      try {
        if (!refreshToken?.token) {
          toast(`${error.response.status} - Refresh token not found`, {
            type: 'error',
          });
          return Promise.reject(error);
        }
        const refreshResponse = await refreshService(refreshToken.token);

        const newRefreshToken = refreshResponse.refreshToken;
        const newAccessToken = refreshResponse.token;

        // Save the new tokens in the _store
        setRefreshToken(newRefreshToken);
        setToken(newAccessToken);

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (error) {
        processQueue(error, null);
        logout();
        toast(`Session expired, please login again`, {
          type: 'error',
        });
      } finally {
        isRefreshing = false;
      }
    } else {
      toast(`${error.response.status} - ${error.response.data.message}`, {
        type: 'error',
      });
      return Promise.reject(error);
    }
  },
);
