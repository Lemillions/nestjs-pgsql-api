import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatsService } from './chat.service';

@Module({
    controllers: [],
    providers: [PrismaService, ChatsService],
})
export class ChatModule {}