import { Module } from '@nestjs/common';
import { GridModule } from './grid/grid.module';

@Module({
  imports: [GridModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
