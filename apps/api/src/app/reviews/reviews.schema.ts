import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Comment } from "../comments/comments.schema";

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  _id: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'users'})
  user_ref: string;

  @Prop({required: true})
  description: string;

  @Prop({required: true, default: new Date()})
  created_at: Date

  @Prop({required: true, default: new Date()})
  modified_at: Date

  @Prop({required: true, default: 0})
  game_score: number;

  @Prop({required: true, default: 0})
  review_score: number;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'comments'})
  comments: [Comment]
}

export const reviewSchema = SchemaFactory.createForClass(Review);
mongoose.model('reviews', reviewSchema);
