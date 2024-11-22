import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

export type GeneratedGrid = {
  grid: Array<Array<number>>;
  solution: Array<Array<number>>;
  difficulty: number;
};

export enum Difficulty {
  EASY = 1,
  MEDIUM = 2,
  HARD = 3,
  INSANE = 17,
}

@Injectable()
export class GridGeneratorService {
  constructor(private readonly prismaService: PrismaService) {}

  public async generateNewGrid(difficulty: Difficulty): Promise<GeneratedGrid> {
    const generatedGrid = this.generateGrid();

    const grid = {
      grid: generatedGrid,
      solution: this.playableGrid(generatedGrid),
      difficulty: difficulty,
    };

    try {
      await this.saveGridInDb(grid);
      return grid;
    } catch (error) {
      throw new Error(`Error saving grid in database: ${error}`);
    }
  }

  private generateGrid(): Array<Array<number>> {
    // random number between 1 and 2
    const randomNumber = Math.floor(Math.random() * 2) + 1;
    return [[randomNumber]];
  }

  private playableGrid(grid: Array<Array<number>>): Array<Array<number>> {
    return grid;
  }

  private async saveGridInDb(grid: GeneratedGrid) {
    return this.prismaService.grid.create({
      data: {
        grid: grid.grid,
        solution: grid.solution,
        difficulty: grid.difficulty,
      },
    });
  }
}
