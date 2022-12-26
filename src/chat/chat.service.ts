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
    const chat = await this.prisma.chat.findUnique({
      where: { id: Number(id) },
      include: { message: true, users: true },
    });
    if (!chat) {
      throw new NotFoundException('Chat com id ' + id + ' não encontrado');
    }
    return chat;
  }

  async getChatByUser(email: string): Promise<Chat[]> {
    console.log(email);
    return await this.prisma.chat.findMany({
      where: {
        users: {
          some: {
            userEmail: email
          }
        }
      },
      include: {
        message: {
          include: {
            user: true,
          }
        }, users: {
          include: {
            user: true,
          }
        }
      },
    });
  }

  async createChat(data: any): Promise<Chat> {
    return await this.prisma.chat.create({
      data: {
        name: data.name,
        image: data.image,
        users: {
          create: {
            permissao: 'ADMIN',
            user: {
              connect: {
                id: data.userID
              },
            }
          }
        },
      },
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

  async deleteChat(name: string): Promise<Chat> {
    await this.prisma.message.deleteMany({
      where: { chatName: name },
    });
    return await this.prisma.chat.delete({
      where: { name: name },
    });
  }

  async addNewMember(params: {
    id: number;
    user: { id: number };
  }): Promise<Chat> {
    const { id, user } = params;
    return await this.prisma.chat.update({
      data: {
        users: {
          create: {
            user: {
              connect: {
                id: user.id,
              }
            }
          }
        }
      },
      where: {
        id: Number(id),
      },
    });
  }

  async removeMember(params: {
    name: string;
    user: { email: string };
  }): Promise<Chat> {
    const { name, user } = params;
    return await this.prisma.chat.update({
      data: {
        users: {
          delete: {
            userEmail_chatName:{
              userEmail: user.email,
              chatName: name
            }
          }
        }
      },
      where: { name: name },
    });
  }
}
