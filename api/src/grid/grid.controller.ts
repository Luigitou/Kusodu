import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import {
  Difficulty,
  GeneratedGrid,
  GridGeneratorService,
} from '@app/grid-generator';
import { GetGridDto } from './dto/getGridDto';
import { GridService } from './grid.service';

@Controller('grid')
export class GridController {
  constructor(
    private readonly gridGeneratorService: GridGeneratorService,
    private readonly gridService: GridService,
  ) {}

  @Get(':difficulty')
  async getGrid(@Param() params: GetGridDto) {
    const getGridFromDb = await this.gridService.findUnusedGrid(
      Difficulty[params.difficulty],
      user,
    );

    if (getGridFromDb) {
      return getGridFromDb;
    } else {
      let newGrid: GeneratedGrid;
      let counter = 0;
      let success = false;

      while (!success) {
        try {
          newGrid = await this.gridGeneratorService.generateNewGrid(
            Difficulty[params.difficulty],
          );
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
  }
}
