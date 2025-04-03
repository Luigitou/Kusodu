import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get('status')
  getStatus() {
    console.log('Health Ping');
    return { status: 'OK - GOOD' };
  }
}
