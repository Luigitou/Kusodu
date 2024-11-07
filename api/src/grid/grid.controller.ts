import { Controller, Get } from '@nestjs/common';

@Controller('grid')
export class GridController {
  constructor() {}

  @Get(':id')
  getGrid() {
    return 'Hello World from grid !';
  }
}
