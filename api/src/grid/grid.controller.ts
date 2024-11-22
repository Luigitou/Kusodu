import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import {
  Difficulty,
  GeneratedGrid,
  GridGeneratorService,
} from '@app/grid-generator';

@Controller('grid')
export class GridController {
  constructor(private readonly gridGeneratorService: GridGeneratorService) {}

  @Get('')
  async getGrid() {
    let newGrid: GeneratedGrid;
    let counter = 0;
    let success = false;

    while (!success) {
      try {
        newGrid = await this.gridGeneratorService.generateNewGrid(
          Difficulty.EASY,
        );
        success = true;
      } catch (_error) {
        counter++;
        if (counter > 10) {
          return new InternalServerErrorException(
            `Impossible to generate grid: ${counter} attempts`,
          );
        }
      }
    }

    console.log('new grid', counter);

    return newGrid;
  }
}
