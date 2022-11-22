import { gameRegistration } from '@game-critics/api-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game as GameModel, GameDocument} from './game.schema';

@Injectable()
export class GameService {
    constructor(
      @InjectModel(GameModel.name) private gameModel: Model<GameDocument>
    ){}

    async getAll(): Promise<GameModel[]> {
      return this.gameModel.find().exec();
    }

    async getOne(id): Promise<GameModel> {
      return this.gameModel.findOne({_id: id}).exec();
    }

    async createGame(gameInfo: gameRegistration): Promise<string> {
      const game = new this.gameModel(gameInfo);
      await game.save();
      return game._id;
    }

    async updateOne(id: string, body): Promise<GameModel> {
      return this.gameModel.findByIdAndUpdate({_id: id}, body);
    }

    async deleteById(id: string): Promise<void> {
      return this.gameModel.findByIdAndDelete({_id: id});
    }

    async addReviewToGame(gameId: string, reviewId: string) {
      return this.gameModel.findByIdAndUpdate(gameId, {$push: {reviews: {reviewId}}})
    }

    async removeReviewFromGame(gameId: string, reviewId: string) {
      return this.gameModel.findByIdAndUpdate(gameId, {$pull: {reviews: {reviewId}}})
    }
  }
