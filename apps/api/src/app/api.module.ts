import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user/user.controller';
import { User, UserSchema } from './user/user.schema';
import { UserService } from './user/user.service';
import { GameService } from './game/game.service';
import { GameController } from './game/game.controller';
import { Game, GameSchema } from './game/game.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Game.name, schema: GameSchema }
    ]),
  ],
  controllers: [UserController, GameController],
  providers: [UserService, GameService],
})
export class ApiModule {}
