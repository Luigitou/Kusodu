import { Global, Module } from '@nestjs/common';
import { GridGeneratorService } from './grid-generator.service';

@Global()
@Module({
  providers: [GridGeneratorService],
  exports: [GridGeneratorService],
})
export class GridGeneratorModule {}
