import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async findAll(): Promise<Card[]> {
    return await this.cardRepository.find();
  }

  async findOne(id: string): Promise<Card> {
    return await this.cardRepository.findOneBy({ id });
  }

  async findAllByUser(userID: string): Promise<Card[]> {
    return await this.cardRepository.find({
      where: { user: { id: userID } },
    }).then((cards) => {
      return cards;
    });
  }

  async create(card: Partial<Card>): Promise<Card> {
    return await this.cardRepository.save(card);
  }

  async update(id: string, card: Card): Promise<Card> {
    const existingCard = await this.cardRepository.findOneBy({ id });
    if (!existingCard) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    existingCard.word = card.word;
    existingCard.gender = card.gender;
    existingCard.prefix = card.prefix;
    existingCard.suffix = card.suffix;
    existingCard.lasttouched = card.lasttouched;
    return await this.cardRepository.save(existingCard);
  }

  async delete(id: string): Promise<void> {
    await this.cardRepository.delete(id);
  }
}