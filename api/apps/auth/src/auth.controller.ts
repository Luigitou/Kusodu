import { Controller, Inject, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { LoggerService } from '@app/libs/logger/logger.service';
import { LocalAuthGuard } from '@app/libs/guards/local-auth.guards';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    private readonly logger: LoggerService,
  ) {}

  @MessagePattern({ cmd: 'hello-auth' })
  helloAuth(): string {
    return this.authService.getHello();
  }

  @MessagePattern({ cmd: 'call-user' })
  callUser(): Observable<string> {
    return this.userService.send({ cmd: 'hello-user' }, '');
  }

  @MessagePattern({ cmd: 'register' })
  async register(data: { email: string; name: string; password: string }) {
    return this.authService.register(data);
  }

  @UseGuards(LocalAuthGuard)
  @MessagePattern({ cmd: 'login' })
  async login(data: { user: any }): Promise<any> {
    const user = data.user;

    const token = this.authService.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  @MessagePattern({ cmd: 'create-session' })
  async createSession(data: { userId: string; ip: string; userAgent: string }) {
    return this.authService.createSession(data);
  }

  @MessagePattern({ cmd: 'refresh-token' })
  async refreshToken(data: { refreshToken: string; userId: string }) {
    return this.authService.refreshToken(data);
  }
}
