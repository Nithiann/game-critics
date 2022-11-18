import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user/user.controller';
import { User, UserSchema } from './user/user.schema';
import { UserService } from './user/user.service';
import { GameService } from './game/game.service';
import { GameController } from './game/game.controller';
import { Game, GameSchema } from './game/game.schema';
import { AuthService } from './auth/auth.service';
import { Identity, IdentitySchema } from './auth/identity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Game.name, schema: GameSchema },
      { name: Identity.name, schema: IdentitySchema}
    ]),
  ],
  controllers: [UserController, GameController],
  providers: [UserService, GameService, AuthService],
})
export class ApiModule {}
