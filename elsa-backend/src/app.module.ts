import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ParticipantModule } from './participant/participant.module';
import { QuizModule } from './quiz/quiz.module';
import { AnswerModule } from './answer/answer.module';
import { QuestionModule } from './question/question.module';
import typeorm from './_database/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    ParticipantModule,
    QuizModule,
    AnswerModule,
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
