import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/registerDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.checkIfUserAlreadyExists(
      registerDto.email,
    );

    if (user) {
      throw new BadRequestException('User already exists');
    }

    return { registerDto, user };
  }
}
