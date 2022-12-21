import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { MessagesService } from './message.service';
import { Message } from '@prisma/client';

@Controller('api/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }
  @Get()
  async getAllMessages(): Promise<Message[]> {
    return this.messagesService.getAllMessages();
  }

  @Get(':id')
  async getMessage(@Param('id') id: number): Promise<Message | null> {
    return this.messagesService.getMessage(id);
  }

  @Post()
  async createMessage(@Body() data: Message): Promise<Message> {
    return this.messagesService.createMessage(data);
  }

  @Put(':id')
  async updateMessage(@Param('id') id: number, @Body() data: Message): Promise<Message> {
    return this.messagesService.updateMessage({ id, data });
  }

  @Delete(':id')
  async deleteMessage(@Param('id') id: number): Promise<Message> {
    return this.messagesService.deleteMessage(id);
  }

}