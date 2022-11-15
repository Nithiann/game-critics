import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserModel, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>
  ) {}

  async getAll(): Promise<UserModel[]> {
    return this.userModel.find()
  }

  async getOne(id): Promise<UserModel> {
    return this.userModel.findOne({_id: id})
  }
}
