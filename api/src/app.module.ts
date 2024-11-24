import { Module } from '@nestjs/common';
import { GridModule } from './grid/grid.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '@app/prisma';
import { GridGeneratorModule } from '@app/grid-generator';

@Module({
  imports: [
    PrismaModule,
    GridGeneratorModule,
    GridModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
