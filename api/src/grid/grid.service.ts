import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { User } from '@prisma/client';
import {
  Difficulty,
  GeneratedGrid,
  GridGeneratorService,
} from '@app/grid-generator';

@Injectable()
export class GridService {
  constructor(
    private readonly gridGeneratorService: GridGeneratorService,
    private readonly prismaService: PrismaService,
  ) {}

  async generateGrid(difficulty: Difficulty) {
    let newGrid: GeneratedGrid;
    let counter = 0;
    let success = false;

    while (!success) {
      try {
        newGrid = await this.gridGeneratorService.generateNewGrid(difficulty);
        success = true;
      } catch (_error) {
        counter++;
        if (counter > 5) {
          return new InternalServerErrorException(
            `Impossible to generate grid: ${counter} attempts`,
          );
        }
      }
    }
    return newGrid;
  }

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

  async findGridByDifficulty(difficulty: number) {
    const grids = await this.prismaService.grid.findMany({
      where: {
        difficulty,
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
