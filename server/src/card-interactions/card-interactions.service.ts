import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardInteraction } from './card-interaction.entity';

@Injectable()
export class CardInteractionsService {
  constructor(
    @InjectRepository(CardInteraction)
    private readonly cardInteractionRepository: Repository<CardInteraction>,
  ) {}

  async findAll(): Promise<CardInteraction[]> {
    return await this.cardInteractionRepository.find();
  }

  async findOne(id: string): Promise<CardInteraction> {
    return await this.cardInteractionRepository.findOneBy({ id });
  }

  async findAllByCard(cardID: string): Promise<CardInteraction[]> {
    return await this.cardInteractionRepository.find({
      where: { card: { id: cardID } },
    }).then((interactions) => {
      return interactions;
    });
  }

  async create(interaction: Partial<CardInteraction>): Promise<CardInteraction> {
    return await this.cardInteractionRepository.save(interaction);
  }

  async update(id: string, interaction: CardInteraction): Promise<CardInteraction> {
    const existingInteraction = await this.cardInteractionRepository.findOneBy({ id });
    if (!existingInteraction) {
      throw new NotFoundException(`Card Interaction with ID ${id} not found`);
    }
    existingInteraction.interactionType = interaction.interactionType;
    existingInteraction.interactionDate = interaction.interactionDate;
    return await this.cardInteractionRepository.save(existingInteraction);
  }

  async delete(id: string): Promise<void> {
    await this.cardInteractionRepository.delete(id);
  }
}