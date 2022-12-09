import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Review } from '../reviews/reviews.schema';

export type GameDocument = Game & Document;

@Schema()
export class Game {
  _id: string;

  @Prop({required: true, unique: true})
  title: string

  @Prop({required: true})
  description: string

  @Prop({required: true})
  image: string;

  @Prop({required: true})
  genre: [string]

  @Prop({required: true})
  score: number

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'reviews'})
  reviews: [Review]
}

export const GameSchema = SchemaFactory.createForClass(Game);
mongoose.model('games', GameSchema);
