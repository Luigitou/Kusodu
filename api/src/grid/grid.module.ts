import { Module } from '@nestjs/common';
import { GridService } from './grid.service';
import { GridController } from './grid.controller';

@Module({
  providers: [GridService],
  controllers: [GridController],
})
export class GridModule {}
