import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
    async getAllUsers(): Promise<User[]> {
      return await this.prisma.user.findMany();
    }

    async getUser(id: number): Promise<User | null> {
      const usuario = await this.prisma.user.findUnique(
        { where: { id: Number(id) }, include: { message: true, chats: true }}
      );
      if (!usuario) {
        throw new NotFoundException('Usuário com id ' + id + ' não encontrado')
      }
      return usuario;
    }

    async createUser(data: User): Promise<User> {
      return await this.prisma.user.create({
        data,
      });
    }

    async updateUser(params: {
      id: number;
      data: Prisma.UserUpdateInput;
    }): Promise<User> {
      const { id, data } = params;
      return await this.prisma.user.update({
        data,
        where: { id: Number(id) },
      });
    }

    async deleteUser(id: number): Promise<User> {
      await this.prisma.message.deleteMany({
        where: { userId: Number(id) },
      });
      return await this.prisma.user.delete({
        where: { id: Number(id) },
      });
    }
}