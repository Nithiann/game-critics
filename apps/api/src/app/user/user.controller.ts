
import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { User } from './user.schema';
import { UserService } from './user.service';
import { updateUserInfo } from '@game-critics/api-interfaces'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<User> {
    return this.userService.getOne(id);
  }

  @Put(':id')
  async updateSelf(@Param('id') id: string, @Body() updatedUser: updateUserInfo): Promise<User> {
    return this.userService.updateSelf(id, updatedUser);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.userService.deleteById(id);
  }
}
