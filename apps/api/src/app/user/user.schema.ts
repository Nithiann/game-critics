
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';

enum UserRole {
  user,
  reviewer,
  admin
}

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({default: uuid, index: true})
  id: string;

  @Prop({
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        const re = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}/;
        return re.test(v)
      }
    }
  })
  email: string;

  @Prop({
    required: true,
    unique: true
  })
  displayName: string;

  @Prop({
    required: true,
  })
  firstName: string;

  @Prop({
    required: true,
  })
  lastName: string;

  @Prop({
    required: true,
  })
  age: Date;

  @Prop({
    required: true,
    default: UserRole.user
  })
  role: UserRole;

  @Prop({
    required: true,
    default: 0
  })
  user_score: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
