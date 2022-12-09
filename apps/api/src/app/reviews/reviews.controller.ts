import { Review } from '@game-critics/api-interfaces';
import { Controller, Get, Param } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {

    constructor(private _service: ReviewsService) {}

    @Get()
    async getAll(): Promise<Review[]> {
        return this._service.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: string): Promise<Review> {
        return this._service.getOne(id);
    }


}
