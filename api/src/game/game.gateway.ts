import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { v4 as uuid } from 'uuid';

interface Room {
  id: string;
  players: string[];
  state: any;
}

@WebSocketGateway({
  cors: {
    origin: (origin, callback) => {
      const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class GameGateway {
  @WebSocketServer()
  server: Server;

  private rooms: { [roomId: string]: Room } = {};

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('createRoom')
  handleStartGame(
    @MessageBody() data: { state: object },
    @ConnectedSocket() client: Socket,
  ) {
    const roomId = uuid();

    if (!this.rooms[roomId]) {
      this.rooms[roomId] = {
        id: roomId,
        players: [client.id],
        state: data.state,
      };
    }

    client.join(roomId);

    client.emit('roomCreated', {
      roomId,
      state: this.rooms[roomId].state,
      players: this.rooms[roomId].players,
    });

    console.log(`Client joined room: ${roomId}`);
  }
}
