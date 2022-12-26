import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersService } from './user/user.service';
import { UsersController } from './user/user.controller';
import { UsersModule } from './user/user.module';
import { MessagesModule } from './message/message.module';
import { MessagesController } from './message/message.controller';
import { MessagesService } from './message/message.service';
import { ChatModule } from './chat/chat.module';
import { ChatsController } from './chat/chat.controller';
import { ChatsService } from './chat/chat.service';
import { AppGateway } from './app/app.gateway';


@Module({
  imports: [PrismaModule, UsersModule, MessagesModule, ChatModule],
  controllers: [UsersController, MessagesController, ChatsController],
  providers: [UsersService, MessagesService, ChatsService, AppGateway],
})
export class AppModule {}
