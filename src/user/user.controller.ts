import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
  } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from '@prisma/client';


@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async getAllUsers(): Promise<User[]> {  
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User | null> {
    return this.usersService.getUser(id);
  }

  @Post()
  async createUser(@Body() data: User): Promise<User> {
    return this.usersService.createUser(data);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() data: User): Promise<User> {
    return this.usersService.updateUser({ id, data });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<User> {
    return this.usersService.deleteUser(id);
  }

}
