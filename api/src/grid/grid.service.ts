import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { User } from '@prisma/client';

@Injectable()
export class GridService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUnusedGrid(difficulty: number, user: User) {
    const grids = await this.prismaService.grid.findMany({
      where: {
        difficulty,
        UserGrid: {
          none: {
            userId: user.id,
          },
        },
      },
    });

    if (grids.length === 0) {
      return null;
    } else {
      const randomIndex = Math.floor(Math.random() * grids.length);
      return grids[randomIndex];
    }
  }
}
