import { Module } from '@nestjs/common';
import { QuizSessionService } from './quiz-session.service';
import { QuizSessionController } from './quiz-session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/quiz/quiz.entity';
import { Question } from 'src/question/question.entity';
import { QuizSession } from './quiz-session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz, Question, QuizSession]),
  ],
  providers: [QuizSessionService],
  controllers: [QuizSessionController],
  exports: [QuizSessionService],
})
export class QuizSessionModule {}
