import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ChatsService } from './chat.service';
import { Chat } from '@prisma/client';

@Controller('api/chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) { }
  @Get()
  async getAllChats(): Promise<Chat[]> {
    return this.chatsService.getAllChats();
  }

  @Get(':id')
  async getChat(@Param('id') id: number): Promise<Chat | null> {
    return this.chatsService.getChat(id);
  }

  @Post()
  async createChat(@Body() data: Chat): Promise<Chat> {
    return this.chatsService.createChat(data);
  }

  @Put(':id')
  async updateChat(@Param('id') id: number, @Body() data: Chat): Promise<Chat> {
    return this.chatsService.updateChat({ id, data });
  }

  @Delete(':id')
  async deleteChat(@Param('id') id: number): Promise<Chat> {
    
    return this.chatsService.deleteChat(id);
  }

  @Put(':id/newmember')
  async addMembers(@Param('id') id: number, @Body() user: { id:number }): Promise<Chat> {
    return this.chatsService.addNewMember({ id, user });
  }

  @Put(':id/removemember')
  async removeMembers(@Param('id') id: number, @Body() user: { id:number }): Promise<Chat> {
    return this.chatsService.removeMember({ id, user });
  }

}