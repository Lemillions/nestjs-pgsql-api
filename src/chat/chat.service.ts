import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Chat, Prisma } from '@prisma/client';

@Injectable()
export class ChatsService {
  constructor(private prisma: PrismaService) { }
  async getAllChats(): Promise<Chat[]> {
    return await this.prisma.chat.findMany();
  }
  
  async getChat(id: number): Promise<Chat | null> {
    const chat = await this.prisma.chat.findUnique(
      { where: { id: Number(id) }, include: { Message: true, members: true }}
    );
    if (!chat) {
      throw new NotFoundException('Chat com id ' + id + ' não encontrado')
    }
    return chat;
  }

  async createChat(data: Chat): Promise<Chat> {
    return await this.prisma.chat.create({
      data,
    });
  }

  async updateChat(params: {
    id: number;
    data: Prisma.ChatUpdateInput;
  }): Promise<Chat> {
    const { id, data } = params;
    return await this.prisma.chat.update({
      data,
      where: { id: Number(id) },
    });
  }

  async deleteChat(id: number): Promise<Chat> {
    await this.prisma.message.deleteMany({
      where: { chatId: Number(id) },
    });
    return await this.prisma.chat.delete({
      where: { id: Number(id) },
    });
  }

  async addNewMember(params: {
    id: number;
    user: { id: number };
  }): Promise<Chat> {
    const { id, user } = params;
    return await this.prisma.chat.update({
      data: {
        members: {
          connect: {
            id: Number(user.id)
          }
        }
      },
      where: { id: Number(id) },
    });
  }
  
  async removeMember(params: {
    id: number;
    user: { id: number };
  }): Promise<Chat> {
    const { id, user } = params;
    return await this.prisma.chat.update({
      data: {
        members: {
          disconnect: {
            id: Number(user.id)
          }
        }
      },
      where: { id: Number(id) },
    });
  }


}