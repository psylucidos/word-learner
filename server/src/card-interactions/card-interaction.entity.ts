import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Card } from '../cards/card.entity';

@Entity('card_interactions')
export class CardInteraction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: 'enum',
    enum: ['repeat', 'neutral', 'confident'],
  })
  interactionType: 'repeat' | 'neutral' | 'confident';

  @Column()
  interactionDate: Date;

  @ManyToOne(() => Card, (card) => card.id)
  @JoinColumn({ name: 'card_id' })
  card: Card;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
