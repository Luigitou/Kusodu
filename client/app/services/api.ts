import axios from 'axios';
import { useStore } from '@/store';
import { toast } from 'react-toastify';

const token = useStore.getState().token;

export const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async config => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    toast(`${error.response.status} - ${error.response.data.message}`, {
      type: 'error',
    });
    if (error.response.status === 401) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);
