import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  _id: string;

  @Prop({required: true})
  user_ref: string;

  @Prop({required: true})
  description: string;

  @Prop({required: true, default: new Date()})
  created_at: Date

  @Prop({required: true, default: null})
  modified_at: Date | null

  @Prop({required: true, default: 0})
  game_score: number;

  @Prop({required: true, default: 0})
  review_score: number;

  //comments: [Comments...*]
}

export const reviewSchema = SchemaFactory.createForClass(Review);
