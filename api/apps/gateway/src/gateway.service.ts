import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '@app/libs/prisma/prisma.service';

@Injectable()
export class GatewayService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createRole(name: string, description: string): Promise<Role> {
    return this.prisma.role.create({
      data: {
        name,
        description,
      },
    });
  }

  async getAllRoles() {
    return this.prisma.role.findMany();
  }
}
