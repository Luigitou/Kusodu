import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { v4 as uuid } from 'uuid';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { HandleStartGameDto } from './dto/handleStartGameDto';
import { AuthenticateDto } from './dto/authenticateDto';
import { JwtService } from '@nestjs/jwt';
import { InputCellDto } from './dto/inputCellDto';
import { JoinRoomDto } from './dto/JoinRoomDto';
import { SyncGameStateDto } from './dto/SyncGameStateDto';

interface Room {
  id: string;
  players: string[];
  state: any;
}

@WebSocketGateway({
  cors: {
    origin: (origin, callback) => {
      const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
      console.log('incoming origin:', origin);
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
  private userConnections: { [clientId: string]: any } = {};

  constructor(private jwtService: JwtService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('authenticate')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async handleAuthenticate(
    @MessageBody() data: AuthenticateDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { token } = data;
    if (!token) {
      client.emit('unauthorized');
      client.disconnect();
      return;
    }

    try {
      const payload = await this.jwtService.verify(token);
      if (!payload) {
        client.emit('unauthorized');
        client.disconnect();
        return;
      }

      client.data.user = payload;
      client.emit('authenticated');
      this.userConnections[client.id] = payload;
    } catch (_error) {
      client.emit('unauthorized');
      client.disconnect(true);
    }
  }

  @SubscribeMessage('createRoom')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  handleStartGame(
    @MessageBody() data: HandleStartGameDto,
    @ConnectedSocket() client: Socket,
  ) {
    if (!this.userConnections[client.id]) {
      client.emit('unauthorized');
      return;
    }

    const roomId = uuid();

    if (!this.rooms[roomId]) {
      this.rooms[roomId] = {
        id: roomId,
        players: [this.userConnections[client.id]],
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

  @SubscribeMessage('inputCell')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  handleInputCell(
    @MessageBody() data: InputCellDto,
    @ConnectedSocket() client: Socket,
  ) {
    if (!this.userConnections[client.id]) {
      client.emit('unauthorized');
      return;
    }

    const { roomId } = data;

    if (!this.rooms[roomId]) {
      client.emit('no room');
      return;
    }

    this.rooms[roomId].state = data.state;

    this.server.to(roomId).emit('inputCell', {
      roomId,
      state: data.state,
      players: this.rooms[roomId].players,
    });
  }

  @SubscribeMessage('joinRoom')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  handleJoinRoom(
    @MessageBody() data: JoinRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    if (!this.userConnections[client.id]) {
      client.emit('unauthorized');
      return;
    }

    const { roomId } = data;

    if (!this.rooms[roomId]) {
      client.emit('no room');
      return;
    }

    const user = this.userConnections[client.id];
    if (!this.rooms[roomId].players.includes(user)) {
      this.rooms[roomId].players.push(user);
    }

    client.join(roomId);

    this.server.to(roomId).emit('joinRoom', {
      roomId,
      state: this.rooms[roomId].state,
      players: this.rooms[roomId].players,
    });
  }

  @SubscribeMessage('syncGameState')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async syncGameState(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: SyncGameStateDto,
  ) {
    if (!this.userConnections[client.id]) {
      client.emit('unauthorized');
      return;
    }

    const { roomId } = data;

    if (!this.rooms[roomId]) {
      client.emit('no room');
      return;
    }

    this.server.to(roomId).emit('syncGameState', {
      roomId,
      state: data.state,
      players: this.rooms[roomId].players,
    });
  }
}
