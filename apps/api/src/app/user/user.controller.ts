
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Post, Put } from '@nestjs/common';
import { User } from './user.schema';
import { UserService } from './user.service';
import { credentialsForm, updateUserInfo, userInfo, userRegistration, Token, ResourceId } from '@game-critics/api-interfaces'
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

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

  @Post('register')
  async register(@Body() userCredits: userRegistration) : Promise<ResourceId> {
    try {
      await this.authService.registerUser(userCredits.email, userCredits.password);
      return {
        id: await this.authService.createUser(userCredits.email, userCredits.displayName, userCredits.firstName, userCredits.lastName, userCredits.age)
      }
    } catch (e) {
      Logger.error(e);
      throw new HttpException('Data invalid', HttpStatus.BAD_REQUEST)
    }
  }

  @Post('login')
    async login(@Body() credentials: credentialsForm): Promise<Token> {
        try {
            return {
              token: await this.authService.generateToken(credentials.email, credentials.password)
            }
        } catch (e) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }
}
