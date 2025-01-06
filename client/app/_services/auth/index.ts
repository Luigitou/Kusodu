import { api } from '@/_services';
import { LoginDto, RefreshDto, RegisterDto } from '@/_services/auth/dto';
import { useStore } from '@/_store';

export async function registerService(
  username: string,
  email: string,
  password: string,
) {
  const response = await api.post<RegisterDto>('/auth/register', {
    username,
    email,
    password,
  });
  return response.data;
}

export async function loginService(email: string, password: string) {
  const response = await api.post<LoginDto>('/auth/login', {
    email,
    password,
  });
  return response.data;
}

export async function refreshService() {
  const response = await api.post<RefreshDto>('/auth/refresh');

  const user = useStore.getState().user;

  if (!user) {
    const setUser = useStore.getState().setUser;
    setUser(response.data.user);
  }

  return response.data;
}

export async function logoutService() {
  const response = await api.post('/auth/logout');
  return response.data;
}
