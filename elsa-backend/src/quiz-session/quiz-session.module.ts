import { Module } from '@nestjs/common';
import { QuizSessionService } from './quiz-session.service';
import { QuizSessionController } from './quiz-session.controller';

@Module({
  providers: [QuizSessionService],
  controllers: [QuizSessionController]
})
export class QuizSessionModule {}
