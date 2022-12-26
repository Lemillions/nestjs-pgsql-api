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

  @Get('user/:email')
  async getChatByUser(@Param('email') email: string): Promise<Chat[]> {
    return this.chatsService.getChatByUser(email);
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
  async deleteChat(@Param('id') name: string): Promise<Chat> {
    
    return this.chatsService.deleteChat(name);
  }

  @Put(':id/newmember')
  async addMembers(@Param('id') id: number, @Body() user: { id:number }): Promise<Chat> {
    return this.chatsService.addNewMember({ id, user });
  }

  @Put(':name/removemember')
  async removeMembers(@Param('name') name:string, @Body() user: { email:string }): Promise<Chat> {
    return this.chatsService.removeMember({ name, user });
  }

}