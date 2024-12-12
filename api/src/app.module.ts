import { Module } from '@nestjs/common';
import { GridModule } from './grid/grid.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '@app/prisma';
import { GridGeneratorModule } from '@app/grid-generator';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    PrismaModule,
    GridGeneratorModule,
    GridModule,
    UserModule,
    AuthModule,
    GameModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
