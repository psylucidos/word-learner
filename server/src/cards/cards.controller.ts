import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CardsService } from './cards.service';
import { Card } from './card.entity';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  async findAll(): Promise<Card[]> {
    return await this.cardsService.findAll();
  }

  @Get('/id/:id')
  async findOne(@Param('id') id: string): Promise<Card> {
    return await this.cardsService.findOne(id);
  }

  @Get('/user')
  async findByUser(@Request() req): Promise<Partial<Card>[]> {
    return await this.cardsService.findAllByUser(req.user.id);
  }

  @Post()
  async create(@Body() card: Partial<Card>): Promise<Card> {
    return await this.cardsService.create(card);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() card: Card): Promise<Card> {
    return await this.cardsService.update(id, card);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.cardsService.delete(id);
  }
}