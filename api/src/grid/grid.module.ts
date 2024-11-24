import { Module } from '@nestjs/common';
import { GridController } from './grid.controller';
import { GridGeneratorModule } from '@app/grid-generator';
import { GridService } from './grid.service';

@Module({
  imports: [GridGeneratorModule],
  controllers: [GridController],
  providers: [GridService],
})
export class GridModule {}
