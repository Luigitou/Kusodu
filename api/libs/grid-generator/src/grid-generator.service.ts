import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

export type GeneratedGrid = {
  grid: number[][];
  solution: number[][];
  difficulty: Difficulty;
};

export enum Difficulty {
  EASY = 30,
  MEDIUM = 40,
  HARD = 50,
  INSANE = 60,
}

@Injectable()
export class GridGeneratorService {
  constructor(private readonly prismaService: PrismaService) {}

  public async generateNewGrid(difficulty: Difficulty): Promise<GeneratedGrid> {
    const grid = this.initializeGrid();
    if (!this.fillGrid(grid)) {
      throw new Error('Failed to generate a valid Sudoku grid');
    }
    const solution = this.deepCopyGrid(grid);
    this.fillGrid(solution);

    this.removeNumbers(grid, difficulty);

    const generatedGrid: GeneratedGrid = {
      grid,
      solution,
      difficulty,
    };

    try {
      await this.saveGridInDb(generatedGrid);
      return generatedGrid;
    } catch (error) {
      throw new Error(`Error saving grid in database: ${error}`);
    }
  }

  private initializeGrid(): number[][] {
    return Array.from({ length: 9 }, () => Array(9).fill(0));
  }

  private deepCopyGrid(grid: number[][]): number[][] {
    return grid.map((row) => [...row]);
  }

  private fillGrid(grid: number[][]): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          const numbers = this.shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
          for (const num of numbers) {
            if (this.isSafe(grid, row, col, num)) {
              grid[row][col] = num;
              if (this.fillGrid(grid)) {
                return true;
              }
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  private isSafe(
    grid: number[][],
    row: number,
    col: number,
    num: number,
  ): boolean {
    if (grid[row].includes(num)) return false;

    for (let r = 0; r < 9; r++) {
      if (grid[r][col] === num) return false;
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        if (grid[r][c] === num) return false;
      }
    }

    return true;
  }

  private shuffleArray(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private removeNumbers(grid: number[][], difficulty: Difficulty): void {
    let attempts = difficulty;
    while (attempts > 0) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (grid[row][col] === 0) continue;

      const backup = grid[row][col];
      grid[row][col] = 0;

      const copyGrid = this.deepCopyGrid(grid);
      let counter = 0;
      this.countSolutions(copyGrid, () => counter++);

      if (counter !== 1) {
        grid[row][col] = backup;
        attempts--;
      }
    }
  }

  private countSolutions(grid: number[][], callback: () => void): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (this.isSafe(grid, row, col, num)) {
              grid[row][col] = num;
              if (this.countSolutions(grid, callback)) {
                grid[row][col] = 0;
                return true;
              }
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    callback();
    return false;
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
