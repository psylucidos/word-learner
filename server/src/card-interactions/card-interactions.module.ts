import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardInteraction } from './card-interaction.entity';
import { CardInteractionsController } from './card-interactions.controller';
import { CardInteractionsService } from './card-interactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([CardInteraction])],
  controllers: [CardInteractionsController],
  providers: [CardInteractionsService],
})
export class CardInteractionsModule {}