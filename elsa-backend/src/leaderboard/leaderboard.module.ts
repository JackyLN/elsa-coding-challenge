import { Module } from '@nestjs/common';
import { LeaderboardGateway } from './leaderboard.gateway';
import { LeaderboardService } from './leaderboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/answer/answer.entity';
import { LeaderboardController } from './leaderboard.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],
  providers: [LeaderboardGateway, LeaderboardService],
  exports: [LeaderboardService],
  controllers: [LeaderboardController],
})
export class LeaderboardModule {}
