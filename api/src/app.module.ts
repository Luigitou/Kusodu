import { PrismaModule } from '@app/prisma';
import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { GridModule } from './grid/grid.module';

@Module({
  imports: [PrismaModule, HealthModule, GridModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
