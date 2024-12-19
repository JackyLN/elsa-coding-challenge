import { Module } from '@nestjs/common';
import { LeaderboardGateway } from './leaderboard.gateway';
import { LeaderboardService } from './leaderboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/answer/answer.entity';
import { LeaderboardController } from './leaderboard.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [TypeOrmModule.forFeature([Answer]), EventEmitterModule.forRoot()],
  providers: [LeaderboardGateway, LeaderboardService],
  exports: [LeaderboardService],
  controllers: [LeaderboardController],
})
export class LeaderboardModule {}
