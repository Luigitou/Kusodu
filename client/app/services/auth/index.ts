import { api } from '@/services';
import { LoginDto, RefreshDto, RegisterDto } from '@/services/auth/dto';

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

export async function refreshService(refreshToken: string) {
  const response = await api.post<RefreshDto>('/auth/refresh', {
    refreshToken,
  });
  return response.data;
}
