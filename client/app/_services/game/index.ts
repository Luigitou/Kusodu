import { api } from '.';

export async function getGameGridService(difficulty: string) {
  const response = await api.get(`/grid/${difficulty}`);
  return response.data;
}

export async function getGameGridLoggedService(difficulty: string) {
  const response = await api.get(`/grid/${difficulty}/logged`);
  return response.data;
}
