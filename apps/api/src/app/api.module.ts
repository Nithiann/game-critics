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
import { ReviewsService } from './reviews/reviews.service';
import { Review, reviewSchema } from './reviews/reviews.schema';
import { Comment, commentSchema } from './comments/comments.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Game.name, schema: GameSchema },
      { name: Identity.name, schema: IdentitySchema},
      { name: Review.name, schema: reviewSchema },
      { name: Comment.name, schema: commentSchema}
    ]),
  ],
  controllers: [UserController, GameController],
  providers: [UserService, GameService, AuthService, ReviewsService],
  exports: [AuthService],
})
export class ApiModule {}
