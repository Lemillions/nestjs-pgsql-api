import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './user.service';

@Module({
    controllers: [],
    providers: [PrismaService, UsersService],
})
export class UsersModule {}
