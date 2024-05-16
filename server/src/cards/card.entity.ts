import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { CardInteraction } from '../card-interactions/card-interaction.entity';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  word: string;

  @Column()
  gender: string;

  @Column()
  prefix: string;

  @Column()
  suffix: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => CardInteraction, (cardInteraction) => cardInteraction.card)
  interactions: CardInteraction[];
}