import { forwardRef, Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { QuizSession } from 'src/quiz-session/quiz-session.entity';
import { Participant } from 'src/participant/participant.entity';
import { LeaderboardModule } from 'src/leaderboard/leaderboard.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer, QuizSession, Participant]),
    forwardRef(() => LeaderboardModule),
  ],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
