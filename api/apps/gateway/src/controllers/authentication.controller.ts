import {
  Body,
  Controller,
  ForbiddenException,
  Inject,
  Ip,
  Post,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GatewayService } from '../gateway.service';
import { ClientProxy } from '@nestjs/microservices';
import { LoggerService } from '@app/libs/logger/logger.service';
import { firstValueFrom, Observable } from 'rxjs';
import {
  LoginDto,
  RefreshTokenDto,
  RegisterDto,
} from '../dto/authentication.dto';

@Controller()
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(
    private readonly gatewayService: GatewayService,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    private readonly logger: LoggerService,
  ) {}

  @Post('auth/register')
  async register(@Body() data: RegisterDto): Promise<Observable<any>> {
    return this.authService.send({ cmd: 'register' }, data);
  }

  @Post('auth/login')
  async getAuthToken(
    @Body() data: LoginDto,
    @Req() req: Request,
    @Ip() ip: string,
  ): Promise<{
    token: any;
    session: any;
  }> {
    const token = await firstValueFrom(
      this.authService.send(
        { cmd: 'login' },
        { username: data.username, password: data.password },
      ),
    );

    if (!token) {
      throw new ForbiddenException('Invalid credentials');
    }

    const session = await firstValueFrom(
      this.authService.send(
        { cmd: 'create-session' },
        { userId: token.user.id, ip: ip, userAgent: req.headers['user-agent'] },
      ),
    );
    console.log('session:', session);

    return { token, session };
  }

  @Post('auth/refresh-token')
  async refreshToken(
    @Body() data: RefreshTokenDto,
  ): Promise<Observable<{ token: string; refreshToken: string }>> {
    return this.authService.send(
      { cmd: 'refresh-token' },
      { refreshToken: data.refreshToken, userId: data.userId },
    );
  }
}
