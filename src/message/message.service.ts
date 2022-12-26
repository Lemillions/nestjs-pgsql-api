import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Message, Prisma } from '@prisma/client';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) { }
  async getAllMessages(): Promise<Message[]> {
    return await this.prisma.message.findMany();
  }

  async getMessage(id: number): Promise<Message | null> {
    const mensagem = await this.prisma.message.findUnique(
      { where: { id: Number(id) } }
    );
    if (!mensagem) {
      throw new NotFoundException('Mensagem com id ' + id + ' não encontrado')
    }
    return mensagem;
  }

  async getMessageByChat(name:string): Promise<Message[]> {
    return await this.prisma.message.findMany({
      where: { chatName: name },
    });
  }

  async createMessage(data: Message): Promise<Message> {
    return await this.prisma.message.create({
      data,
    });
  }

  async updateMessage(params: {
    id: number;
    data: Prisma.MessageUpdateInput;
  }): Promise<Message> {
    const { id, data } = params;
    return await this.prisma.message.update({
      data,
      where: { id: Number(id) },
    });
  }

  async deleteMessage(id: number): Promise<Message> {
    return await this.prisma.message.delete({
      where: { id: Number(id) },
    });
  }
}
