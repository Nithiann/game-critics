import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash, compare } from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/user.schema';
import { Identity, IdentityDocument } from './identity.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Identity.name) private identityModel: Model<IdentityDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async createUser(email, displayName, firstName, lastName, age): Promise<string> {
    const user = new this.userModel({email, displayName, firstName, lastName, age});
    await user.save();
    return user.id;
  }

  async registerUser(email: string, password: string) {
    const generatedHash = await hash(password, parseInt(process.env.SALT_ROUNDS, 10))

    const identity = new this.identityModel({email, hash: generatedHash});

    await identity.save();
  }
}
