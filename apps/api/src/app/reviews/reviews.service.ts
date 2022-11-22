import { reviewRegistration } from '@game-critics/api-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review as ReviewModel, ReviewDocument } from './reviews.schema'

@Injectable()
export class ReviewsService {

  constructor(
    @InjectModel(ReviewModel.name) private reviewModel: Model<ReviewDocument>
  ){}

  async getAll(): Promise<ReviewModel[]> {
    return this.reviewModel.find().exec();
  }

  async getOne(id): Promise<ReviewModel> {
    return this.reviewModel.findOne({_id: id}).exec();
  }

  async createReview(reviewInfo: reviewRegistration): Promise<string> {
    const review = new this.reviewModel(reviewInfo);
    await review.save();
    return review._id;
  }

  async updateOne(id: string, body): Promise<ReviewModel> {
    return this.reviewModel.findByIdAndUpdate({_id: id}, body);
  }

  async deleteById(id: string): Promise<void> {
    return this.reviewModel.findByIdAndDelete({_id: id});
  }
}
