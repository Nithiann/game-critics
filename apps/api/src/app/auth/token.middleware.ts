import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: any, res: any, next: () => void) {
    const authHeader = req.header('authorization');

    if (!authHeader) {
      throw new HttpException('No authorization header', HttpStatus.UNAUTHORIZED);
    }

    try {
      const token = await this.authService.verifyToken(authHeader);

      res.locals.token = token;
    } catch (e) {
      throw new HttpException('Token invalid', HttpStatus.UNAUTHORIZED);
    }
    next();
  }
}
