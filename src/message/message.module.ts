import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessagesService } from './message.service';

@Module({
    controllers: [],
    providers: [PrismaService, MessagesService],
})
export class MessagesModule {}