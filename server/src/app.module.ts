import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CardsModule } from './cards/cards.module';
import { CardInteractionsModule } from './card-interactions/card-interactions.module';
import { AuthModule } from './auth/auth.module';
import { JwtGuard } from './auth/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const username = configService.get('DBUSERNAME');
        const password = configService.get('DBPASSWORD').toString();
        const database = configService.get('DBNAME');

        if (!username || !password || !database) {
          throw new Error('Database configuration is missing');
        }

        if (typeof password !== 'string') {
          throw new Error('Database password must be a string');
        }

        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username,
          password: 'cool123',
          database,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        }
      },
    }),
    AuthModule,
    UsersModule,
    CardsModule,
    CardInteractionsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}