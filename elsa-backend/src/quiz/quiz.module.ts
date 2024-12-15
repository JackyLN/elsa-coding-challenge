import { forwardRef, Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';
import { QuestionModule } from 'src/question/question.module';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz]), forwardRef(() => QuestionModule)],
  controllers: [QuizController],
  providers: [QuizService],
  exports: [QuizService],
})
export class QuizModule {}
