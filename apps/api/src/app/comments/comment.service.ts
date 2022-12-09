import { commentRegistration } from '@game-critics/api-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment as CommentModel, CommentsDocument } from './comments.schema';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(CommentModel.name) private commentModel: Model<CommentsDocument>
    ) {}

    async getAll(): Promise<CommentModel[]> {
        return this.commentModel.find().exec()
    }

    async getOne(id): Promise<CommentModel> {
        return this.commentModel.findOne({_id: id}).exec()
    }

    async createComment(commentInfo: commentRegistration) {
        const comment = new this.commentModel(commentInfo);
        await comment.save();
        return comment._id;
    }

    async updateOne(id: string, body): Promise<CommentModel> {
        return this.commentModel.findByIdAndUpdate({_id: id}, body);
    }

    async deleteById(id: string): Promise<void> {
        return this.commentModel.findByIdAndDelete({_id: id});
    }
}
