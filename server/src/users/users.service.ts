import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import crypto from 'crypto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import authRequestUserInterface from 'src/auth/authrequser.interface';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async create(user: Partial<User>): Promise<User> {
    const hashedPassword = await argon2.hash(user.password);
    return this.userRepository.save({ username: user.username, email: user.email, password: hashedPassword, cards: user.cards });
  }

  async update(id: string, user: User): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({ id });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    existingUser.username = user.username;
    existingUser.email = user.email;
    existingUser.password = user.password;
    existingUser.cards = user.cards;
    // Update other properties as needed
    return this.userRepository.save(existingUser);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}