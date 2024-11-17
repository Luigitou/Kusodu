import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/registerDto';

@Controller('auth')
export class AuthController {
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    console.log(registerDto);
  }
}
