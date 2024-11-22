import { Module } from '@nestjs/common';
import { GridController } from './grid.controller';
import { GridGeneratorModule } from '@app/grid-generator';

@Module({
  imports: [GridGeneratorModule],
  controllers: [GridController],
})
export class GridModule {}
