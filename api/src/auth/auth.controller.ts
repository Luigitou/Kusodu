import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { RegisterDto } from './dto/registerDto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto';

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

    const passwordHash = await this.authService.encryptPassword(
      registerDto.password,
    );

    const userToCreate = {
      email: registerDto.email,
      username: registerDto.username,
      passwordHash,
    };

    const createdUser = await this.authService.registerNewUser(userToCreate);

    if (!createdUser) {
      throw new InternalServerErrorException('User creation error');
    }

    const token = await this.authService.createToken({
      id: createdUser.id,
      username: createdUser.username,
      email: createdUser.email,
    });

    return { createdUser, token };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.checkIfUserAlreadyExists(
      loginDto.email,
    );

    if (!user) {
      throw new ForbiddenException('Could not find user');
    }

    const passwordMatch = await this.authService.checkIfPasswordMatches(
      loginDto.password,
      user.passwordHash,
    );

    if (!passwordMatch) {
      throw new ForbiddenException('Invalid password');
    } else {
      const token = await this.authService.createToken({
        id: user.id,
        username: user.username,
        email: user.email,
      });

      return { user, token };
    }
  }
}
