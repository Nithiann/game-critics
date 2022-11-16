import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomUUID } from "crypto";

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

  // @Prop({default: []})
  // reviews: [reviews]
}

export const GameSchema = SchemaFactory.createForClass(Game);
