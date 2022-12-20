import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersService } from './user/user.service';
import { UsersController } from './user/user.controller';
import { UsersModule } from './user/user.module';


@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
