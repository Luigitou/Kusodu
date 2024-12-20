import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  InternalServerErrorException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { RegisterDto } from './dto/registerDto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto';
import { refreshTokenDto } from './dto/refreshTokenDto';
import { Request, Response } from 'express';

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

    const refreshToken = await this.authService.createRefreshToken(createdUser);

    const cleanedUser = { ...createdUser, passwordHash: undefined };

    return { user: cleanedUser, token, refreshToken };
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

      const refreshToken = await this.authService.createRefreshToken(user);

      const cleanedUser = { ...user, passwordHash: undefined };

      return { user: cleanedUser, token, refreshToken };
    }
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new BadRequestException('Refresh token not found');
    }

    const refreshTokenRecord =
      await this.authService.validateRefreshToken(refreshToken);

    const user = refreshTokenRecord.user;

    const newAccessToken = await this.authService.createToken({
      id: user.id,
      username: user.username,
      email: user.email,
    });

    await this.authService.revokeRefreshToken(refreshToken);
    const newRefreshToken = await this.authService.createRefreshToken(user);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { token: newAccessToken };
  }

  @Post('logout')
  async logout(@Body() refreshDto: refreshTokenDto) {
    const { refreshToken } = refreshDto;

    await this.authService.revokeRefreshToken(refreshToken);

    return { message: 'Successfully logged out' };
  }
}
