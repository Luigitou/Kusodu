import { io, Socket } from 'socket.io-client';
import { useStore } from '@/_store';

let socket: Socket | null = null;

export const getSocket = (): Socket | null => {
  if (typeof window === 'undefined') return null;

  const token = useStore.getState().token;

  if (!socket) {
    console.log(token);
    socket = io(process.env.NEXT_PUBLIC_API_URL, {
      transports: ['websocket'],
    });
  }

  return socket;
};
