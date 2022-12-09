import { commentRegistration, Review } from '@game-critics/api-interfaces';
import { Controller, Get, Param, Post, Body, Headers } from '@nestjs/common';
import { CommentService } from '../comments/comment.service';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {

    constructor(private _service: ReviewsService, private commentService: CommentService) {}

    @Get()
    async getAll(): Promise<Review[]> {
        return this._service.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: string): Promise<Review> {
        return this._service.getOne(id);
    }

    @Post(':id/comment')
    async addCommentToReview(@Param('id') reviewId: string,  @Body() comment: commentRegistration, @Headers('Authorization') token) {
      const commentId = await this.commentService.createComment(comment)

      return this._service.addCommentToReview(reviewId, commentId);
    }


}
