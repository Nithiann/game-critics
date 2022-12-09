import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash, compare } from 'bcrypt';
import { JwtPayload, verify, sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { resolve } from 'path';
import { User, UserDocument } from '../user/user.schema';
import { Identity, IdentityDocument } from './identity.schema';
import { Token } from './token.decorator';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Identity.name) private identityModel: Model<IdentityDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async verifyToken(token: string) {
    return new Promise((resolve, reject) => {
      verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) reject(err);
        else resolve(payload);
      });
    });
  }

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

  async generateToken(email: string, password: string): Promise<string> {
    const identity = await this.identityModel.findOne({email});

    if (!identity || !(await compare(password, identity.hash)))
      throw new Error("user not authorized")

    const user = await this.userModel.findOne({email: email})

    return new Promise((res, rej) => {
      sign({
          role: user.role,
          id: user._id,
          email: user.email
        },
        process.env.JWT_SECRET,
        (err, token) => {
          if (err) rej(err);
          else res(token)
        });
    })
  }
}
