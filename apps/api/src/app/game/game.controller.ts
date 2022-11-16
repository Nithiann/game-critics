import { gameRegistration, updateGameInfo } from '@game-critics/api-interfaces';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Post, Put } from '@nestjs/common';
import { Game } from './game.schema';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService
  ) {}

  @Get()
  async getAll(): Promise<Game[]> {
    return this.gameService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Game> {
    return this.gameService.getOne(id);
  }

  @Post()
  async createGame(@Body() gameInfo: gameRegistration): Promise<string> {
    try {
      return await this.gameService.createGame(gameInfo);
    } catch (e) {
      Logger.error(e);
      throw new HttpException('Data invalid', HttpStatus.BAD_REQUEST)
    }
  }

  @Put(':id')
  async updateSelf(@Param('id') id: string, @Body() updatedUser: updateGameInfo): Promise<Game> {
    return this.gameService.updateOne(id, updatedUser);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.gameService.deleteById(id);
  }
}
