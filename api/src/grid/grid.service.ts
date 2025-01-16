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

  async generateBaseGrids() {
    const difficulties = [
      Difficulty.EASY,
      Difficulty.MEDIUM,
      Difficulty.HARD,
    ];
    const gridsPerDifficulty = 100;

    for (const difficulty of difficulties) {
      const generatedGrids: GeneratedGrid[] = [];

      for (let i = 0; i < gridsPerDifficulty; i++) {
        try {
          const grid = await this.generateGrid(difficulty);
          generatedGrids.push(<GeneratedGrid>grid);
          console.log(`Generated grid ${i + 1} for difficulty ${difficulty}`);
        } catch (error) {
          console.error(`Failed to generate grid: ${error}`);
        }
      }

      try {
        await this.saveGridsBatchInDb(generatedGrids);
        console.log(`Successfully saved ${gridsPerDifficulty} grids for difficulty ${difficulty}`);
      } catch (error) {
        console.error(`Error saving grids for difficulty ${difficulty}: ${error}`);
      }
    }
  }

  private async saveGridsBatchInDb(grids: GeneratedGrid[]): Promise<void> {
    await this.prismaService.grid.createMany({
      data: grids.map((grid) => ({
        grid: grid.grid,
        solution: grid.solution,
        difficulty: grid.difficulty,
      })),
      skipDuplicates: true,
    });
  }
}
