import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ParticipantModule } from './participant/participant.module';
import { QuizModule } from './quiz/quiz.module';
import { AnswerModule } from './answer/answer.module';
import { QuestionModule } from './question/question.module';
import typeorm from './_database/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizSessionModule } from './quiz-session/quiz-session.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get('typeorm'),
    }),
    ParticipantModule,
    QuizModule,
    AnswerModule,
    QuestionModule,
    QuizSessionModule,
    LeaderboardModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
