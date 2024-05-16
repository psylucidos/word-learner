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

  async getCardsToReview(userID: string): Promise<Card[]> {
    
    console.log(userID);
    const cards = await this.cardRepository
      .createQueryBuilder('card')
      .leftJoinAndSelect('card.interactions', 'interaction')
      .where('card.user_id = :userID', { userID })
      .getMany();
  
    const now = new Date();
    const cardsToReview: any[] = [];
  
    for (const card of cards) {
      const lastInteraction = card.interactions[card.interactions.length - 1];
      let dueDate: Date;
  
      if (!lastInteraction) {
        dueDate = now;
      } else {
        switch (lastInteraction.interactionType) {
          case 'repeat':
            dueDate = new Date(lastInteraction.interactionDate.getTime() + 1000 * 60 * 60 * 24); // 1 day
            break;
          case 'neutral':
            dueDate = new Date(lastInteraction.interactionDate.getTime() + 1000 * 60 * 60 * 24 * 3); // 3 days
            break;
          case 'confident':
            dueDate = new Date(lastInteraction.interactionDate.getTime() + 1000 * 60 * 60 * 24 * 7); // 7 days
            break;
        }
      }
  
      // console.log('due date', dueDate);
      // if (dueDate <= now) {
      //   cardsToReview.push(card);
      // }
      cardsToReview.push({...card, dueDate: dueDate });
    }

    cardsToReview.sort((a,b) => a.dueDate.getTime() < b.dueDate.getTime() ? -1 : 1)

    let sortedCards: Card[] = [];

    cardsToReview.slice(0, 30);
    cardsToReview.map(card => {
      delete card.dueDate;
      delete card.interactions;
      sortedCards.push(card);
    })

    return sortedCards;
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
    existingCard.interactions = card.interactions;
    return await this.cardRepository.save(existingCard);
  }

  async delete(id: string): Promise<void> {
    await this.cardRepository.delete(id);
  }
}