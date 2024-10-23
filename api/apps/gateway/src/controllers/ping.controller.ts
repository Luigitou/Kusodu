import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { GatewayService } from '../gateway.service';
import { ClientProxy } from '@nestjs/microservices';
import { LoggerService } from '@app/libs/logger/logger.service';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller()
@ApiTags('Ping')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PingController {
  constructor(
    private readonly gatewayService: GatewayService,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    private readonly logger: LoggerService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get hello message' })
  @ApiResponse({ status: 200, description: 'Returns a hello message.' })
  getHello(): string {
    this.logger.log('Hello World from the logs!');
    return this.gatewayService.getHello();
  }

  @Get('auth')
  @ApiOperation({ summary: 'Ping auth service' })
  @ApiResponse({
    status: 200,
    description: 'Pings the auth microservice and returns a response.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  getAuth(): Observable<string> {
    return this.authService.send({ cmd: 'hello-auth' }, '');
  }

  @Get('user')
  @ApiOperation({ summary: 'Ping user service' })
  @ApiResponse({
    status: 200,
    description: 'Pings the user microservice and returns a response.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  getUser(): Observable<string> {
    return this.userService.send({ cmd: 'hello-user' }, '');
  }

  @Get('call/user')
  @ApiOperation({ summary: 'Call user service through auth' })
  @ApiResponse({
    status: 200,
    description:
      'Calls the user service via the auth service and returns a response.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  callUser(): Observable<string> {
    return this.authService.send({ cmd: 'call-user' }, '');
  }
}
