import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOneUserFromEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async createUser({
    username,
    email,
    passwordHash,
  }: {
    username: string;
    email: string;
    passwordHash: string;
  }) {
    return this.prismaService.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });
  }
}
