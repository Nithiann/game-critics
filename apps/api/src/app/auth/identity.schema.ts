import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type IdentityDocument = Identity & Document;

@Schema()
export class Identity {
    @Prop({
        required: true,
        unique: true,
    })
    email: string;

    // in actuality password
    @Prop({required: true})
    hash: string;
}

export const IdentitySchema = SchemaFactory.createForClass(Identity);

