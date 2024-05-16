import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CardInteractionsService } from './card-interactions.service';
import { CardInteraction } from './card-interaction.entity';

@Controller('card-interactions')
export class CardInteractionsController {
  constructor(private readonly cardInteractionsService: CardInteractionsService) {}

  @Get()
  async findAll(): Promise<CardInteraction[]> {
    return await this.cardInteractionsService.findAll();
  }

  @Get('/id/:id')
  async findOne(@Param('id') id: string): Promise<CardInteraction> {
    return await this.cardInteractionsService.findOne(id);
  }

  @Get('/interaction/:cardId')
  async findByCard(@Param('cardId') cardId: string): Promise<CardInteraction[]> {
    return await this.cardInteractionsService.findAllByCard(cardId);
  }

  @Post()
  async create(@Body() interaction: Partial<CardInteraction>): Promise<CardInteraction> {
    return await this.cardInteractionsService.create(interaction);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() interaction: CardInteraction): Promise<CardInteraction> {
    return await this.cardInteractionsService.update(id, interaction);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.cardInteractionsService.delete(id);
  }
}