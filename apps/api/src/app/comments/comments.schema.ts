import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type CommentsDocument = Comment & Document;

@Schema()
export class Comment {
    _id: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'users'})
    user_ref: string;

    @Prop({required: true})
    description: string;

    @Prop({default: Date.now })
    created_at: Date;

    @Prop({default: null})
    modified_at: Date;
}

export const commentSchema = SchemaFactory.createForClass(Comment);
mongoose.model('comments', commentSchema);
