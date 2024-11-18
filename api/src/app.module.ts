import { Module } from '@nestjs/common';
import { GridModule } from './grid/grid.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule, GridModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
