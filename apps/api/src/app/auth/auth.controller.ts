import { userRegistration } from '@game-critics/api-interfaces';
import { Body, Controller, HttpException, HttpStatus, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userCredits: userRegistration) : Promise<any> {
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
}
