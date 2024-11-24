import { Controller, Get, Param } from '@nestjs/common';
import { Difficulty } from '@app/grid-generator';
import { GetGridDto } from './dto/getGridDto';
import { GridService } from './grid.service';

@Controller('grid')
export class GridController {
  constructor(private readonly gridService: GridService) {}

  @Get(':difficulty')
  async getGrid(@Param() params: GetGridDto) {
    const getGridFromDb = await this.gridService.findGridByDifficulty(
      Difficulty[params.difficulty],
    );

    if (getGridFromDb) {
      return getGridFromDb;
    } else {
      return this.gridService.generateGrid(Difficulty[params.difficulty]);
    }
  }

  /*
  @Get(':difficulty/logged')
  async loggedUserGetGrid(@Param() params: GetGridDto) {
    const getGridFromDb = await this.gridService.findUnusedGrid(
      Difficulty[params.difficulty],
      user,
    );

    if (getGridFromDb) {
      return getGridFromDb;
    } else {
      return this.gridService.generateGrid(Difficulty[params.difficulty]);
    }
  }
  */
}
