import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@app/libs/prisma/prisma.service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@app/libs/jwt/jwt.service';
import { Session, User } from '@prisma/client';
import * as crypto from 'node:crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Hello auth!';
  }

  /**
   * Create a new user if the user  doesn't exist
   * @param data
   */
  async register(data: { email: string; name: string; password: string }) {
    // 1st step: Check if the username already exists
    const user = await firstValueFrom(
      this.userService.send(
        { cmd: 'find-one-user' },
        {
          email: data.email,
        },
      ),
    );

    if (user !== null) {
      throw new RpcException({
        status: HttpStatus.CONFLICT,
        message: 'User already exists',
      });
    }

    // 2nd step: Hash the password
    const hash = await bcrypt.hash(data.password, 10);

    // 3rd step: Create a new user
    const newUser = await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        passwordHash: hash,
      },
    });

    // 4th step: Send the JWT token
    return {
      token: this.jwtService.generateToken(newUser),
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    };
  }

  /**
   * return a JWT token from the user
   */
  generateToken(user: User) {
    return this.jwtService.generateToken(user);
  }

  /**
   * Validates a user's credentials
   * @param data
   */
  async validateUser(data: { username: string; password: string }) {
    const user = await firstValueFrom(
      this.userService.send(
        { cmd: 'find-one-user' },
        {
          email: data.username,
        },
      ),
    );

    if (!user) {
      return null;
    }

    if (await bcrypt.compare(data.password, user.passwordHash)) {
      return user;
    } else {
      return null;
    }
  }

  async createSession(data: { userId: string; ip: string; userAgent: string }) {
    const previousSession = await this.prisma.session.findFirst({
      where: {
        userId: data.userId,
      },
    });

    const newRefreshToken = crypto.randomBytes(32).toString('hex');
    const newRefreshTokenHash = await bcrypt.hash(newRefreshToken, 10);

    let session: Session | null = null;

    if (
      previousSession &&
      previousSession.expiresAt > new Date() &&
      previousSession.userAgent === data.userAgent &&
      previousSession.ipAddress === data.ip
    ) {
      // If the session is still valid, update the refresh token
      session = await this.prisma.session.update({
        where: {
          id: previousSession.id,
        },
        data: {
          refreshTokenHash: newRefreshTokenHash,
        },
      });
    } else {
      // If the session is expired, create a new one and create a new refresh token
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      session = await this.prisma.session.create({
        data: {
          userId: data.userId,
          ipAddress: data.ip,
          userAgent: data.userAgent,
          refreshTokenHash: newRefreshTokenHash,
          expiresAt,
        },
      });
    }

    if (!session || !newRefreshToken) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Session went wrong',
      });
    }

    return {
      newRefreshToken,
      expiresAt: session.expiresAt,
    };
  }

  async refreshToken(data: { refreshToken: string; userId: string }) {
    const session = await this.prisma.session.findFirst({
      where: {
        userId: data.userId,
      },
    });

    if (!session) {
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Invalid refresh token',
      });
    }

    const isValid = await bcrypt.compare(
      data.refreshToken,
      session.refreshTokenHash,
    );

    if (!isValid) {
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Invalid refresh token',
      });
    }

    const newRefreshToken = crypto.randomBytes(32).toString('hex');
    const newRefreshTokenHash = await bcrypt.hash(newRefreshToken, 10);

    await this.prisma.session.update({
      where: {
        id: session.id,
      },
      data: {
        refreshTokenHash: newRefreshTokenHash,
      },
    });

    const user = await firstValueFrom(
      this.userService.send({ cmd: 'find-user-by-id' }, { id: session.userId }),
    );

    if (!user) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'User not found',
      });
    }

    const token = this.jwtService.generateToken(user);

    return {
      token,
      refreshToken: newRefreshToken,
    };
  }
}
