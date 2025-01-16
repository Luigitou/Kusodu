import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Difficulty } from '@app/grid-generator';
import { GetGridDto } from './dto/getGridDto';
import { GridService } from './grid.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/decorators/currentUser.decorator';
import { User } from '@prisma/client';

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

  @UseGuards(AuthGuard('jwt'))
  @Get(':difficulty/logged')
  async loggedUserGetGrid(
    @Param() params: GetGridDto,
    @CurrentUser() user: User,
  ) {
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

  @UseGuards(AuthGuard('jwt'))
  @Get('generate/baseGrids')
  async generateBaseGrids() {
    const grids = await this.gridService.generateBaseGrids();
    return grids;
  }
}
