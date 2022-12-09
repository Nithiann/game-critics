import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type CommentsDocument = Comment & Document;

@Schema()
export class Comment {
    _id: string;

    @Prop({required: true})
    user_ref: string;

    @Prop({required: true})
    description: string;

    @Prop({default: Date.now })
    created_at: Date;

    @Prop({default: null})
    modified_at: Date;
}

export const commentSchema = SchemaFactory.createForClass(Comment);
