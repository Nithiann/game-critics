
import { Body, Controller, HttpException, HttpStatus, Logger, Post } from '@nestjs/common';
import { credentialsForm, userInfo, userRegistration } from '@game-critics/api-interfaces';
import { AuthService } from './auth.service';
import { Token } from './token.decorator';

@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userCredits: userRegistration) : Promise<userInfo> {
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
    async login(@Body() credentials: credentialsForm): Promise<string> {
        try {
            return await this.authService.generateToken(credentials.email, credentials.password)
        } catch (e) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }
}
