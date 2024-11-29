import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '@app/prisma';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async checkIfUserAlreadyExists(email: string) {
    return this.userService.getOneUserFromEmail(email);
  }

  async encryptPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async registerNewUser(userToCreate: {
    email: string;
    username: string;
    passwordHash: string;
  }) {
    return this.userService.createUser(userToCreate);
  }

  async checkIfPasswordMatches(password: string, passwordHash: string) {
    return bcrypt.compare(password, passwordHash);
  }

  async createToken(userData: { id: string; username: string; email: string }) {
    return this.jwtService.sign({
      sub: userData.id,
      username: userData.username,
      email: userData.email,
    });
  }

  async createRefreshToken(user: User) {
    const refreshToken = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    return this.prismaService.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt,
      },
    });
  }

  async validateRefreshToken(token: string) {
    const refreshToken = await this.prismaService.refreshToken.findUnique({
      where: {
        token,
      },
      include: {
        user: true,
      },
    });

    if (!refreshToken || refreshToken.revoked) {
      throw new UnauthorizedException('Revoked or Invalid refresh token');
    }

    if (refreshToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token expired');
    }

    return refreshToken;
  }

  async revokeRefreshToken(token: string) {
    await this.prismaService.refreshToken.update({
      where: {
        token,
      },
      data: {
        revoked: true,
      },
    });
  }
}
