import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

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

  @Column()
  lasttouched: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;
}